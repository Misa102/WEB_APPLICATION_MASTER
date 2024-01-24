import { INIT_STATE } from "../../constant";
import * as actions from "../actions";

export default function userReducer(state = INIT_STATE.user, action) {
    switch (action.type) {
        case actions.getType(actions.getAllUser.actionGetAllUser):
            return {
                ...state,
            };

        case actions.getType(actions.getAllUser.actionGetAllUserSuccess):
            return {
                ...state,
                responseGetAll: action.payload,
            };

        case actions.getType(actions.updateStatusUser.actionUpdateStatusUser):
            return {
                ...state,
                requestUpdate: action.payload,
            };

        case actions.getType(
            actions.updateStatusUser.actionUpdateStatusUserSuccess
        ):
            return {
                ...state,
                responseUpdate: action.payload,
            };

        case actions.getType(
            actions.updateStatusUser.actionUpdateStatusUserFailure
        ):
            return {
                ...state,
                responseUpdate: action.payload,
            };

        default:
            return state;
    }
}
