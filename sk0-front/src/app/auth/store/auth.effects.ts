import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";

import { AuthService } from "../auth.service";
import {
  loginStarted,
  loginSuccess,
  loginFailure,
  registerStarted,
  registerFailure,
  registerSuccess
} from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly navCtl: NavController
  ) {}

  handleLoginEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStarted),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          map((response) => loginSuccess(response)),
          catchError((error) => of(loginFailure({ message: error.message })))
        )
      )
    )
  );
  handleRegisterEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerStarted),
      mergeMap((action) =>
        this.authService.register(action).pipe(
          map((response) => registerSuccess(response)),
          catchError((error) => of(registerFailure({ message: error.message })))
        )
      )
    )
  );

  handleLoginSuccessSideEfects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((_action) => {
          return this.navCtl.navigateForward("/home");
        })
      ),
    { dispatch: false }
  );
}
