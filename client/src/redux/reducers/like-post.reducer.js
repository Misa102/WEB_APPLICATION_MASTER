import { INIT_STATE } from "../../constant";
import {
    saveLikePostAction,
    deleteLikePostAction,
    mapLikePostAction,
    getType,
} from "../actions/like-post";

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
        case getType(deleteLikePostAction.actionDeleteLikePost):
            return {
                ...state,
                requestDelete: action.payload,
            };
        default:
            return state;
    }
}
