import { INIT_STATE } from "../../constant";
import { authAction, registerAction, getType } from "../actions/auth.action";

export default function authReducers(state = INIT_STATE.auth, action) {
    switch (action.type) {
        case getType(authAction.actionLogin):
            return {
                ...state,
                request: action.payload,
            };
        case getType(authAction.actionLoginSuccess):
            return {
                ...state,
                response: action.payload,
            };
        case getType(authAction.actionLoginFailure):
            return {
                ...state,
                error: action.payload
            };

        case getType(registerAction.actionRegister):
            return {
                ...state,
                requestRegister: action.payload,
            };
        case getType(registerAction.actionRegisterSuccess):
            return {
                ...state,
                responseRegister: action.payload,
            };
        case getType(registerAction.actionRegisterFailure):
            return {
                ...state,
                responseRegister: action.payload,
            };
        default:
            return state;
    }
}
