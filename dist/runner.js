"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const botToken = process.env.TELEGRAM_KEY;
if (!botToken) {
    console.error('TELEGRAM_KEY не задан в переменных окружения');
    process.exit(1);
}
let bot = new bot_1.MyBot(botToken);
bot.start();
exports.default = bot;
