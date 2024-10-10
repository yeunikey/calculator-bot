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
exports.calculateCommand = calculateCommand;
const calculate_1 = __importDefault(require("../conversation/calculate"));
const user_1 = __importDefault(require("../entities/user"));
const logger_1 = __importDefault(require("../utils/logger"));
function calculateCommand(instance) {
    try {
        instance.getBot().command("calculate", (ctx) => __awaiter(this, void 0, void 0, function* () {
            if (ctx.chatId == undefined || ctx.chatId < 0)
                return;
            let user = instance.getUserManager().getUser(ctx.chatId);
            if (user == null) {
                user = new user_1.default(ctx.chatId);
                instance.getUserManager().addUser(user);
            }
            try {
                yield user.changeConversation(new calculate_1.default(user), ctx);
            }
            catch (err) {
            }
        }));
    }
    catch (err) {
        logger_1.default.log("Не удалось подключиться к CalculateConversation, " + err);
    }
}
