import { createActions} from 'redux-actions';
export const getType = (reduxAction) => {
    return reduxAction().type;
}


export const modal = createActions({
    showModal : (payload) => payload,
    hideModal: (payload) => payload,
});