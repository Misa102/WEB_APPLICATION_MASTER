import { INIT_STATE } from "../../constant";
import { authAction, getType } from "../actions/auth";

export default function authReducers(state = INIT_STATE.auth, action) {
    switch (action.type) {
        case getType(authAction.actionLogin):
            return {
                ...state,
                request: action.payload
            };
        case getType(authAction.actionLoginSuccess):
            return {
                ...state,
                response: action.payload
            };
        case getType(authAction.actionLoginFailure):
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}
