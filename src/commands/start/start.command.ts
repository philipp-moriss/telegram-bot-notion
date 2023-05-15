import { MyContext } from "../../.."

export const startCommands = (ctx: MyContext) => {
    return ctx.reply('hello')
              .then(()=>{
                 ctx.replyWithSticker('https://cdn.tlgrm.app/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp')
              })
              .then(() => {
                //ctx.reply('bro i can give your tasks just send /today')
                //@ts-ignore
                ctx.scene.enter('first-scene')
              })
}