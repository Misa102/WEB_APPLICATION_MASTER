// pour traiter model
import { INIT_STATE } from "../../constant";
import { getType, modal } from "../actions";

export default function modalReducers(state = INIT_STATE.modal, action) {
    switch (action.type) {
        case getType(modal.showModal):
            return {
                ...state,
                isShow: true,
                id: action.payload,
            };

        case getType(modal.hideModal):
            return {
                ...state,
                isShow: false,
                id: action.payload,
            };

        default:
            return state;
    }
}
