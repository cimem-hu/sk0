import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { loginStarted, loginSuccess, loginFailure } from "./auth.actions";

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
          map((response) => loginSuccess(response)),
          catchError((error) => of(loginFailure({ message: error.message })))
        )
      )
    )
  );
}
