import type { AppStore } from "src/app/app.store";

export const getUser = (state: AppStore) => state.auth.user;
export const getUserName = (state: AppStore) => state.auth.user?.name;
export const getUserId = (state: AppStore) => state.auth.user?.id;
export const getUserEmail = (state: AppStore) => state.auth.user?.email;
export const isUserLoggedIn = (state: AppStore) => state.auth.loggedIn;
