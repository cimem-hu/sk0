import { createAction, props } from "@ngrx/store";

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { name: string; email: string; id: number };
export type LoginFailure = { message: string };

const loginStarted = createAction(
  "[Auth] Login Started",
  props<LoginRequest>()
);
const loginSuccess = createAction(
  "[Auth] Login Success",
  props<LoginResponse>()
);
const loginFailure = createAction(
  "[Auth] Login Failure",
  props<LoginFailure>()
);

export { loginStarted, loginSuccess, loginFailure };
