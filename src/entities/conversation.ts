import { Context } from "grammy";
import User from "./user";

abstract class Conversation {

    public user: User;

    constructor(user: User) {
        this.user = user;
    }

    async onStart(ctx: Context) {}

    async onMessage(ctx: Context) {}
    
    async onCallback(ctx: Context) {}

}

export default Conversation;