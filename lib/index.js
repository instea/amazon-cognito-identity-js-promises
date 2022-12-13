"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoUserPool = exports.CognitoUser = void 0;
__exportStar(require("amazon-cognito-identity-js"), exports);
// overrides exports from amazon-cognito-identity-js
var CognitoUser_1 = require("./CognitoUser");
Object.defineProperty(exports, "CognitoUser", { enumerable: true, get: function () { return CognitoUser_1.CognitoUser; } });
var CognitoUserPool_1 = require("./CognitoUserPool");
Object.defineProperty(exports, "CognitoUserPool", { enumerable: true, get: function () { return CognitoUserPool_1.CognitoUserPool; } });
