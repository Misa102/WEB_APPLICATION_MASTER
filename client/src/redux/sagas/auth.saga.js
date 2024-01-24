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

function* registerSaga(action) {
    try {
        const resultRegister = yield call(api.register, action.payload);
        yield put(actions.registerAction.actionRegisterSuccess(resultRegister.status));
    } catch (err) {
        yield put(
            actions.registerAction.actionRegisterFailure({
                message: err.response.status
            })
        );
    }
}

function* authSaga() {
    yield takeLatest(actions.authAction.actionLogin, login);
    yield takeLatest(actions.registerAction.actionRegister, registerSaga);
}

export default authSaga;
