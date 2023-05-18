import { LoggerService } from '../logger/logger.service';
import { AppContext } from '../newBot/app';
import { tasksService } from '../services/tasks.service';
import { BaseController } from './../common/base.controller';


export  class TasksController extends BaseController {

    tasksService: tasksService;

    constructor(logger: LoggerService) {
        super(logger)
        this.bindCommands([
            {
                path: 'today',
                function: this.getTodayTasks
            },
            {
                path: 'all',
                function: this.getAllTasks
            }
        ])
        this.tasksService = new tasksService();
    }

    renderTaskView (ctx: AppContext, tasksArray: any) {
        if (tasksArray && tasksArray?.length > 0) {
            for (let index = 0; index < tasksArray.length; index++) {
              const task = tasksArray[index];
              ctx.reply(`${task?.icon ?? "👨‍💻"} - ${task?.title}`);
            }
          } else {
            ctx.reply("nothing 🤯");
          }
    }

    async getTodayTasks(ctx: AppContext) {
        const tasksArray = await this.tasksService?.getTodayTasks();
        await ctx.reply("today");
        await ctx.replyWithSticker(
            "https://cdn.tlgrm.app/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp"
          );
        this.renderTaskView(ctx, tasksArray)
    }

    async getAllTasks(ctx: AppContext) {
        const tasksArray = await this.tasksService?.getAllTasks();
        await ctx.reply("all tasks");
        await ctx.replyWithSticker(
            "https://cdn.tlgrm.app/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp"
          );
        this.renderTaskView(ctx, tasksArray)
    }
}