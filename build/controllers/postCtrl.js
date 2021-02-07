"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostDeleteCommentCTRL = exports.BlogPostCommentCTRL = exports.BlogPostLikeCTRL = exports.BlogPostDeleteCTRL = exports.BlogPostEditPostCTRL = exports.GetPostUser = exports.GetAllPostCTRL = exports.BlogPostCTRL = void 0;
var BlogPost_1 = require("../models/BlogPost");
var User_1 = require("../models/User");
var express_validator_1 = require("express-validator");
var mongodb_1 = require("mongodb");
var imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "src/public/uploads/images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + file.originalname);
//   },
// });
// export const upload = multer({
//   storage: storage,
//   limits: {
//     fieldSize: 1024 * 1024 * 3,
//   },
// });
// function saveCover(post: postType, imgEncoded: any) {
//   if (imgEncoded === null) return;
//   const img = JSON.parse(imgEncoded);
//   console.log(img);
//   if (img != null && imageMimeTypes.includes(img.type)) {
//     post.img = Buffer.from(img, "base64");
//     post.imgType = img.type;
//   }
// }
//POST A BLOGPOST
var BlogPostCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, title, blogContent, userID, img, buf, user, post, newPost, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ msg: errors.array() })];
                }
                title = req.body.title;
                blogContent = req.body.blogContent;
                userID = req.user.id;
                img = req.body.img;
                buf = Buffer.from(img, "base64");
                console.log(buf);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.User.findById(userID).select("-password")];
            case 2:
                user = _a.sent();
                console.log(userID);
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ msg: [{ msg: "Cannot find user" }] })];
                }
                post = __assign({ user: user, name: user.name, title: title, blogContent: blogContent, img: buf }, req.body);
                newPost = new BlogPost_1.BlogPost(post);
                newPost.save();
                res.json(newPost);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(400).json({ msg: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.BlogPostCTRL = BlogPostCTRL;
//GET ALL POST
var GetAllPostCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, BlogPost_1.BlogPost.find()
                        .select("-img")
                        .populate("user", ["name", "avatar"])];
            case 1:
                posts = _a.sent();
                res.json(posts);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetAllPostCTRL = GetAllPostCTRL;
var GetPostUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postID, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postID = req.params.post_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, BlogPost_1.BlogPost.findById(postID).select("-img")];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ msg: [{ msg: "Cannot find user post" }] })];
                }
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(400).json({ msg: [{ msg: error_3 }] })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetPostUser = GetPostUser;
//EDIT POST
var BlogPostEditPostCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, userID, postID, updatedPost, post, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                userID = req.user.id;
                postID = req.params.post_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                updatedPost = req.body;
                return [4 /*yield*/, BlogPost_1.BlogPost.findOneAndUpdate({
                        user: userID,
                        _id: postID,
                    }, { $set: updatedPost }, { new: true })];
            case 2:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(400).json({ msg: "Can't find post" })];
                }
                return [4 /*yield*/, post.save()];
            case 3:
                _a.sent();
                res.json(post);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(400).json({ msg: error_4.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.BlogPostEditPostCTRL = BlogPostEditPostCTRL;
//DELETE POST
var BlogPostDeleteCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogPostID, postToDelete, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                blogPostID = req.params.post_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, BlogPost_1.BlogPost.findByIdAndDelete(blogPostID)];
            case 2:
                postToDelete = _a.sent();
                if (!postToDelete) {
                    return [2 /*return*/, res.status(400).json({ msg: "There is no post to delete" })];
                }
                res.json({ msg: "Deleted", deleted: postToDelete });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(400).json({ msg: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.BlogPostDeleteCTRL = BlogPostDeleteCTRL;
//LIKE
var BlogPostLikeCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogPostID, userID, post, user, newLikes, isLiked, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                blogPostID = req.params.post_id;
                userID = req.user.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, BlogPost_1.BlogPost.findOne({ _id: blogPostID })];
            case 2:
                post = _b.sent();
                return [4 /*yield*/, User_1.User.findOne({ _id: userID }).select("-password")];
            case 3:
                user = _b.sent();
                if (!post) {
                    return [2 /*return*/, res.status(400).json({ msg: "Invalid psot ID" })];
                }
                newLikes = [];
                isLiked = post.likes.filter(function (like) {
                    var likeID = like._id.toString();
                    return likeID === userID;
                });
                if (!((isLiked === null || isLiked === void 0 ? void 0 : isLiked.length) !== 0)) return [3 /*break*/, 5];
                newLikes = post.likes.filter(function (like) {
                    var likeID = like._id.toString();
                    return likeID !== userID;
                });
                post.likes = newLikes;
                return [4 /*yield*/, post.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, res.json(post)];
            case 5:
                (_a = post.likes) === null || _a === void 0 ? void 0 : _a.push(user);
                return [4 /*yield*/, post.save()];
            case 6:
                _b.sent();
                res.json(post);
                return [3 /*break*/, 8];
            case 7:
                error_6 = _b.sent();
                res.status(400).json({ msg: error_6.message });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.BlogPostLikeCTRL = BlogPostLikeCTRL;
//COMMENT IN POST
var BlogPostCommentCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, postID, userID, post, user, newComment, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ msg: errors.array() })];
                }
                postID = req.params.post_id;
                userID = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, BlogPost_1.BlogPost.findByIdAndUpdate(postID)];
            case 2:
                post = _a.sent();
                return [4 /*yield*/, User_1.User.findOne({ _id: userID }).select("-password")];
            case 3:
                user = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(400).json({ msg: [{ msg: "Can't find post" }] })];
                }
                newComment = __assign({ id: new mongodb_1.ObjectID(), name: user.name, avatar: user.avatar, user: userID, date: new Date().toISOString(), likes: [] }, req.body);
                post.comments.push(newComment);
                return [4 /*yield*/, post.save()];
            case 4:
                _a.sent();
                res.json(post);
                return [3 /*break*/, 6];
            case 5:
                error_7 = _a.sent();
                res.status(400).json({ msg: error_7.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.BlogPostCommentCTRL = BlogPostCommentCTRL;
//DELETE A COMMENT
var BlogPostDeleteCommentCTRL = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postID, commentIDtoDelete, post, newComments, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postID = req.params.post_id;
                commentIDtoDelete = req.params.comment_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, BlogPost_1.BlogPost.findByIdAndUpdate(postID)];
            case 2:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res.status(400).json({ msg: "Can't find post ID" })];
                }
                newComments = post.comments.filter(function (comment) {
                    var commentID = comment.id.toString();
                    return commentID !== commentIDtoDelete;
                });
                post.comments = newComments;
                return [4 /*yield*/, post.save()];
            case 3:
                _a.sent();
                res.json(post);
                return [3 /*break*/, 5];
            case 4:
                error_8 = _a.sent();
                res.status(400).json({ msg: error_8.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.BlogPostDeleteCommentCTRL = BlogPostDeleteCommentCTRL;
