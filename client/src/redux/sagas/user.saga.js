import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* getAllUserSaga(action) {
    try {
        const getAllUser = yield call(api.getAllUsers);
        yield put(actions.getAllUser.actionGetAllUserSuccess(getAllUser.data));
    } catch (err) {
        yield put(actions.getAllUser.actionGetAllUserFailure(err));
    }
}

function* updateStatusUserSaga(action) {
    try {
        const updateStatusUser = yield call(
            api.updateStatusUser,
            action.payload
        );
        yield put(
            actions.updateStatusUser.actionUpdateStatusUserSuccess(
                updateStatusUser.status
            )
        );
    } catch (err) {
        yield put(
            actions.updateStatusUser.actionUpdateStatusUserFailure(
                err.response.status
            )
        );
    }
}

function* userSaga() {
    yield takeLatest(actions.getAllUser.actionGetAllUser, getAllUserSaga);
    yield takeLatest(
        actions.updateStatusUser.actionUpdateStatusUser,
        updateStatusUserSaga
    );
}

export default userSaga;
