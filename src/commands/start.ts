import { MyBot } from '../bot';
import CalculateConversation from '../conversation/calculate';
import StartConversation from '../conversation/start';
import User from '../entities/user';
import Logger from '../utils/logger';

export function startCommand(instance: MyBot) {
    
    instance.getBot().command("start", async (ctx) => {
        try {
            if (ctx.chatId == undefined || ctx.chatId < 0)
                return;
    
            let user = instance.getUserManager().getUser(ctx.chatId);
    
    
            if (user == null) {
                user = new User(ctx.chatId);
                instance.getUserManager().addUser(user);
            }
            
            await user.changeConversation(new StartConversation(user), ctx);
        } catch (err) {}
    })

}