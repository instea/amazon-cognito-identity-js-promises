"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoUser = void 0;
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const utils_1 = require("./utils");
class CognitoUser {
    origUser;
    constructor(data, originalUser) {
        if (data) {
            this.origUser = new amazon_cognito_identity_js_1.CognitoUser({
                ...data,
                Pool: data.Pool.origPool,
            });
            return;
        }
        if (originalUser) {
            this.origUser = originalUser;
            return;
        }
        throw new Error('missing constructor arguments');
    }
    getSession() {
        return (0, utils_1.promisifySimple)(cb => this.origUser.getSession(cb));
    }
    refreshSession(refreshToken, clientMetadata) {
        return (0, utils_1.promisifySimple)(cb => this.origUser.refreshSession(refreshToken, cb, clientMetadata));
    }
    authenticateUser(authenticationDetails, callbacks) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.authenticateUser(authenticationDetails, {
            ...cb,
            ...callbacks,
        }));
    }
    initiateAuth(authenticationDetails, callbacks) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.initiateAuth(authenticationDetails, { ...cb, ...callbacks }));
    }
    confirmRegistration(code, forceAliasCreation, clientMetadata) {
        return (0, utils_1.promisifySimple)(cb => this.origUser.confirmRegistration(code, forceAliasCreation, cb, clientMetadata));
    }
    sendCustomChallengeAnswer(answerChallenge, callbacks, clientMetaData) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.sendCustomChallengeAnswer(answerChallenge, { ...cb, ...callbacks }, clientMetaData));
    }
    resendConfirmationCode(clientMetaData) {
        return (0, utils_1.promisifySimple)(cb => this.origUser.resendConfirmationCode(cb, clientMetaData));
    }
    changePassword(oldPassword, newPassword) {
        return (0, utils_1.promisifySimple)(cb => this.origUser.changePassword(oldPassword, newPassword, cb));
    }
    forgotPassword(callbacks, clientMetaData) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.forgotPassword({ ...cb, ...callbacks }, clientMetaData));
    }
    confirmPassword(verificationCode, newPassword, clientMetaData) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.confirmPassword(verificationCode, newPassword, cb, clientMetaData));
    }
    setDeviceStatusRemembered() {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.setDeviceStatusRemembered(cb));
    }
    setDeviceStatusNotRemembered() {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.setDeviceStatusNotRemembered(cb));
    }
    getDevice() {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.getDevice(cb));
    }
    forgetDevice() {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.forgetDevice(cb));
    }
    forgetSpecificDevice(deviceKey) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.forgetSpecificDevice(deviceKey, cb));
    }
    sendMFACode(confirmationCode, mfaType, clientMetadata) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.sendMFACode(confirmationCode, cb, mfaType, clientMetadata));
    }
    listDevices(limit, paginationToken) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.listDevices(limit, paginationToken, cb));
    }
    completeNewPasswordChallenge(newPassword, requiredAttributeData, callbacks, clientMetadata) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.completeNewPasswordChallenge(newPassword, requiredAttributeData, { ...cb, ...callbacks }, clientMetadata));
    }
    globalSignOut() {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.globalSignOut(cb));
    }
    verifyAttribute(attributeName, confirmationCode) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.verifyAttribute(attributeName, confirmationCode, cb));
    }
    getUserAttributes() {
        return (0, utils_1.promisifySimple)(cb => this.origUser.getUserAttributes(cb));
    }
    updateAttributes(attributes) {
        return (0, utils_1.promisifySimple)(cb => this.origUser.updateAttributes(attributes, cb));
    }
    deleteAttributes(attributeList) {
        return (0, utils_1.promisifySimple)(cb => this.origUser.deleteAttributes(attributeList, cb));
    }
    getAttributeVerificationCode(name, callbacks) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.getAttributeVerificationCode(name, { ...cb, ...callbacks }));
    }
    deleteUser() {
        return (0, utils_1.promisifySimple)(cb => this.origUser.deleteUser(cb));
    }
    enableMFA() {
        return (0, utils_1.promisifySimple)(cb => this.origUser.enableMFA(cb));
    }
    disableMFA() {
        return (0, utils_1.promisifySimple)(cb => this.origUser.disableMFA(cb));
    }
    getMFAOptions() {
        return (0, utils_1.promisifySimple)(cb => this.origUser.getMFAOptions(cb));
    }
    getUserData(params) {
        return (0, utils_1.promisifySimple)(cb => this.origUser.getUserData(cb, params));
    }
    associateSoftwareToken() {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.associateSoftwareToken({
            associateSecretCode: cb.onSuccess,
            onFailure: cb.onFailure,
        }));
    }
    verifySoftwareToken(totpCode, friendlyDeviceName) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.verifySoftwareToken(totpCode, friendlyDeviceName, cb));
    }
    setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings) {
        return (0, utils_1.promisifySimple)(cb => this.origUser.setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings, cb));
    }
    sendMFASelectionAnswer(answerChallenge, callbacks) {
        return (0, utils_1.promisifyStructured)(cb => this.origUser.sendMFASelectionAnswer(answerChallenge, {
            ...cb,
            ...callbacks,
        }));
    }
    signOut() {
        return (0, utils_1.promisifySimple)(cb => this.origUser.signOut(cb));
    }
    getAuthenticationFlowType() {
        return this.origUser.getAuthenticationFlowType();
    }
    getCachedDeviceKeyAndPassword() {
        return this.origUser.getCachedDeviceKeyAndPassword();
    }
    getSignInUserSession() {
        return this.origUser.getSignInUserSession();
    }
    getUsername() {
        return this.origUser.getUsername();
    }
    setAuthenticationFlowType(authenticationFlowType) {
        return this.origUser.setAuthenticationFlowType(authenticationFlowType);
    }
    setSignInUserSession(signInUserSession) {
        return this.origUser.setSignInUserSession(signInUserSession);
    }
}
exports.CognitoUser = CognitoUser;
