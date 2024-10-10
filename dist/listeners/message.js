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
exports.registerMessage = registerMessage;
const user_1 = __importDefault(require("../entities/user"));
function registerMessage(instance) {
    instance.getBot().on("message", (ctx) => __awaiter(this, void 0, void 0, function* () {
        if (ctx.chatId == undefined || ctx.chatId < 0)
            return;
        let user = instance.getUserManager().getUser(ctx.chatId);
        if (user == null) {
            user = new user_1.default(ctx.chatId);
            instance.getUserManager().addUser(user);
        }
        let conversation = user.conversation;
        if (conversation == undefined) {
            yield ctx.api.deleteMessage(ctx.chatId, ctx.message.message_id);
            return;
        }
        yield conversation.onMessage(ctx);
    }));
}
