import { createReducer, on } from "@ngrx/store";
import { loginError, loginStarted, loginSuccess, logoutAction, registerError, registerStarted, registerSuccess } from './auth.actions'

export type User = {
    username: string,
    role: string,
    id: number | string
};

export type AuthState = {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    isLoading: false,
    token: null,
    error: null,
    user: null,
};

const authStore = createReducer(
    initialState,
    on(loginStarted, (state) => ({ ...state, isLoading: true })),
    on(loginSuccess, (state, { token }) =>
    ({
        ...state,
        isLoading: false,
        token,
        // TODO: use token data
        // async
        // user: ("jwt" as any).decode(token),
        user: { id: 1, role: "ROLE", username: "Joseph" },
        error: null
    })),
    on(loginError, (state, { message }) =>
        ({ ...state, error: message, isLoading: false, token: null })),
    on(registerStarted, (state) =>
        ({ ...state, isLoading: true, error: null, user: null })),
    on(registerError, (state, { message }) =>
        ({ ...state, isLoading: false, error: message, user: null, token: null })),
    on(registerSuccess, (state, { success }) =>
        ({ ...state, isLoading: false, error: null, user: null, token: null })),
    on(logoutAction, (state) => (initialState))
);

export {
    authStore,
};