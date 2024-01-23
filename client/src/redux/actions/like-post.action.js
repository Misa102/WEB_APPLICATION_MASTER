import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const saveLikePostAction = createActions({
    actionSaveLikePost: (payload) => payload,
    actionSaveLikePostSuccess: (payload) => payload,
    actionSaveLikePostFailure: (err) => err,
});

export const deleteLikePostAction = createActions({
    actionDeleteLikePost: (payload) => payload,
    actionDeleteLikePostSuccess: (payload) => payload,
    actionDeleteLikePostFailure: (err) => err,
});

export const mapLikePostAction = createActions({
    actionMapLikePost: (payload) => payload
});

export const mapTotalLikePostAction = createActions({
    actionMapTotalLikePost: (payload) => payload
});

export const currentPostAction = createActions({
    actionSaveCurrentPost: (payload) => payload
});