import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";


function* saveLikePostSaga(action) {
    try {
        const likePost = yield call(api.savePostLike, action.payload);
        yield put(actions.saveLikePostAction.actionSaveLikePostSuccess(likePost.status));
    } catch (err) {
        yield put(actions.saveLikePostAction.actionSaveLikePostFailure(err));
    }
}

function* deleteLikePostSaga(action) {
    try {
        const likePost = yield call(api.deletePostLike, action.payload);
        yield put(actions.deleteLikePostAction.actionDeleteLikePostSuccess(likePost.status));
    } catch (err) {
        yield put(actions.deleteLikePostAction.actionDeleteLikePostFailure(err));
    }
}

function* likePostSaga() {
    yield takeLatest(actions.saveLikePostAction.actionSaveLikePost, saveLikePostSaga);
    yield takeLatest(actions.deleteLikePostAction.actionDeleteLikePost, deleteLikePostSaga);
}

export default likePostSaga;