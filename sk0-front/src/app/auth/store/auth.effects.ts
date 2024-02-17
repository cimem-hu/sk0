import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LoginRequest,
  LoginResponse,
  RegisterError,
  RegisterResponse,
  loginError,
  loginStarted,
  loginSuccess,
  registerError,
  registerStarted,
  registerSuccess
} from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

const errorMessages = new Map<number, string>([
  [400, 'Érvénytelen kérés'],
  [401, 'Nem megfelelő email cím vagy jelszó'],
  [403, 'Hozzáférés megtagadva'],
  [404, 'Az oldal nem található'],
  [409, 'Már van felhasználó ezzel az e-mail címmel.'],
  [500, 'Belső szerverhiba'],
]);

const unknownError = "Ismeretlen hiba"

const handleLoginSideEffects$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService)
  ) =>
    actions$.pipe(
      ofType(loginStarted),
      mergeMap((req: LoginRequest) =>
        authService.login(req)
          .pipe(
            map((successResponse: LoginResponse) => loginSuccess(successResponse)),
            catchError(({ status }: HttpErrorResponse) => {
              const errorMessage = errorMessages.get(status);
              return of(loginError({ message: errorMessage ? errorMessage : unknownError }))
            })
          )
      )
    ),
  { functional: true }
);

const handleRegisterSideEffects$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService)
  ) =>
    actions$.pipe(
      ofType(registerStarted),
      mergeMap(({ email, password, name }) =>
        authService.register({ email, password, name })
          .pipe(
            map((successResponse: RegisterResponse) => registerSuccess(successResponse)),
            catchError((error: RegisterError) => of(registerError(error)))
          )
      )
    ),
  { functional: true }
);

const handleNavigateSuccesLoginEffect$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    navCtl: NavController = inject(NavController),
  ) =>
    actions$.pipe(
      ofType(loginSuccess),
      tap((_token) => {
        return navCtl.navigateForward("/home");
      })
    ),
  { functional: true, dispatch: false }
);


// this part is due to an issue with ngrx 16.2 we cannot use the provideEffects only with this mapping
type FunctionalEffectTypes = typeof handleNavigateSuccesLoginEffect$ | typeof handleLoginSideEffects$ | typeof handleRegisterSideEffects$;

const asRecods: Record<string, FunctionalEffectTypes> = {
  handleLoginSideEffects: handleLoginSideEffects$,
  handleRegisterSideEffects: handleRegisterSideEffects$,
  handleNavigateSuccesLoginEffect: handleNavigateSuccesLoginEffect$
}


export {
  handleLoginSideEffects$,
  handleRegisterSideEffects$,
  handleNavigateSuccesLoginEffect$,
  asRecods,
}