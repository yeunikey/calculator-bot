import { Bot, session } from 'grammy';
import { calculateCommand } from './commands/calculate';
import { UserManager } from './managers/user';
import { registerCallback } from './listeners/callback';
import { registerMessage } from './listeners/message';
import { startCommand } from './commands/start';

export class MyBot {

    /* Telegram apiKey & Bot instance */
    private apiKey: string;
    private bot: Bot;

    private userManager = new UserManager(this);

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.bot = new Bot(apiKey);
    }

    /* On application run */
    public start() {
        this.commands();
        this.listeners();
        this.managers();

        this.bot.start();
    }

    private managers() {
        this.userManager.onStart();
    }

    private commands() {
        calculateCommand(this);
        startCommand(this)
    }

    private listeners() {
        registerCallback(this);
        registerMessage(this);
    }

    public getBot() {
        return this.bot;
    }

    public getUserManager() {
        return this.userManager;
    }

    public getApiKey() {
        return this.apiKey;
    }

}