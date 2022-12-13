"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisifyStructured = exports.promisifySimple = void 0;
function promisifySimple(fn) {
    return new Promise((resolve, reject) => fn((err, data) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(data);
    }));
}
exports.promisifySimple = promisifySimple;
function promisifyStructured(fn) {
    return new Promise((onSuccess, onFailure) => fn({ onSuccess, onFailure }));
}
exports.promisifyStructured = promisifyStructured;
