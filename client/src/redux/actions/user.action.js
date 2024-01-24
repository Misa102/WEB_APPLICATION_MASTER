
import { createActions} from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
}

export const getAllUser = createActions({
    actionGetAllUser : undefined,
    actionGetAllUserSuccess: (payload) => payload,
    actionGetAllUserFailure: (err) => err,
});

export const updateStatusUser = createActions({
    actionUpdateStatusUser : (payload) => payload,
    actionUpdateStatusUserSuccess: (payload) => payload,
    actionUpdateStatusUserFailure: (err) => err,
});