//@ts-ignore
import { Stage } from 'telegraf/scenes';
import { Context, Telegraf } from "telegraf";

import { LoggerService } from "../logger/logger.service.js";


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

    constructor(logger: LoggerService) {
        const token = process.env.BOT_KEY as string;

        this.bot = new Telegraf<AppContext>(token); 
        this.stage = new Stage()
        this.logger = logger
    }


    async useEvents() {
        this.bot.on('message', (ctx : AppContext) => {
            ctx.reply("i am don't understand you")
          })
    }

    public async init() {
        try {
            await this.useEvents()
            await this.bot.launch()
            this.logger.log('bot Started');
        } catch (error) {
            this.logger.error('Something wrong', error);
        }
    }
}