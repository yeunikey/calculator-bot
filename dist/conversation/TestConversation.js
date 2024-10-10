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
const conversation_1 = __importDefault(require("../entities/conversation"));
class TestConversation extends conversation_1.default {
    constructor() {
        super(...arguments);
        this.midterm = 0;
        this.endterm = 0;
        this.final = 0;
        this.total = 0;
        this.status = Status.MIDTERM;
    }
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
                yield ctx.reply("Напишите цифру. Например, 52.5");
                return;
            }
            if (this.status == Status.MIDTERM) {
                this.midterm = Number(text);
                this.status = Status.ENDTERM;
                yield ctx.reply("Теперь напишите ваш Register-Endterm");
            }
            else if (this.status == Status.ENDTERM) {
                this.endterm = Number(text);
                yield ctx.reply(`Midterm: ${this.midterm} / Endterm: ${this.endterm}`);
            }
        });
    }
    showResult() {
    }
    isNumber(value) {
        return isNaN(Number(value));
    }
}
var Status;
(function (Status) {
    Status[Status["MIDTERM"] = 0] = "MIDTERM";
    Status[Status["ENDTERM"] = 1] = "ENDTERM";
    Status[Status["CALCULATE"] = 2] = "CALCULATE";
})(Status || (Status = {}));
exports.default = TestConversation;
