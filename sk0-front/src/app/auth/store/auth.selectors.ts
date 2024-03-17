import type { AppStore } from "src/app/app.store";

export const isUserLoggedIn = (state: AppStore) => Boolean(state.auth.token);
