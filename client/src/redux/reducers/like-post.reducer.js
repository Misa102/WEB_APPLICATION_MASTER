import { INIT_STATE } from "../../constant";
import {
    saveLikePostAction,
    deleteLikePostAction,
    mapLikePostAction,
    mapTotalLikePostAction,
    currentPostAction,
    getType,
} from "../actions/like-post.action";

export default function likePostReducer(state = INIT_STATE.likePost, action) {
    switch (action.type) {
        case getType(mapLikePostAction.actionMapLikePost):
            return {
                ...state,
                mapLikePost: action.payload,
            };
        case getType(saveLikePostAction.actionSaveLikePost):
            return {
                ...state,
                requestSave: action.payload,
            };
        case getType(saveLikePostAction.actionSaveLikePostSuccess):
            return {
                ...state,
                responseSavePost: action.payload,
            };
        case getType(deleteLikePostAction.actionDeleteLikePost):
            return {
                ...state,
                requestDelete: action.payload,
            };

        case getType(deleteLikePostAction.actionDeleteLikePostSuccess):
            return {
                ...state,
                responseDeletePost: action.payload,
            };
        case getType(mapTotalLikePostAction.actionMapTotalLikePost):
            return {
                ...state,
                mapTotalLikePost: action.payload,
            };
        case getType(currentPostAction.actionSaveCurrentPost):
            return {
                ...state,
                currentPost: action.payload,
            };
        default:
            return state;
    }
}
