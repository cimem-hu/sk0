import type { AppStore } from "src/app/app.store";

export const getUser = (state: AppStore) => state.profile?.user;
export const getUserName = (state: AppStore) => state.profile.user?.name;
export const getUserId = (state: AppStore) => state.profile.user?.id;
export const getUserEmail = (state: AppStore) => state.profile?.user?.email;
export const isUserLoggedIn = (state: AppStore) => Boolean(state.auth.token);
