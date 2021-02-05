"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var settings_1 = require("../config/settings");
var auth = function (req, res, next) {
    var token = req.header("x-auth-token");
    if (!token) {
        return res.status(400).json({ msg: "There is no valid token" });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, settings_1.settings.jwtSecret);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
};
exports.auth = auth;
