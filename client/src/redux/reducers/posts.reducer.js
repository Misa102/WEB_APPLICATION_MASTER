import { INIT_STATE } from "../../constant";
import {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getType,
    detailPost,
} from "../actions";

export default function postsReducers(state = INIT_STATE.posts, action) {
    switch (action.type) {
        case getType(getPosts.getPostsRequest): // case 'getPostsRequest'
            return {
                ...state,
                isLoading: true,
                requestSearch: action.payload
            };
        case getType(getPosts.getPostsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getPosts.getPostsFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createPost.createPostSuccess):
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case getType(createPost.createPostFailure):
            return {
                ...state,
                error: action.payload,
            };
        case getType(createPost.createPostRequest):
            return {
                ...state,
                request: action.payload,
            };
        case getType(updatePost.actionUpdatePost):
            return {
                ...state,
                requestUpdate: action.payload,
            };
        case getType(updatePost.actionUpdatePostSuccess):
            return {
                ...state,
                responseUpdate: action.payload,
            };
        case getType(updatePost.actionUpdatePostFailure):
            return {
                ...state,
                responseUpdate: action.payload,
            };
        case getType(deletePost.actionDeletePost):
            return {
                ...state,
                requestDelete: action.payload,
            };
        case getType(deletePost.actionDeletePostSuccess):
            return {
                ...state,
                responseDelete: action.payload,
            };
        case getType(deletePost.actionDeletePostPostFailure):
            return {
                ...state,
                responseDelete: action.payload,
            };

        case getType(detailPost.actionGetDetailPost):
            return {
                ...state,
                requestGetDetail: action.payload,
            };

        case getType(detailPost.actionGetDetailPostSuccess):
            return {
                ...state,
                responseDetail: action.payload,
            };

        default:
            return state;
    }
}
