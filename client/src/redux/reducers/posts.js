import { INIT_STATE } from "../../constant";
import { createPost, updatePost, getPosts, getType } from "../actions";

export default function postsReducers(state = INIT_STATE.posts, action) {
    switch (action.type) {
        case getType(getPosts.getPostsRequest): // case 'getPostsRequest'
            return {
                ...state,
                isLoading: true,
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
        case getType(createPost.createPostRequest):
            return {
                ...state,
                request: action.payload,
            };
        case getType(updatePost.updatePostRequest):
            return {
                ...state,
                data: state.data.map((post) =>
                    post._id === action.payload_id ? action.payload : post
                ),
            };

        default:
            return state;
    }
}
