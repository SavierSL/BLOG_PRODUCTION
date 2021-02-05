"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authCtrl_1 = require("../controllers/authCtrl");
var router = express_1.default.Router();
//@METHOD post
//@LogIn
//@api /auth
router.post("/login", authCtrl_1.logInUser);
exports.default = { router: router };
