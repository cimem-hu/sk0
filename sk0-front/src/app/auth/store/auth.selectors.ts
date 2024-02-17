import { AppStore } from "../../app.state";

export const isLoading = (state: AppStore) => state.auth?.isLoading;

export const getToken = (state: AppStore) => state.auth?.token;

export const isLoggedIn = (state: AppStore) => Boolean(!state.auth?.isLoading) && Boolean(state.auth?.user);

export const getUserName = (state: AppStore) => state.auth?.user?.username;