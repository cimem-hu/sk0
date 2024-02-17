import { createAction, props } from '@ngrx/store';

export type LoginRequest = { email: string, password: string };
export type LoginResponse = {
    token: string
}
export type LoginError = { message: string };

const loginStarted = createAction("[Auth Login] Started", props<LoginRequest>());
const loginSuccess = createAction("[Auth Login] Success", props<LoginResponse>());
const loginError = createAction("[Auth Login] Error", props<LoginError>());

export type RegisterRequest = { email: string, password: string, name: string };
export type RegisterResponse = {
    success: boolean
}

export type RegisterError = { message: string };

const registerStarted = createAction("[Auth Register] Started", props<RegisterRequest>());
const registerSuccess = createAction("[Auth Register] Success", props<RegisterResponse>());
const registerError = createAction("[Auth Register] Error", props<RegisterError>());

const logoutAction = createAction("[Auth Logout]");

export {
    loginStarted,
    loginSuccess,
    loginError,
    registerError,
    registerStarted,
    registerSuccess,
    logoutAction
}
