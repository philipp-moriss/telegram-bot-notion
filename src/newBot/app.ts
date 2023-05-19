import { IExceptionFilter } from './../errors/exception.filter.interface';
//@ts-ignore
import { Stage } from 'telegraf/scenes';
import { Composer, Context, Telegraf } from "telegraf";

import { LoggerService } from "../logger/logger.service.js";
import { TasksController } from '../tasks/tasks.controller.js';
import { BotError } from '../errors/bot.error';


interface SessionData {
	//messageCount: number;
}

export interface AppContext extends Context {
	session?: SessionData;
}

export class App {

    bot : Telegraf<AppContext>
    stage :  any;
    logger : LoggerService
    taskController: TasksController
    exceptionFilter: IExceptionFilter

    constructor(
        logger: LoggerService,
        taskController : TasksController,
        exceptionFilter: IExceptionFilter,
        ) {
        const token = process.env.BOT_KEY as string;

        this.bot = new Telegraf<AppContext>(token); 
        this.stage = new Stage()
        this.logger = logger
        this.taskController = taskController
        this.exceptionFilter = exceptionFilter
    }


    async useEvents() {
        this.bot.use(this.taskController.commands)
    }

    useExceptionFilters (error: BotError & Error) {
        this.exceptionFilter.catch.bind(this.exceptionFilter, error)(this.bot.telegram)
    }

    public async init() {
        try {
            await this.useEvents()
            await this.bot.launch()
            this.logger.log('bot Started');
        } catch (error) {
            this.useExceptionFilters(error as Error & BotError)
        }
    }
}