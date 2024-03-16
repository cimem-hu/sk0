import { createReducer, on } from "@ngrx/store";
import { loginSuccess } from "src/app/auth/store/auth.actions";
import {
  profileUpdateStarted,
  profileUpdateSuccess,
  profileUpdateFailure
} from "./profile.actions";

export type ProfileState = {
  isLoading: boolean;
  user: {
    name: string | null;
    email: string | null;
    id: number | null;
  } | null;
  error: string | null;
};

const initialProfileState: ProfileState = {
  error: null,
  user: null,
  isLoading: false
};

const profileStore = createReducer(
  initialProfileState,
  on(loginSuccess, (state, user): ProfileState => ({ ...state, user })),
  on(
    profileUpdateStarted,
    (state): ProfileState => ({ ...state, isLoading: true, error: null })
  ),
  on(
    profileUpdateSuccess,
    (state, user): ProfileState => ({
      ...state,
      isLoading: false,
      error: null,
      user
    })
  ),
  on(
    profileUpdateFailure,
    (state, error): ProfileState => ({
      ...state,
      isLoading: false,
      error: error.message
    })
  )
);

export { profileStore };
