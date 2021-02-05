"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timeStamp = function () {
    return new Date().toISOString();
};
var info = function (namespace, message, object) {
    if (object) {
        console.log("[" + timeStamp() + "] [INFO] [" + namespace + "] " + message, object);
    }
    else {
        console.log("[" + timeStamp() + "] [INFO] [" + namespace + "] " + message);
    }
};
var warn = function (namespace, message, object) {
    if (object) {
        console.warn("[" + timeStamp() + "] [WARN] [" + namespace + "] " + message, object);
    }
    else {
        console.warn("[" + timeStamp() + "] [WARN] [" + namespace + "] " + message);
    }
};
var error = function (namespace, message, object) {
    if (object) {
        console.error("[" + timeStamp() + "] [ERROR] [" + namespace + "] " + message, object);
    }
    else {
        console.error("[" + timeStamp() + "] [ERROR] [" + namespace + "] " + message);
    }
};
var debug = function (namespace, message, object) {
    if (object) {
        console.debug("[" + timeStamp() + "] [DEBUG] [" + namespace + "] " + message, object);
    }
    else {
        console.debug("[" + timeStamp() + "] [DEBUG] [" + namespace + "] " + message);
    }
};
exports.default = {
    info: info,
    warn: warn,
    error: error,
    debug: debug,
};
