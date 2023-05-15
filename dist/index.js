"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
require("dotenv").config();
const bot = new telegraf_1.Telegraf(process.env.BOT_KEY);
// bot.use(async (ctx: Context, next: () => Promise<void>) => {
// })
bot.on("text", (ctx) => ctx.reply("Hello World"));
bot.launch()
    .then(() => {
    console.log('bot is running');
})
    .catch((error) => {
    console.log('something wrong', error);
});
