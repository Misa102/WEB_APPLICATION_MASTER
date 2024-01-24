export const getType = (reduxAction) => {
    return reduxAction().type;
};

export { authAction, registerAction } from "./auth.action";
export {
    saveLikePostAction,
    mapLikePostAction,
    mapTotalLikePostAction,
    deleteLikePostAction,
    currentPostAction,
} from "./like-post.action";
export {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    detailPost,
} from "./post.action";
export { modal } from "./modal.action";
export { getAllUser, updateStatusUser } from "./user.action";
