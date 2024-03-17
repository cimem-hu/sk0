import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";

import {
  loginSuccess,
  logoutAction,
  registerSuccess
} from "../../auth/store/auth.actions";
import {
  navigateBackToHome,
  navigateToLoginAction,
  navigateToRegisterAction
} from "./navigation.actions";

@Injectable()
export class NavigationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly navCtl: NavController
  ) {}

  handleNavigateToLoginEffects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction, navigateToLoginAction, registerSuccess),
        tap((_action) => {
          this.navCtl.navigateBack("/login");
        })
      ),
    { dispatch: false }
  );

  handleNavigateToRegisterEffects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToRegisterAction),
        tap((_action) => {
          this.navCtl.navigateForward("/register");
        })
      ),
    { dispatch: false }
  );

  handleNavigateBackToHomeEffects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateBackToHome),
        tap((_action) => {
          this.navCtl.navigateBack("/home");
        })
      ),
    { dispatch: false }
  );

  handleNavigateToHomeEffects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((_action) => {
          this.navCtl.navigateForward("/home");
        })
      ),
    { dispatch: false }
  );
}
