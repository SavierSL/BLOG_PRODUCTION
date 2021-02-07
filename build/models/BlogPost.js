"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var mongodb_1 = require("mongodb");
exports.BlogPost = mongoose_1.model("blogpost", new mongoose_1.default.Schema({
    user: {
        type: mongodb_1.ObjectID,
        ref: "user",
    },
    name: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    blogContent: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: Buffer,
        default: "",
    },
    imgType: {
        type: String,
        default: "",
    },
    comments: { type: Array, default: [] },
    likes: { type: Array, default: [] },
    date: {
        type: Date,
        default: new Date().toISOString(),
    },
}));
