import { AppContext } from "../newBot/app";

export interface ICommand {
    path: string;
    function: (
        ctx: AppContext,
        next: () => Promise<void>,
        ) => void
}