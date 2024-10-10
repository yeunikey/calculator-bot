import { MyBot } from '../bot';
import User from '../entities/user';

export function registerCallback(instance: MyBot) {
    instance.getBot().on("callback_query", async (ctx) => {
        
        if (ctx.chatId == undefined || ctx.chatId < 0)
            return;
    
        let user = instance.getUserManager().getUser(ctx.chatId);
    
        if (user == null) {
            user = new User(ctx.chatId);
            instance.getUserManager().addUser(user);
        }

        let conversation = user.conversation;

        if (conversation == undefined)
            return;

        await conversation.onCallback(ctx);
    })
}