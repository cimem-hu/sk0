import { AuthState } from "./auth/store/auth.reducer";
import { ProfileState } from "./profile/store/profile.reducer";

export type AppStore = {
  auth: AuthState;
  profile: ProfileState;
};
