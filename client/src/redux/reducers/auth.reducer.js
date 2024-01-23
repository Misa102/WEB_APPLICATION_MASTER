import { INIT_STATE } from "../../constant";
import { authAction, getType } from "../actions/auth.action";

export default function authReducers(state = INIT_STATE.auth, action) {
    switch (action.type) {
        case getType(authAction.actionLogin):
            return {
                ...state,
                request: action.payload,
                response: undefined,
            };
        case getType(authAction.actionLoginSuccess):
            return {
                ...state,
                request: undefined,
                response: action.payload,
            };
        case getType(authAction.actionLoginFailure):
            return {
                ...state,
                error: action.payload,
                request: undefined,
                response: undefined,
            };
        default:
            return state;
    }
}
