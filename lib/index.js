function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
import { CognitoUser as OriginalCognitoUser, CognitoUserPool as OriginalCognitoUserPool } from "amazon-cognito-identity-js";
export * from "amazon-cognito-identity-js";
function promisifySimple(fn) {
    return new Promise(function(resolve, reject) {
        return fn(function(err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
function promisifyStructured(fn) {
    return new Promise(function(onSuccess, onFailure) {
        return fn({
            onSuccess: onSuccess,
            onFailure: onFailure
        });
    });
}
// FIXME: Leaving out arguments that come after callback (like clientMetadata, CognitoUser->sendMFACode.mfaType) because it is not possible easily override
// FIXME: IAuthenticationCallback.onSuccess contains 2 arguments, for now leaving out second one (userConfirmationNecessary) as it would require interface change
// FIXME: IAuthenticationCallback (and other structured callback objects) trigger more callbacks like IAuthenticationCallback->newPasswordRequired, mfaRequired, ... This is currently not supported
export var CognitoUserPool = /*#__PURE__*/ function(OriginalCognitoUserPool) {
    "use strict";
    _inherits(CognitoUserPool, OriginalCognitoUserPool);
    var _super = _createSuper(CognitoUserPool);
    function CognitoUserPool() {
        _classCallCheck(this, CognitoUserPool);
        return _super.apply(this, arguments);
    }
    var _proto = CognitoUserPool.prototype;
    _proto.signUp = function signUp(username, password, userAttributes, validationData) {
        var _this = this;
        return promisifySimple(function(callback) {
            return _get(_getPrototypeOf(CognitoUserPool.prototype), "signUp", _this).call(_this, username, password, userAttributes, validationData, callback);
        });
    };
    _proto.getCurrentUser = function getCurrentUser() {
        var user = _get(_getPrototypeOf(CognitoUserPool.prototype), "getCurrentUser", this).call(this);
        if (!user) {
            return null;
        }
        Object.setPrototypeOf(user, CognitoUser.prototype);
        return user;
    };
    return CognitoUserPool;
}(OriginalCognitoUserPool);
export var CognitoUser = /*#__PURE__*/ function(OriginalCognitoUser) {
    "use strict";
    _inherits(CognitoUser, OriginalCognitoUser);
    var _super = _createSuper(CognitoUser);
    function CognitoUser() {
        _classCallCheck(this, CognitoUser);
        return _super.apply(this, arguments);
    }
    var _proto = CognitoUser.prototype;
    _proto.getSession = function getSession() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "getSession", _this).call(_this, cb);
        });
    };
    _proto.refreshSession = function refreshSession(refreshToken) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "refreshSession", _this).call(_this, refreshToken, cb);
        });
    };
    _proto.authenticateUser = function authenticateUser(authenticationDetails) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "authenticateUser", _this).call(_this, authenticationDetails, cb);
        });
    };
    _proto.initiateAuth = function initiateAuth(authenticationDetails) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "initiateAuth", _this).call(_this, authenticationDetails, cb);
        });
    };
    _proto.confirmRegistration = function confirmRegistration(code, forceAliasCreation) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "confirmRegistration", _this).call(_this, code, forceAliasCreation, cb);
        });
    };
    _proto.sendCustomChallengeAnswer = function sendCustomChallengeAnswer(answerChallenge) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "sendCustomChallengeAnswer", _this).call(_this, answerChallenge, cb);
        });
    };
    _proto.resendConfirmationCode = function resendConfirmationCode() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "resendConfirmationCode", _this).call(_this, cb);
        });
    };
    _proto.changePassword = function changePassword(oldPassword, newPassword) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "changePassword", _this).call(_this, oldPassword, newPassword, cb);
        });
    };
    _proto.forgotPassword = function forgotPassword() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "forgotPassword", _this).call(_this, cb);
        });
    };
    _proto.confirmPassword = function confirmPassword(verificationCode, newPassword) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "confirmPassword", _this).call(_this, verificationCode, newPassword, cb);
        });
    };
    _proto.setDeviceStatusRemembered = function setDeviceStatusRemembered() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "setDeviceStatusRemembered", _this).call(_this, cb);
        });
    };
    _proto.setDeviceStatusNotRemembered = function setDeviceStatusNotRemembered() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "setDeviceStatusNotRemembered", _this).call(_this, cb);
        });
    };
    _proto.getDevice = function getDevice() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "getDevice", _this).call(_this, cb);
        });
    };
    _proto.forgetDevice = function forgetDevice() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "forgetDevice", _this).call(_this, cb);
        });
    };
    _proto.forgetSpecificDevice = function forgetSpecificDevice(deviceKey) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "forgetSpecificDevice", _this).call(_this, deviceKey, cb);
        });
    };
    _proto.sendMFACode = function sendMFACode(confirmationCode) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "sendMFACode", _this).call(_this, confirmationCode, cb);
        });
    };
    _proto.listDevices = function listDevices(limit, paginationToken) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "listDevices", _this).call(_this, limit, paginationToken, cb);
        });
    };
    _proto.completeNewPasswordChallenge = function completeNewPasswordChallenge(newPassword, requiredAttributeData) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "completeNewPasswordChallenge", _this).call(_this, newPassword, requiredAttributeData, cb);
        });
    };
    _proto.globalSignOut = function globalSignOut() {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "globalSignOut", _this).call(_this, cb);
        });
    };
    _proto.verifyAttribute = function verifyAttribute(attributeName, confirmationCode) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "verifyAttribute", _this).call(_this, attributeName, confirmationCode, cb);
        });
    };
    _proto.getUserAttributes = function getUserAttributes() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "getUserAttributes", _this).call(_this, cb);
        });
    };
    _proto.updateAttributes = function updateAttributes(attributes) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "updateAttributes", _this).call(_this, attributes, cb);
        });
    };
    _proto.deleteAttributes = function deleteAttributes(attributeList) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "deleteAttributes", _this).call(_this, attributeList, cb);
        });
    };
    _proto.getAttributeVerificationCode = function getAttributeVerificationCode(name) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "getAttributeVerificationCode", _this).call(_this, name, cb);
        });
    };
    _proto.deleteUser = function deleteUser() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "deleteUser", _this).call(_this, cb);
        });
    };
    _proto.enableMFA = function enableMFA() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "enableMFA", _this).call(_this, cb);
        });
    };
    _proto.disableMFA = function disableMFA() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "disableMFA", _this).call(_this, cb);
        });
    };
    _proto.getMFAOptions = function getMFAOptions() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "getMFAOptions", _this).call(_this, cb);
        });
    };
    _proto.getUserData = function getUserData() {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "getUserData", _this).call(_this, cb);
        });
    };
    _proto.associateSoftwareToken = function associateSoftwareToken(callbacks) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "associateSoftwareToken", _this).call(_this, {
                associateSecretCode: cb.onSuccess,
                onFailure: cb.onFailure
            });
        });
    };
    _proto.verifySoftwareToken = function verifySoftwareToken(totpCode, friendlyDeviceName) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "verifySoftwareToken", _this).call(_this, totpCode, friendlyDeviceName, cb);
        });
    };
    _proto.setUserMfaPreference = function setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings) {
        var _this = this;
        return promisifySimple(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "setUserMfaPreference", _this).call(_this, smsMfaSettings, softwareTokenMfaSettings, cb);
        });
    };
    _proto.sendMFASelectionAnswer = function sendMFASelectionAnswer(answerChallenge) {
        var _this = this;
        return promisifyStructured(function(cb) {
            return _get(_getPrototypeOf(CognitoUser.prototype), "sendMFASelectionAnswer", _this).call(_this, answerChallenge, cb);
        });
    };
    return CognitoUser;
}(OriginalCognitoUser);
