"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPostsCTRL = exports.getUsersCTRL = exports.registerUserCTRL = void 0;
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var gravatar_1 = __importDefault(require("gravatar"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_1 = require("../models/User");
var settings_1 = require("../config/settings");
var BlogPost_1 = require("../models/BlogPost");
var registerUserCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, email, password, name, date, user, avatar, salt, _a, payload, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).send({ msg: errors.array() })];
                }
                email = req.body.email;
                password = req.body.password;
                name = req.body.name;
                date = req.body.date;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User_1.User.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res.status(400).json({ msg: [{ msg: "Email already exist" }] })];
                }
                avatar = gravatar_1.default.url(email, {
                    s: "200",
                    r: "pg",
                    d: "mm",
                });
                user = new User_1.User({
                    name: name,
                    email: email,
                    password: password,
                    avatar: avatar,
                    date: date,
                });
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _b.sent();
                _a = user;
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 4:
                _a.password = _b.sent();
                return [4 /*yield*/, user.save()];
            case 5:
                _b.sent();
                payload = {
                    user: {
                        id: user.id,
                    },
                };
                //token
                jsonwebtoken_1.default.sign(payload, settings_1.settings.jwtSecret, { expiresIn: 400000 }, function (e, token) {
                    if (e) {
                        throw e;
                    }
                    else {
                        res.json(token);
                    }
                });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ errors: error_1 })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.registerUserCTRL = registerUserCTRL;
var getUsersCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.User.findById(userID).select("-password")];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ msg: [{ msg: "Cannot find user" }] })];
                }
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).json({ msg: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUsersCTRL = getUsersCTRL;
var getUserPostsCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, userPosts, newPosts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, BlogPost_1.BlogPost.find().select("-img")];
            case 2:
                userPosts = _a.sent();
                if (userPosts.length === 0) {
                    return [2 /*return*/, res.status(400).json({ msg: [{ msg: "Cannot find a post" }] })];
                }
                console.log(userPosts);
                newPosts = userPosts.filter(function (post) {
                    var postID = post.user.toString();
                    if (postID === userID)
                        return post;
                });
                res.json(newPosts);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(400).json(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserPostsCTRL = getUserPostsCTRL;
