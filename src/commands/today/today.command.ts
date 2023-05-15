import { MyContext } from "../../.."
import { tasksService } from "../../services/tasks.service";



export const todayCommands = async (ctx: MyContext) => {

    const tasksServiceInstance = new tasksService()

    const tasksArray = await tasksServiceInstance.getTodayTasks() ?? []

    return ctx.reply('today')
              .then(()=>{
                 ctx.replyWithSticker('https://cdn.tlgrm.app/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp')
              })
              .then(() => {
                  for (let index = 0; index < tasksArray.length; index += 2) {
                    const task = tasksArray[index];
                    const taskSecond = tasksArray[index + 1]
                    
                    if (taskSecond) {
                        ctx.reply(`${task?.icon ?? "👨‍💻"} - ${task?.title}    ${taskSecond?.icon ?? "👨‍💻"} - ${taskSecond?.title}`);
                    }else {
                        ctx.reply(`${task?.icon ?? "👨‍💻"} - ${task?.title}`)
                    }
                  }
              })
}