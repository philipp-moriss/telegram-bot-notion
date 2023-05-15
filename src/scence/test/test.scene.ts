import { Scenes } from "telegraf";
import { WizardScene } from "telegraf/scenes";
import { Message } from "telegraf/types";



interface MyWizardSession extends Scenes.WizardSessionData {
	// will be available under `ctx.scene.session.myWizardSessionProp`
	phoneNumber: string;
	name: string;
}


type WizzardContext = Scenes.WizardContext<MyWizardSession>;

export const createScene = new WizardScene<WizzardContext>(
    "first-scene",
    (ctx) => {
      ctx.sendMessage("Enter phone number")
      console.log('aaaaaaaaaaaaaaaa');
      
      ctx.wizard.next();
    },
    (ctx) => {
      // @ts-ignore
      ctx.session.__scenes.phoneNumber = ctx.message.text
      //@ts-ignore
      if (ctx.message.text === 'yes') {
        ctx.sendMessage("Enter Correct phone number")
        ctx.wizard.selectStep(0)
        ctx.wizard.next()
      }else {
        ctx.reply("please Enter Name");
        ctx.wizard.next();
      }
    },
    (ctx) => {
      ctx.reply(
        `this phone for ${
          ctx.session.__scenes.phoneNumber
        } ${(ctx.message as Message.TextMessage).text} `
      );
      ctx.scene.leave();
    }
  );