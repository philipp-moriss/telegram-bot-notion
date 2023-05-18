import { BotInterface, CommandType } from "./bot.interface";
import { Telegraf, Context, Middleware } from "telegraf"
import { Update,  } from 'typegram'
import {Stage, WizardScene } from "telegraf/scenes";
import { MyContext } from "../..";




export class Bot implements BotInterface {

    bot : Telegraf<MyContext>
    stage :  any;

    
    constructor(botToken: string) {

        if (!botToken) {
            throw new Error("Not a botToken");
        }
        
        this.bot = new Telegraf<MyContext>(botToken); 

        this.stage = new Stage()

    }


    public async useScenes (scenes: WizardScene<any>[]) {

        this.bot.use(this.stage.middleware())

        scenes.forEach((sene) => {
            this.stage.register(sene)
        })
    };

    public async useMiddleware (middlewares: Middleware<Context<Update>>[]) {
        middlewares.forEach((middleware) => {
            this.bot.use(middleware)
        })
        
    };

    public async useCommands(commands : Array<CommandType>) {
        commands.forEach((command)=> {
            //@ts-ignore
            this.bot.command(command[0], command[1])
        })
          
    }

    public async useEvents(commands : Array<CommandType>) {
        commands.forEach((event)=> {
            //@ts-ignore
            this.bot.on(event[0], event[1])
        })
          
    }

    public async initBot(): Promise<void> {
       await this.bot.launch()
            .then(()=> {
                console.log('bot Started');
            })
            .catch(()=>{
                console.log('Something wrong');
            })
    }
}