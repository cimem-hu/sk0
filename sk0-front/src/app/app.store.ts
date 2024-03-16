import { AuthState } from "./auth/store/auth.reducer";

export type AppStore = {
  auth: AuthState;
};
