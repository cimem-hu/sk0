import { createReducer, on } from "@ngrx/store";

import {
  loginFailure,
  loginStarted,
  loginSuccess,
  logoutAction,
  registerFailure,
  registerStarted,
  registerSuccess
} from "./auth.actions";

export type AuthState = {
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

export const initialAuthState: AuthState = {
  token: null,
  isLoading: false,
  error: null
};

const authStore = createReducer(
  initialAuthState,
  on(
    loginStarted,
    (state): AuthState => ({ ...state, isLoading: true, error: null })
  ),
  on(
    loginSuccess,
    (state, action): AuthState => ({
      ...state,
      token: action.token,
      isLoading: false,
      error: null
    })
  ),
  on(
    loginFailure,
    (state, action): AuthState => ({
      ...state,
      token: null,
      isLoading: false,
      error: action.message
    })
  ),
  on(
    registerStarted,
    (state): AuthState => ({ ...state, isLoading: true, error: null })
  ),
  on(
    registerSuccess,
    (state, action): AuthState => ({
      ...state,
      isLoading: false,
      error: null
    })
  ),
  on(
    registerFailure,
    (state, action): AuthState => ({
      ...state,
      isLoading: false,
      error: action.message
    })
  ),
  on(
    registerSuccess,
    (state, action): AuthState => ({
      ...state,
      isLoading: false,
      error: null
    })
  ),
  on(
    registerFailure,
    (state, action): AuthState => ({
      ...state,
      isLoading: false,
      error: action.message
    })
  ),
  on(logoutAction, (_state): AuthState => initialAuthState)
);

export { authStore };
