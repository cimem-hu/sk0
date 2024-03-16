import { createReducer, on } from "@ngrx/store";
import { loginFailure, loginStarted, loginSuccess } from "./auth.actions";

export type AuthState = {
  loggedIn: boolean;
  user: {
    name: string | null;
    email: string | null;
    id: number | null;
  } | null;
  isLoading: boolean;
  error: string | null;
};

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: null,
  isLoading: false,
  error: null
};

const authStore = createReducer(
  initialAuthState,
  on(loginStarted, (state) => ({ ...state, isLoading: true, error: null })),
  on(loginSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: action,
    isLoading: false,
    error: null
  })),
  on(loginFailure, (state, action) => ({
    ...state,
    loggedIn: false,
    userName: null,
    isLoading: false,
    error: action.message
  }))
);

export { authStore };
