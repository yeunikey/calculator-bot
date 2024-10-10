"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const manager_1 = __importDefault(require("./manager"));
class UserManager extends manager_1.default {
    constructor() {
        super(...arguments);
        this.users = new Map();
    }
    getUsers() {
        return this.users;
    }
    getUser(id) {
        return this.users.get(id);
    }
    addUser(user) {
        this.users.set(user.id, user);
    }
    removeUserById(id) {
        this.users.delete(id);
    }
    removeUser(user) {
        this.removeUserById(user.id);
    }
    containsById(id) {
        this.users.has(id);
    }
    containsUser(user) {
        this.containsById(user.id);
    }
}
exports.UserManager = UserManager;
