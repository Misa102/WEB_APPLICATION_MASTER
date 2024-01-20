export const postsState$ = (state) => state.posts.data;

export const postsStateError$ = (state) => state.posts.error;

// selector pour model
export const modalState$ = (state) => state.modal;

export const authState$ = (state) => state.auth;

export const authStateFailure$ = (state) => state.auth.error;

export const authStateSuccess$ = (state) => state.auth.response;