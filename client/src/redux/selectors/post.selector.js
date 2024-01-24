export const postsState$ = (state) => state.posts.data;

export const postsStateError$ = (state) => state.posts.error;

export const resultDeletePost$ = (state) => state.posts.responseDelete;

export const resultGetDetailPost$ = (state) => state.posts.responseDetail;

export const resultUpdatePost$ = (state) => state.posts.responseUpdate;