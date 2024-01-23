export const getType = (reduxAction) => {
    return reduxAction().type;
}

export {authAction} from './auth.action';
export * from './like-post.action';
export * from './post.action';
export * from './modal.action';