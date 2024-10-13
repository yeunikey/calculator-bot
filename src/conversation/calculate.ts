import { Context, InlineKeyboard } from "grammy";
import Conversation from "../entities/conversation";

class CalculateConversation extends Conversation {

    private midterm = 0;
    private endterm = 0; 
    private final: number | undefined;;
    private total: number | undefined;

    private status: Status = Status.MIDTERM;

    async onStart(ctx: Context): Promise<void> {
        try {
            await ctx.reply("Напишите в чат ваш Register-Midterm")
        } catch (err) {
            return;
        }
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

    round(num: number): number {
        return Math.round(num * 100) / 100;
    }

    async showResult(ctx: Context) {
        
        if (this.final == undefined) {

            this.final = this.round((70 - ((this.midterm * 0.3) + (this.endterm * 0.3))) / 0.4);
            this.calculateTotal();

            let message = [
                `Register-Midterm: ${this.midterm}`,
                `Register-Endterm: ${this.endterm}`,
                ``,
                `Ты должен набрать final = ${this.final}`,
                `чтобы остаться на стипендии (total = 70)`
            ]

            if (this.midterm < 25 || this.endterm < 25) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    ``,
                    `У тебя летка брадок`
                ];
            } else if ((this.midterm + this.endterm) / 2 < 50) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    ``,
                    `У тебя летка брадок`
                ];
            } else if (this.final < 25) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    ``,
                    `У тебя летка брадок`
                ];
            } else if (this.final < 50) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    ``,
                    `У тебя FX (пересдача)`
                ];
            }

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

            if (this.midterm < 25 || this.endterm < 25) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    `Final: ${this.final}`,
                    ``,
                    `У тебя летка брадок`
                ];
            } else if ((this.midterm + this.endterm) / 2 < 50) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    `Final: ${this.final}`,
                    ``,
                    `У тебя летка брадок`
                ];
            } else if (this.final < 25) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    `Final: ${this.final}`,
                    ``,
                    `У тебя летка брадок`
                ];
            } else if (this.final < 50) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    `Final: ${this.final}`,
                    ``,
                    `У тебя FX (пересдача)`
                ];
            } else if (this.total != undefined && this.total < 50) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    `Final: ${this.final}`,
                    ``,
                    `У тебя летка брадок`
                ];
            } else if (this.total != undefined && this.total < 70) {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    `Final: ${this.final}`,
                    ``,
                    `У тебя нет степухи`,
                    `Total = ${this.total}`
                ];
            } else {
                message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    `Final: ${this.final}`,
                    ``,
                    `Ураа, у тебя есть степа!`,
                    `Total = ${this.total}`
                ];
            }

            await ctx.reply(message.join("\n"));
        }

        this.user.leaveConversation();

    }

    calculateTotal() {
        if (this.final == undefined) 
            return;

        this.total = this.round((this.midterm * 0.3) + (this.endterm * 0.3) + (this.final * 0.4));
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