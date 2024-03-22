import { createAction, props } from "@ngrx/store";

export type ProfileUpdateRequest = {
  email?: string;
  password?: string;
  name?: string;
};

export type ProfileUpdateResponse = { name: string; email: string; id: number };
export type ProfileUpdateFailure = { message: string };

const profileUpdateStarted = createAction(
  "[Profile] Update Started",
  props<ProfileUpdateRequest>()
);
const profileUpdateSuccess = createAction(
  "[Profile] Update Success",
  props<ProfileUpdateResponse>()
);
const profileUpdateFailure = createAction(
  "[Profile] Update Failure",
  props<ProfileUpdateFailure>()
);

export { profileUpdateStarted, profileUpdateSuccess, profileUpdateFailure };
