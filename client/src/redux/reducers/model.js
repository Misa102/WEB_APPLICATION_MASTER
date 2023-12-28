// pour traiter model
import { INIT_STATE } from "../../constant";
import { getType, hideModel, showModel } from "../actions";

export default function modelReducers(state = INIT_STATE.model, action){
    switch(action.type){
        case getType(showModel): 
            return {
                isShow: true,
            };
        
        case getType(hideModel): 
            return {
                isShow: false,
            };

        default:
            return state;         
    }
}