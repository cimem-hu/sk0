import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { lastValueFrom } from "rxjs";

import { AppStore } from "../app.store";
import { isUserLoggedIn } from "../auth/store/auth.selectors";
import { navigateBackToHome } from "../common/store/navigation.actions";

export const authGuard: CanActivateFn = async () => {
  const store = inject(Store<AppStore>);
  const userStatus = await lastValueFrom(store.select(isUserLoggedIn));
  if (!userStatus) {
    store.dispatch(navigateBackToHome());
  }
  return userStatus;
};
