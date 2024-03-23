import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.store";
import { navigateBackToLoginAction } from "../common/store/navigation.actions";
import { JwtHandlerService } from "../common/services/jwt-handler.service";

export const authGuard: CanActivateFn = async () => {
  const store = inject(Store<AppStore>);
  const jwtHandler = inject(JwtHandlerService);

  const isTokenExpired = await jwtHandler.isExpired();

  if (isTokenExpired) {
    store.dispatch(navigateBackToLoginAction());
    return false;
  }

  return true;
};
