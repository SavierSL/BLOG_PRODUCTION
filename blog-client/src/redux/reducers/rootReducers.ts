import { combineReducers } from "redux";
import post from "../reducers/post";
import blogPost from "../reducers/blogPosts";

const rootReducers = combineReducers({ post, blogPost });
export default rootReducers;
