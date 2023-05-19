export class BotError extends Error {

    userId : number

    constructor(message: string, userId: number,) {
        super(message)
        this.message = message
        this.userId = userId
    }
}