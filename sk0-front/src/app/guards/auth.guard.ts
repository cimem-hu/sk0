import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.store";
import { navigateBackToLoginAction } from "../common/store/navigation.actions";

export const authGuard: CanActivateFn = async () => {
  const store = inject(Store<AppStore>);

  // TODO: Implement token handling service
  const token = localStorage.getItem("token");

  if (!token) {
    store.dispatch(navigateBackToLoginAction());
    return false;
  }
  return true;
};
