import { createAction, props } from "@ngrx/store";

export type ProfileUpdateRequest = {
  email?: string;
  password?: string;
  name?: string;
};

export type ProfileUpdateResponse = { name: string; email: string; id: number };
export type ProfileUpdateFailure = { message: string };

const profileUpdateStarted = createAction(
  "[Profile] Login Started",
  props<ProfileUpdateRequest>()
);
const profileUpdateSuccess = createAction(
  "[Profile] Login Success",
  props<ProfileUpdateResponse>()
);
const profileUpdateFailure = createAction(
  "[Profile] Login Failure",
  props<ProfileUpdateFailure>()
);

export { profileUpdateStarted, profileUpdateSuccess, profileUpdateFailure };
