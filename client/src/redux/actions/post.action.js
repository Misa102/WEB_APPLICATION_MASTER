
import { createActions} from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
}

export const getPosts = createActions({
    getPostsRequest : (payload) => payload,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (err) => err,
});

export const createPost = createActions({
    createPostRequest : (payload) => payload,
    createPostSuccess: (payload) => payload,
    createPostFailure: (err) => err,
});

export const updatePost = createActions({
    actionUpdatePost : (payload) => payload,
    actionUpdatePostSuccess: (payload) => payload,
    actionUpdatePostFailure: (err) => err,
});

export const deletePost = createActions({
    actionDeletePost : (payload) => payload,
    actionDeletePostSuccess: (payload) => payload,
    actionDeletePostPostFailure: (err) => err,
});

export const detailPost = createActions({
    actionGetDetailPost : (payload) => payload,
    actionGetDetailPostSuccess: (payload) => payload,
    actionGetDetailPostFailure: (err) => err,
});