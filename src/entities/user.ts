import { Context } from "grammy";
import Conversation from "./conversation";

class User {

    public id: number;
    public conversation: Conversation | undefined;

    constructor(id: number) {
        this.id = id;
    }

    async changeConversation(conversation: Conversation, ctx: Context) {
        this.conversation = conversation;
        await this.conversation.onStart(ctx);
    }

    async leaveConversation() {
        this.conversation = undefined;
    }

}

export default User;