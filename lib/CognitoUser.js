function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
import { CognitoUser as OriginalCognitoUser } from "amazon-cognito-identity-js";
import { promisifySimple, promisifyStructured } from "./utils";
export var CognitoUser = /*#__PURE__*/ function() {
    "use strict";
    function CognitoUser(data, originalUser) {
        _classCallCheck(this, CognitoUser);
        if (data) {
            this.origUser = new OriginalCognitoUser(_objectSpreadProps(_objectSpread({}, data), {
                Pool: data.Pool.origPool
            }));
            return;
        }
        if (originalUser) {
            this.origUser = originalUser;
            return;
        }
        throw new Error("missing constructor arguments");
    }
    var _proto = CognitoUser.prototype;
    _proto.getSession = function getSession() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.getSession(cb);
        });
    };
    _proto.refreshSession = function refreshSession(refreshToken, clientMetadata) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.refreshSession(refreshToken, cb, clientMetadata);
        });
    };
    _proto.authenticateUser = function authenticateUser(authenticationDetails, callbacks) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.authenticateUser(authenticationDetails, _objectSpread({}, cb, callbacks));
        });
    };
    _proto.initiateAuth = function initiateAuth(authenticationDetails, callbacks) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.initiateAuth(authenticationDetails, _objectSpread({}, cb, callbacks));
        });
    };
    _proto.confirmRegistration = function confirmRegistration(code, forceAliasCreation, clientMetadata) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.confirmRegistration(code, forceAliasCreation, cb, clientMetadata);
        });
    };
    _proto.sendCustomChallengeAnswer = function sendCustomChallengeAnswer(answerChallenge, callbacks, clientMetaData) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.sendCustomChallengeAnswer(answerChallenge, _objectSpread({}, cb, callbacks), clientMetaData);
        });
    };
    _proto.resendConfirmationCode = function resendConfirmationCode(clientMetaData) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.resendConfirmationCode(cb, clientMetaData);
        });
    };
    _proto.changePassword = function changePassword(oldPassword, newPassword) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.changePassword(oldPassword, newPassword, cb);
        });
    };
    _proto.forgotPassword = function forgotPassword(callbacks, clientMetaData) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.forgotPassword(_objectSpread({}, cb, callbacks), clientMetaData);
        });
    };
    _proto.confirmPassword = function confirmPassword(verificationCode, newPassword, clientMetaData) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.confirmPassword(verificationCode, newPassword, cb, clientMetaData);
        });
    };
    _proto.setDeviceStatusRemembered = function setDeviceStatusRemembered() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.setDeviceStatusRemembered(cb);
        });
    };
    _proto.setDeviceStatusNotRemembered = function setDeviceStatusNotRemembered() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.setDeviceStatusNotRemembered(cb);
        });
    };
    _proto.getDevice = function getDevice() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.getDevice(cb);
        });
    };
    _proto.forgetDevice = function forgetDevice() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.forgetDevice(cb);
        });
    };
    _proto.forgetSpecificDevice = function forgetSpecificDevice(deviceKey) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.forgetSpecificDevice(deviceKey, cb);
        });
    };
    _proto.sendMFACode = function sendMFACode(confirmationCode, mfaType, clientMetadata) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.sendMFACode(confirmationCode, cb, mfaType, clientMetadata);
        });
    };
    _proto.listDevices = function listDevices(limit, paginationToken) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.listDevices(limit, paginationToken, cb);
        });
    };
    _proto.completeNewPasswordChallenge = function completeNewPasswordChallenge(newPassword, requiredAttributeData, callbacks, clientMetadata) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.completeNewPasswordChallenge(newPassword, requiredAttributeData, _objectSpread({}, cb, callbacks), clientMetadata);
        });
    };
    _proto.globalSignOut = function globalSignOut() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.globalSignOut(cb);
        });
    };
    _proto.verifyAttribute = function verifyAttribute(attributeName, confirmationCode) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.verifyAttribute(attributeName, confirmationCode, cb);
        });
    };
    _proto.getUserAttributes = function getUserAttributes() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.getUserAttributes(cb);
        });
    };
    _proto.updateAttributes = function updateAttributes(attributes) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.updateAttributes(attributes, cb);
        });
    };
    _proto.deleteAttributes = function deleteAttributes(attributeList) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.deleteAttributes(attributeList, cb);
        });
    };
    _proto.getAttributeVerificationCode = function getAttributeVerificationCode(name, callbacks) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.getAttributeVerificationCode(name, _objectSpread({}, cb, callbacks));
        });
    };
    _proto.deleteUser = function deleteUser() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.deleteUser(cb);
        });
    };
    _proto.enableMFA = function enableMFA() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.enableMFA(cb);
        });
    };
    _proto.disableMFA = function disableMFA() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.disableMFA(cb);
        });
    };
    _proto.getMFAOptions = function getMFAOptions() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.getMFAOptions(cb);
        });
    };
    _proto.getUserData = function getUserData(params) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.getUserData(cb, params);
        });
    };
    _proto.associateSoftwareToken = function associateSoftwareToken() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.associateSoftwareToken({
                associateSecretCode: cb.onSuccess,
                onFailure: cb.onFailure
            });
        });
    };
    _proto.verifySoftwareToken = function verifySoftwareToken(totpCode, friendlyDeviceName) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.verifySoftwareToken(totpCode, friendlyDeviceName, cb);
        });
    };
    _proto.setUserMfaPreference = function setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings, cb);
        });
    };
    _proto.sendMFASelectionAnswer = function sendMFASelectionAnswer(answerChallenge, callbacks) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _this.origUser.sendMFASelectionAnswer(answerChallenge, _objectSpread({}, cb, callbacks));
        });
    };
    _proto.signOut = function signOut() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _this.origUser.signOut(cb);
        });
    };
    _proto.getAuthenticationFlowType = function getAuthenticationFlowType() {
        return this.origUser.getAuthenticationFlowType();
    };
    _proto.getCachedDeviceKeyAndPassword = function getCachedDeviceKeyAndPassword() {
        return this.origUser.getCachedDeviceKeyAndPassword();
    };
    _proto.getSignInUserSession = function getSignInUserSession() {
        return this.origUser.getSignInUserSession();
    };
    _proto.getUsername = function getUsername() {
        return this.origUser.getUsername();
    };
    _proto.setAuthenticationFlowType = function setAuthenticationFlowType(authenticationFlowType) {
        return this.origUser.setAuthenticationFlowType(authenticationFlowType);
    };
    _proto.setSignInUserSession = function setSignInUserSession(signInUserSession) {
        return this.origUser.setSignInUserSession(signInUserSession);
    };
    return CognitoUser;
}();