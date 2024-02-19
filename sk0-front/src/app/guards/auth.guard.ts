import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userStatus = inject(AuthService).isUserLoggedIn;
  if (userStatus.value) {
    return true;
  }
  return router.navigate(["login"]);
};
