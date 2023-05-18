import { ICommand } from './command.interface';
import { Composer, Context } from "telegraf";
import { LoggerService } from "../logger/logger.service";


//const testBotRoute = new Composer()
// testBotRoute.command('test', (ctx) => {
//     ctx.reply('it is test route for my app')
// })
// await this.bot.use(testBotRoute)

export class BaseController {

    private readonly _commands

    constructor(private logger : LoggerService) {
        this.logger = logger
        this._commands = new Composer()
    }

    get commands () {
        return this._commands
    }

    protected bindCommands (commands: ICommand[]) {
        for (const command of commands) {
            const handler = command.function.bind(this)
            this.logger.log(`connect Command ${command.path}`)
            this._commands.command(command.path, handler)
        }
    }
}