import { all, fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import postSaga from "./post.saga";
import likePostSaga from "./like-post.saga";
import userSaga from "./user.saga";

function* mySaga() {
    yield all([
        fork(authSaga),
        fork(postSaga),
        fork(likePostSaga),
        fork(userSaga),
    ]);
}

export default mySaga;
