import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchPostsSaga(action) {
    try {
        const posts = yield call(api.fetchPosts, action.payload);
        yield put(actions.getPosts.getPostsSuccess(posts.data));
    } catch (err) {
        yield put(actions.getPosts.getPostsFailure(err));
    }
}

function* createPostSaga(action) {
    try {
        const post = yield call(api.createPost, action.payload);
        yield put(actions.createPost.createPostSuccess(post.data));
    } catch (err) {
        yield put(actions.createPost.createPostFailure(err));
    }
}

function* updatePostSaga(action) {
    try {
        const updatedPost = yield call(api.updatePost, action.payload);
        yield put(actions.updatePost.actionUpdatePostSuccess(updatedPost.status));
    } catch (err) {
        yield put(actions.updatePost.actionUpdatePostFailure(err.response.status));
    }
}

function* deletePostSaga(action) {
    try {
        const deletePost = yield call(api.deletePost, action.payload);
        yield put(actions.deletePost.actionDeletePostSuccess(deletePost.status));
    } catch (err) {
        console.log(err)
        yield put(actions.deletePost.actionDeletePostPostFailure(err.response.status));
    }
}

function* getDetailPostSaga(action) {
    try {
        const detailPost = yield call(api.getDetailPost, action.payload);
        yield put(actions.detailPost.actionGetDetailPostSuccess(detailPost.data));
    } catch (err) {
        yield put(actions.detailPost.actionGetDetailPostFailure(err));
    }
}

function* postSaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
    yield takeLatest(actions.updatePost.actionUpdatePost, updatePostSaga);
    yield takeLatest(actions.deletePost.actionDeletePost, deletePostSaga);
    yield takeLatest(actions.detailPost.actionGetDetailPost, getDetailPostSaga);
}

export default postSaga;