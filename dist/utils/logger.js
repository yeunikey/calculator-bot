"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static log(message) {
        const currentTime = new Date();
        const formattedTime = currentTime.getFullYear() + '-' +
            ('0' + (currentTime.getMonth() + 1)).slice(-2) + '-' +
            ('0' + currentTime.getDate()).slice(-2) + ' ' +
            ('0' + currentTime.getHours()).slice(-2) + '-' +
            ('0' + currentTime.getMinutes()).slice(-2) + '-' +
            ('0' + currentTime.getSeconds()).slice(-2);
        console.log(formattedTime + " / " + message);
    }
}
exports.default = Logger;
