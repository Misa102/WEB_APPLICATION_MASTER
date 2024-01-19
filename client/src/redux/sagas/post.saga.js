import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

// generator fct quand il y a un action a lieu
function* fetchPostsSaga(action) {
    try {
        const posts = yield call(api.fetchPosts);
        console.log("[posts]", posts);
        //trigger action
        yield put(actions.getPosts.getPostsSuccess(posts.data));
    } catch (err) {
        console.error(err);
        yield put(actions.getPosts.getPostsFailure(err));
    }
}

function* createPostSaga(action) {
    try {
        const post = yield call(api.createPost, action.payload);
        console.log("[createPostSaga - post]", post);
        //trigger action
        yield put(actions.createPost.createPostSuccess(post.data));
    } catch (err) {
        console.error(err);
        yield put(actions.createPost.createPostFailure(err));
    }
}

function* updatePostSaga(action) {
    try {
        console.log("updatePostSaga", { action });
        const updatedPost = yield call(api.updatePost, action.payload);
        console.log("[updatePostSaga - post]", updatedPost);
        //trigger action
        yield put(actions.updatePost.updatePostSuccess(updatedPost.data));
    } catch (err) {
        console.error(err);
        yield put(actions.updatePost.updatePostFailure(err));
    }
}

function* postSaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
}

export default postSaga;