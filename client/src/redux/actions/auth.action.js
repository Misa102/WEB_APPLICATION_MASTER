import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const authAction = createActions({
    actionLogin: (payload) => payload,
    actionLoginSuccess: (payload) => payload,
    actionLoginFailure: (err) => err,
});
