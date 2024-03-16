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

export type RegisterRequest = { email: string; password: string; name: string };
export type RegisterResponse = {
  id: number;
  email: string;
  password: string;
  name: string;
};
export type RegisterFailure = { message: string };

const registerStarted = createAction(
  "[Auth] Register Started",
  props<RegisterRequest>()
);
const registerSuccess = createAction(
  "[Auth] Register Success",
  props<RegisterResponse>()
);
const registerFailure = createAction(
  "[Auth] Register Failure",
  props<RegisterFailure>()
);

export {
  loginStarted,
  loginSuccess,
  loginFailure,
  registerStarted,
  registerSuccess,
  registerFailure
};
