import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, lastValueFrom, map, mergeMap, of } from "rxjs";

import { AuthService } from "../auth.service";
import {
  loginStarted,
  loginSuccess,
  loginFailure,
  registerStarted,
  registerFailure,
  registerSuccess
} from "./auth.actions";
import { StorageService } from "../../common/services/storage.service";
import { JwtHandlerService } from "../../common/services/jwt-handler.service";

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly storage: StorageService,
    private readonly jwtHandler: JwtHandlerService
  ) {}

  handleLoginEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStarted),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          exhaustMap(async (response) => {
            this.storage.saveToken(response.token);
            const userData = await this.jwtHandler.getUser();
            if (!userData) {
              return loginFailure({ message: "Something went wrong" });
            }
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
