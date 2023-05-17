import { Context, session } from "telegraf";
import { Bot } from "./src/MainBot/bot";
import { createScene } from "./src/scence/test/test.scene";
import { startCommands } from "./src/commands/start/start.command";
import { TasksCommand } from "./src/commands/today/today.command";
require("dotenv").config();


interface SessionData {
	//messageCount: number;
}

export interface MyContext extends Context {
	session?: SessionData;
}

async function main() {
  const token = process.env.BOT_KEY as string;

  const middleware = [
    session()
  ];

  const tasksCommands = new TasksCommand()

  const scenes = [createScene];

  const commands = [
    ['start', startCommands],
    ['today', tasksCommands.todayCommand],
    ['all', tasksCommands.allTasks],
    ['fullStop', (ctx: MyContext) => {
      ctx.session = { }
      bot.bot.stop('EndSession')
    }]
  ]

  const events = [
    ['message', (ctx : MyContext) => {
      ctx.reply("i am don't understand you")
    }]
  ]

  const bot = new Bot(token);

  await bot.connectMiddleware(middleware);

  await bot.connectScenes(scenes);

  //@ts-ignore
  await bot.connectCommands(commands)

  //@ts-ignore
  await bot.connectEvents(events)

  bot.launchBot()
}

main();
