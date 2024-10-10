"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyBot = void 0;
const grammy_1 = require("grammy");
const calculate_1 = require("./commands/calculate");
const user_1 = require("./managers/user");
const callback_1 = require("./listeners/callback");
const message_1 = require("./listeners/message");
class MyBot {
    constructor(apiKey) {
        this.userManager = new user_1.UserManager(this);
        this.apiKey = apiKey;
        this.bot = new grammy_1.Bot(apiKey);
    }
    /* On application run */
    start() {
        this.commands();
        this.listeners();
        this.managers();
        this.bot.start();
    }
    managers() {
        this.userManager.onStart();
    }
    commands() {
        (0, calculate_1.calculateCommand)(this);
    }
    listeners() {
        (0, callback_1.registerCallback)(this);
        (0, message_1.registerMessage)(this);
    }
    getBot() {
        return this.bot;
    }
    getUserManager() {
        return this.userManager;
    }
    getApiKey() {
        return this.apiKey;
    }
}
exports.MyBot = MyBot;
