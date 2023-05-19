import { Telegram } from "telegraf";
import { AppContext } from "../newBot/app";
import { BotError } from "./bot.error";

export interface IExceptionFilter {

    catch : (err: BotError & Error, telegram: Telegram, next?: () => Promise<void>) => void

}