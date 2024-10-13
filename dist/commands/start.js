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
exports.startCommand = startCommand;
const start_1 = __importDefault(require("../conversation/start"));
const user_1 = __importDefault(require("../entities/user"));
function startCommand(instance) {
    instance.getBot().command("start", (ctx) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (ctx.chatId == undefined || ctx.chatId < 0)
                return;
            let user = instance.getUserManager().getUser(ctx.chatId);
            if (user == null) {
                user = new user_1.default(ctx.chatId);
                instance.getUserManager().addUser(user);
            }
            yield user.changeConversation(new start_1.default(user), ctx);
        }
        catch (err) { }
    }));
}
