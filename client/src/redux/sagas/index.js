import { all, fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import postSaga from "./post.saga";
import likePostSaga from "./like-post.saga";

function* mySaga() {
    yield all([ fork(authSaga), fork(postSaga), fork(likePostSaga) ])
}

export default mySaga;
