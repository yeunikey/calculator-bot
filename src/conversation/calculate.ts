import { Context, InlineKeyboard } from "grammy";
import Conversation from "../entities/conversation";

class CalculateConversation extends Conversation {

    private midterm = 0;
    private endterm = 0; 
    private final: number | undefined;;
    private total: number | undefined;

    private status: Status = Status.MIDTERM;

    async onStart(ctx: Context): Promise<void> {
        await ctx.reply("Напишите в чат ваш Register-Midterm")
    }

    async onMessage(ctx: Context): Promise<void> {

        if (ctx.message == undefined)
            return;

        let text = ctx.message?.text;

        if (text == undefined) {
            return;
        }

        if (this.status == Status.CALCULATE) {
            await ctx.api.deleteMessage(this.user.id, ctx.message?.message_id);
            return;
        }

        if (this.isNumber(text)) {
            await ctx.reply("Неверный формат. Например, 52.5");
            return;
        }

        if (Number(text) > 100 || Number(text) < 0) {
            await ctx.reply("Неверный формат. Оно не может быть больше 100 или меньше 0")
            return;
        }

        if (this.status == Status.MIDTERM) {
            this.midterm = Number(text);
            this.status = Status.ENDTERM;
            await ctx.reply("Теперь напишите ваш Register-Endterm");
        } else if (this.status == Status.ENDTERM) {
            this.endterm = Number(text);
            this.status = Status.FINAL;

            await ctx.reply("Теперь напишите ваш final или пропустите", {
                reply_markup: new InlineKeyboard()
                    .text("Пропустить", "next")
            });
        } else if (this.status == Status.FINAL) {
            this.final = Number(text);
            this.status = Status.CALCULATE;

            await this.showResult(ctx);
        }

    }

    async onCallback(ctx: Context): Promise<void> {
        if (ctx.callbackQuery?.data == "next" && this.status == Status.FINAL) {
            this.showResult(ctx);
        }
    }

    async showResult(ctx: Context) {
        
        if (this.final == undefined) {

            this.final = (70 - ((this.midterm * 0.3) + (this.endterm * 0.3))) / 0.4;
            this.calculateTotal();

            let message = [
                `Register-Midterm: ${this.midterm}`,
                `Register-Endterm: ${this.endterm}`,
                ``,
                `Ты должен набрать final больше ${this.final}`,
                `чтобы остаться на стипендии (total = 70)`
            ]
            await ctx.reply(message.join("\n"));

        } else {
            this.calculateTotal();
            let message = [
                `Register-Midterm: ${this.midterm}`,
                `Register-Endterm: ${this.endterm}`,
                `Final: ${this.final}`,
                ``,
                `Total: ${this.total}`
            ]
            await ctx.reply(message.join("\n"));
        }

        this.user.leaveConversation();

    }

    calculateTotal() {
        if (this.final == undefined) 
            return;

        this.total = (this.midterm * 0.3) + (this.endterm * 0.3) + (this.final * 0.4);
    }

    isNumber(value: string) {
        return isNaN(Number(value));
    }

}

enum Status {
    MIDTERM,
    ENDTERM,
    FINAL,
    CALCULATE,
}

export default CalculateConversation;