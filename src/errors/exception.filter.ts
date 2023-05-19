import { Telegram } from "telegraf";
import { LoggerService } from "../logger/logger.service";
import { AppContext } from "../newBot/app";
import { BotError } from "./bot.error";
import { IExceptionFilter } from "./exception.filter.interface";

export class ExceptionFilter implements IExceptionFilter{

    logger : LoggerService

    constructor(logger: LoggerService) {
        this.logger = logger
    }

    catch(err: BotError & Error, telegram: Telegram, next?: () => Promise<void>) {
        if (err.userId) {
            this.logger.error(err.userId)
            telegram.sendMessage(err.userId,`Bot Error : ${err.message}`)
        }else {
            this.logger.error(err.message)
        }
    }

}