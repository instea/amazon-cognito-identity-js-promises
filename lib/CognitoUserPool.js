"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoUserPool = void 0;
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const CognitoUser_1 = require("./CognitoUser");
const utils_1 = require("./utils");
class CognitoUserPool {
    origPool;
    constructor(data) {
        this.origPool = new amazon_cognito_identity_js_1.CognitoUserPool(data);
    }
    signUp(username, password, userAttributes, validationData, clientMetadata) {
        return (0, utils_1.promisifySimple)(callback => this.origPool.signUp(username, password, userAttributes, validationData, callback, clientMetadata)).then(result => ({
            ...result,
            user: new CognitoUser_1.CognitoUser(undefined, result.user),
        }));
    }
    getCurrentUser() {
        const user = this.origPool.getCurrentUser();
        if (!user) {
            return null;
        }
        return new CognitoUser_1.CognitoUser(undefined, user);
    }
    getClientId() {
        return this.origPool.getClientId();
    }
    getUserPoolId() {
        return this.origPool.getUserPoolId();
    }
    getUserPoolName() {
        return this.origPool.getUserPoolName();
    }
}
exports.CognitoUserPool = CognitoUserPool;
