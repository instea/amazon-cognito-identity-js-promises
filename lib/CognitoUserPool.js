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
import { CognitoUserPool as OriginalCognitoUserPool } from "amazon-cognito-identity-js";
import { CognitoUser } from "./CognitoUser";
import { promisifySimple } from "./utils";
export var CognitoUserPool = /*#__PURE__*/ function() {
    "use strict";
    function CognitoUserPool(data) {
        _classCallCheck(this, CognitoUserPool);
        this.origPool = new OriginalCognitoUserPool(data);
    }
    var _proto = CognitoUserPool.prototype;
    _proto.signUp = function signUp(username, password, userAttributes, validationData, clientMetadata) {
        var _this = this;
        return promisifySimple(function(callback) {
            return _this.origPool.signUp(username, password, userAttributes, validationData, callback, clientMetadata);
        }).then(function(result) {
            return _objectSpreadProps(_objectSpread({}, result), {
                user: new CognitoUser(null, result.user)
            });
        });
    };
    _proto.getCurrentUser = function getCurrentUser() {
        var user = this.origPool.getCurrentUser();
        if (!user) {
            return null;
        }
        return new CognitoUser(null, user);
    };
    _proto.getClientId = function getClientId() {
        return this.origPool.getClientId();
    };
    _proto.getUserPoolId = function getUserPoolId() {
        return this.origPool.getUserPoolId();
    };
    _proto.getUserPoolName = function getUserPoolName() {
        return this.origPool.getUserPoolName();
    };
    return CognitoUserPool;
}();
