import { combineReducers } from "redux";
import posts from './posts.reducer';
import modal from './modal.reducer';
import auth from './auth.reducer';
import likePost from './like-post.reducer';
import user from './user.reducer';

export default combineReducers({
    posts,
    modal,
    auth,
    likePost,
    user
});