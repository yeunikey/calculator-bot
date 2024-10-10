import { MyBot } from '../bot';
import User from '../entities/user';

export function registerMessage(instance: MyBot) {
    instance.getBot().on("message", async (ctx) => {
        
        if (ctx.chatId == undefined || ctx.chatId < 0)
            return;
    
        let user = instance.getUserManager().getUser(ctx.chatId);
    
        if (user == null) {
            user = new User(ctx.chatId);
            instance.getUserManager().addUser(user);
        }

        let conversation = user.conversation;

        if (conversation == undefined) {
            await ctx.api.deleteMessage(ctx.chatId, ctx.message.message_id);
            return;
        }

        await conversation.onMessage(ctx);
    })
}