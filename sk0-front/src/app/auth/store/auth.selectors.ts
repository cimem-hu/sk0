import type { AppStore } from "../../../app/app.store";

export const isUserLoggedIn = (state: AppStore) => Boolean(state.auth.token);
