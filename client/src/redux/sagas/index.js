import { all, fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import postSaga from "./post.saga";

function* mySaga() {
    yield all([ fork(authSaga), fork(postSaga) ])
}

export default mySaga;
