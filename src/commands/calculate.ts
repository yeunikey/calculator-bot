import { MyBot } from '../bot';
import CalculateConversation from '../conversation/calculate';
import User from '../entities/user';
import Logger from '../utils/logger';

export function calculateCommand(instance: MyBot) {
    
    try {
        instance.getBot().command("calculate", async (ctx) => {
    
            if (ctx.chatId == undefined || ctx.chatId < 0)
                return;

            let user = instance.getUserManager().getUser(ctx.chatId);


            if (user == null) {
                user = new User(ctx.chatId);
                instance.getUserManager().addUser(user);
            }
            
            await user.changeConversation(new CalculateConversation(user), ctx);
        })
    } catch (err) {
        Logger.log("Не удалось подключиться к CalculateConversation, " + err)
    }

}