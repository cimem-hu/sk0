import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";

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
    private readonly authService: AuthService
  ) {}

  handleLoginEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStarted),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          map((response) => {
            //TODO: Implement token handling
            localStorage.setItem("token", response.token);
            return loginSuccess(response);
          }),
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
}
