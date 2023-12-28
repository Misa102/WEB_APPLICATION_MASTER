import { combineReducers } from "redux";
import posts from './posts';
import model from './model';

export default combineReducers({
    posts,
    model,
});