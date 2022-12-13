import { CognitoUserPool as OriginalCognitoUserPool, } from 'amazon-cognito-identity-js';
import { CognitoUser } from './CognitoUser';
import { promisifySimple } from './utils';
export class CognitoUserPool {
    origPool;
    constructor(data) {
        this.origPool = new OriginalCognitoUserPool(data);
    }
    signUp(username, password, userAttributes, validationData, clientMetadata) {
        return promisifySimple(callback => this.origPool.signUp(username, password, userAttributes, validationData, callback, clientMetadata)).then(result => ({
            ...result,
            user: new CognitoUser(undefined, result.user),
        }));
    }
    getCurrentUser() {
        const user = this.origPool.getCurrentUser();
        if (!user) {
            return null;
        }
        return new CognitoUser(undefined, user);
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
