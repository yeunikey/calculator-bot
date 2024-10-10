"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Manager {
    constructor(instance) {
        this.instance = instance;
    }
    onStart() {
    }
    onStop() {
    }
    getInstance() {
        return this.instance;
    }
}
exports.default = Manager;
