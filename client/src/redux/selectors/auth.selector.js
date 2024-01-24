export const authState$ = (state) => state.auth;

export const authStateFailure$ = (state) => state.auth.error;

export const authStateSuccess$ = (state) => state.auth.response;

export const resultRegister$ = (state) => state.auth.responseRegister;