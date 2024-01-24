export { modalState$ } from "./modal.selector";
export {
    authState$,
    authStateSuccess$,
    authStateFailure$,
    resultRegister$
} from "./auth.selector";
export {
    mapLikePost$,
    mapTotalLikePost$,
    currentPost$,
    resultDeleteLikePost$,
    resultSaveLikePost$,
} from "./like-post.selector";
export {
    postsState$,
    postsStateError$,
    resultDeletePost$,
} from "./post.selector";

export { resultUpdateStatusUser$, listUser$ } from "./user.selector";
