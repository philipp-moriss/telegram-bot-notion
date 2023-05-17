import { MyContext } from "../../..";
import { tasksService } from "../../services/tasks.service";

export class TasksCommand {
  tasksService: tasksService;

  constructor() {
    this.tasksService = new tasksService();
  }

  todayCommand = async (ctx: MyContext) => {
    await ctx.reply("today");
    const tasksArray = await this.tasksService?.getTodayTasks();

    await ctx.replyWithSticker(
      "https://cdn.tlgrm.app/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp"
    );
    if (tasksArray && tasksArray?.length > 0) {
      for (let index = 0; index < tasksArray.length; index++) {
        const task = tasksArray[index];
        ctx.reply(`${task?.icon ?? "👨‍💻"} - ${task?.title}`);
      }
    } else {
      ctx.reply("nothing 🤯");
    }
  };

  allTasks = async (ctx: MyContext) => {
    await ctx.reply("All your tasks");
    const tasksArray = await this.tasksService?.getAllTasks();

    await ctx.replyWithSticker(
      "https://cdn.tlgrm.app/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp"
    );
    if (tasksArray && tasksArray?.length > 0) {
      for (let index = 0; index < tasksArray.length; index++) {
        const task = tasksArray[index];
        ctx.reply(`${task?.icon ?? "👨‍💻"} - ${task?.title}`);
      }
    } else {
      ctx.reply("nothing 🤯");
    }
  };

}
