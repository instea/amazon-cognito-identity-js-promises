import { CognitoUser as OriginalCognitoUser, } from 'amazon-cognito-identity-js';
import { promisifySimple, promisifyStructured } from './utils';
export class CognitoUser {
    origUser;
    constructor(data, originalUser) {
        if (data) {
            this.origUser = new OriginalCognitoUser({
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
        return promisifySimple(cb => this.origUser.getSession(cb));
    }
    refreshSession(refreshToken, clientMetadata) {
        return promisifySimple(cb => this.origUser.refreshSession(refreshToken, cb, clientMetadata));
    }
    authenticateUser(authenticationDetails, callbacks) {
        return promisifyStructured(cb => this.origUser.authenticateUser(authenticationDetails, {
            ...cb,
            ...callbacks,
        }));
    }
    initiateAuth(authenticationDetails, callbacks) {
        return promisifyStructured(cb => this.origUser.initiateAuth(authenticationDetails, { ...cb, ...callbacks }));
    }
    confirmRegistration(code, forceAliasCreation, clientMetadata) {
        return promisifySimple(cb => this.origUser.confirmRegistration(code, forceAliasCreation, cb, clientMetadata));
    }
    sendCustomChallengeAnswer(answerChallenge, callbacks, clientMetaData) {
        return promisifyStructured(cb => this.origUser.sendCustomChallengeAnswer(answerChallenge, { ...cb, ...callbacks }, clientMetaData));
    }
    resendConfirmationCode(clientMetaData) {
        return promisifySimple(cb => this.origUser.resendConfirmationCode(cb, clientMetaData));
    }
    changePassword(oldPassword, newPassword) {
        return promisifySimple(cb => this.origUser.changePassword(oldPassword, newPassword, cb));
    }
    forgotPassword(callbacks, clientMetaData) {
        return promisifyStructured(cb => this.origUser.forgotPassword({ ...cb, ...callbacks }, clientMetaData));
    }
    confirmPassword(verificationCode, newPassword, clientMetaData) {
        return promisifyStructured(cb => this.origUser.confirmPassword(verificationCode, newPassword, cb, clientMetaData));
    }
    setDeviceStatusRemembered() {
        return promisifyStructured(cb => this.origUser.setDeviceStatusRemembered(cb));
    }
    setDeviceStatusNotRemembered() {
        return promisifyStructured(cb => this.origUser.setDeviceStatusNotRemembered(cb));
    }
    getDevice() {
        return promisifyStructured(cb => this.origUser.getDevice(cb));
    }
    forgetDevice() {
        return promisifyStructured(cb => this.origUser.forgetDevice(cb));
    }
    forgetSpecificDevice(deviceKey) {
        return promisifyStructured(cb => this.origUser.forgetSpecificDevice(deviceKey, cb));
    }
    sendMFACode(confirmationCode, mfaType, clientMetadata) {
        return promisifyStructured(cb => this.origUser.sendMFACode(confirmationCode, cb, mfaType, clientMetadata));
    }
    listDevices(limit, paginationToken) {
        return promisifyStructured(cb => this.origUser.listDevices(limit, paginationToken, cb));
    }
    completeNewPasswordChallenge(newPassword, requiredAttributeData, callbacks, clientMetadata) {
        return promisifyStructured(cb => this.origUser.completeNewPasswordChallenge(newPassword, requiredAttributeData, { ...cb, ...callbacks }, clientMetadata));
    }
    globalSignOut() {
        return promisifyStructured(cb => this.origUser.globalSignOut(cb));
    }
    verifyAttribute(attributeName, confirmationCode) {
        return promisifyStructured(cb => this.origUser.verifyAttribute(attributeName, confirmationCode, cb));
    }
    getUserAttributes() {
        return promisifySimple(cb => this.origUser.getUserAttributes(cb));
    }
    updateAttributes(attributes) {
        return promisifySimple(cb => this.origUser.updateAttributes(attributes, cb));
    }
    deleteAttributes(attributeList) {
        return promisifySimple(cb => this.origUser.deleteAttributes(attributeList, cb));
    }
    getAttributeVerificationCode(name, callbacks) {
        return promisifyStructured(cb => this.origUser.getAttributeVerificationCode(name, { ...cb, ...callbacks }));
    }
    deleteUser() {
        return promisifySimple(cb => this.origUser.deleteUser(cb));
    }
    enableMFA() {
        return promisifySimple(cb => this.origUser.enableMFA(cb));
    }
    disableMFA() {
        return promisifySimple(cb => this.origUser.disableMFA(cb));
    }
    getMFAOptions() {
        return promisifySimple(cb => this.origUser.getMFAOptions(cb));
    }
    getUserData(params) {
        return promisifySimple(cb => this.origUser.getUserData(cb, params));
    }
    associateSoftwareToken() {
        return promisifyStructured(cb => this.origUser.associateSoftwareToken({
            associateSecretCode: cb.onSuccess,
            onFailure: cb.onFailure,
        }));
    }
    verifySoftwareToken(totpCode, friendlyDeviceName) {
        return promisifyStructured(cb => this.origUser.verifySoftwareToken(totpCode, friendlyDeviceName, cb));
    }
    setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings) {
        return promisifySimple(cb => this.origUser.setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings, cb));
    }
    sendMFASelectionAnswer(answerChallenge, callbacks) {
        return promisifyStructured(cb => this.origUser.sendMFASelectionAnswer(answerChallenge, {
            ...cb,
            ...callbacks,
        }));
    }
    signOut() {
        return promisifySimple(cb => this.origUser.signOut(cb));
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
