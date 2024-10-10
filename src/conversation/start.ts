import { Context, InlineKeyboard } from "grammy";
import Conversation from "../entities/conversation";

class StartConversation extends Conversation {

    async onStart(ctx: Context): Promise<void> {
        try {
            await ctx.reply([
                "Список текущих команд:",
                "",
                " \`/start\` \\- список команд",
                " \`/calculate\` \\- считать степуху",
                "",
                "powered by @yeunikey"
            ].join("\n"), {
                parse_mode: "MarkdownV2"
            });
        } catch (err) {
            return;
        }
    }

}

export default StartConversation;