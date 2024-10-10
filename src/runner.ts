import { Context } from 'grammy';

import { MyBot } from './bot';
import dotenv from 'dotenv';

dotenv.config();
const botToken = process.env.TELEGRAM_KEY;

if (!botToken) {
  console.error('TELEGRAM_KEY не задан в переменных окружения');
  process.exit(1);
}

let bot: MyBot = new MyBot(botToken);
bot.start();

export default bot;
