import { Telegraf, Context, Middleware } from "telegraf"
import { WizardScene } from "telegraf/scenes";
import { Update } from 'typegram'




export type CommandType = [ string , Middleware<Context<Update>>[]]


export interface BotInterface {

    bot : Telegraf<Context<Update>>

    stage :  any;

    connectScenes : (scenes : WizardScene<any>[]) => Promise<void>

    connectMiddleware : (middlewares : Array<Middleware<Context>>) => Promise<void>


    connectCommands : (commands : Array<CommandType>) => Promise<void>
    
    launchBot () : void
}