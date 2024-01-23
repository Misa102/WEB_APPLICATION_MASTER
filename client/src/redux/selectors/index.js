export const postsState$ = (state) => state.posts.data;

export const postsStateError$ = (state) => state.posts.error;

// selector pour model
export const modalState$ = (state) => state.modal;

export const authState$ = (state) => state.auth;

export const authStateFailure$ = (state) => state.auth.error;

export const authStateSuccess$ = (state) => state.auth.response;

export const mapLikePost$ = (state) => state.likePost.mapLikePost;

export const resultSaveLikePost$ = (state) => state.likePost.responseSavePost;

export const resultDeleteLikePost$ = (state) => state.likePost.responseDeletePost;

export const currentPost$ = (state) => state.likePost.currentPost;

export const mapTotalLikePost$ = (state) => state.likePost.mapTotalLikePost;