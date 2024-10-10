import { Bot } from 'grammy';

import { MyBot } from '../bot';

abstract class Manager {

    private instance: MyBot;

    
    constructor(instance: MyBot) {
        this.instance = instance;
    }


    onStart() {

    }
     
    onStop() {
        
    }


    public getInstance() {
        return this.instance;
    }

}

export default Manager;