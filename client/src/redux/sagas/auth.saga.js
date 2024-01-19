import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* login(action) {
    try {
        const resultLogin = yield call(api.login, action.payload);
        localStorage.setItem("user", JSON.stringify(resultLogin.data));
        localStorage.setItem("token", JSON.stringify(resultLogin.data.token));
        yield put(actions.authAction.actionLoginSuccess(resultLogin.data));
    } catch (err) {
        yield put(
            actions.authAction.actionLoginFailure({
                message: err.response.data.message,
            })
        );
    }
}

function* authSaga() {
    yield takeLatest(actions.authAction.actionLogin, login);
}

export default authSaga;
