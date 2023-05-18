import { Telegraf, Context, Middleware } from "telegraf"
import { WizardScene } from "telegraf/scenes";
import { Update } from 'typegram'




export type CommandType = [ string , Middleware<Context<Update>>[]]


export interface BotInterface {

    bot : Telegraf<Context<Update>>

    stage :  any;

    useScenes : (scenes : WizardScene<any>[]) => Promise<void>

    useMiddleware : (middlewares : Array<Middleware<Context>>) => Promise<void>


    useCommands : (commands : Array<CommandType>) => Promise<void>
    
    initBot () : void
}