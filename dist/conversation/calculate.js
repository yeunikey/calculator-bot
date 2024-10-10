"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const conversation_1 = __importDefault(require("../entities/conversation"));
class CalculateConversation extends conversation_1.default {
    constructor() {
        super(...arguments);
        this.midterm = 0;
        this.endterm = 0;
        this.status = Status.MIDTERM;
    }
    ;
    onStart(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.reply("Напишите в чат ваш Register-Midterm");
        });
    }
    onMessage(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (ctx.message == undefined)
                return;
            let text = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text;
            if (text == undefined) {
                return;
            }
            if (this.status == Status.CALCULATE) {
                yield ctx.api.deleteMessage(this.user.id, (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.message_id);
                return;
            }
            if (this.isNumber(text)) {
                yield ctx.reply("Неверный формат. Например, 52.5");
                return;
            }
            if (Number(text) > 100 || Number(text) < 0) {
                yield ctx.reply("Неверный формат. Оно не может быть больше 100 или меньше 0");
                return;
            }
            if (this.status == Status.MIDTERM) {
                this.midterm = Number(text);
                this.status = Status.ENDTERM;
                yield ctx.reply("Теперь напишите ваш Register-Endterm");
            }
            else if (this.status == Status.ENDTERM) {
                this.endterm = Number(text);
                this.status = Status.FINAL;
                yield ctx.reply("Теперь напишите ваш final или пропустите", {
                    reply_markup: new grammy_1.InlineKeyboard()
                        .text("Пропустить", "next")
                });
            }
            else if (this.status == Status.FINAL) {
                this.final = Number(text);
                this.status = Status.CALCULATE;
                yield this.showResult(ctx);
            }
        });
    }
    onCallback(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (((_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a.data) == "next" && this.status == Status.FINAL) {
                this.showResult(ctx);
            }
        });
    }
    showResult(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.final == undefined) {
                this.final = (70 - ((this.midterm * 0.3) + (this.endterm * 0.3))) / 0.4;
                this.calculateTotal();
                let message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    ``,
                    `Ты должен набрать final больше ${this.final}`,
                    `чтобы остаться на стипендии (total = 70)`
                ];
                yield ctx.reply(message.join("\n"));
            }
            else {
                this.calculateTotal();
                let message = [
                    `Register-Midterm: ${this.midterm}`,
                    `Register-Endterm: ${this.endterm}`,
                    `Final: ${this.final}`,
                    ``,
                    `Total: ${this.total}`
                ];
                yield ctx.reply(message.join("\n"));
            }
            this.user.leaveConversation();
        });
    }
    calculateTotal() {
        if (this.final == undefined)
            return;
        this.total = (this.midterm * 0.3) + (this.endterm * 0.3) + (this.final * 0.4);
    }
    isNumber(value) {
        return isNaN(Number(value));
    }
}
var Status;
(function (Status) {
    Status[Status["MIDTERM"] = 0] = "MIDTERM";
    Status[Status["ENDTERM"] = 1] = "ENDTERM";
    Status[Status["FINAL"] = 2] = "FINAL";
    Status[Status["CALCULATE"] = 3] = "CALCULATE";
})(Status || (Status = {}));
exports.default = CalculateConversation;
