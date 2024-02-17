import { Observable, of, take, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, loginError, loginStarted, loginSuccess, registerError, registerStarted, registerSuccess } from './auth.actions';
import { handleLoginSideEffects$, handleNavigateSuccesLoginEffect$, handleRegisterSideEffects$ } from './auth.effects';
import { NavController } from '@ionic/angular';
import { expect, jest } from '@jest/globals';

describe('Login Effects', (): void => {
  let authServiceMock: AuthService;
  let actions$: Observable<Action>;

  it('should dispatch login success action when login http call was successfull', (done) => {
    const userDetails: LoginResponse = {
      token: "some.jwt.token"
    }
    authServiceMock = {
      login: (req: LoginRequest) => of<LoginResponse>(userDetails),
    } as unknown as AuthService;

    actions$ = of(loginStarted({ email: "test@email.com", password: "some_secret_password" }));

    TestBed.runInInjectionContext((): void => {
      handleLoginSideEffects$(actions$, authServiceMock)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(loginSuccess(userDetails));
          done();
        });
    });
  });

  it('should dispatch a login error action when login http call was unsuccessfull', (done) => {
    authServiceMock = {
      login: (_req: LoginRequest): Observable<LoginResponse> => throwError(() => new Error("whatever error, not specified yet")),
    } as unknown as AuthService;

    actions$ = of(loginStarted({ email: "test@email.com", password: "some_secret_password" }));

    TestBed.runInInjectionContext((): void => {
      handleLoginSideEffects$(actions$, authServiceMock)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action.type).toEqual(loginError.type);
          done();
        });
    });
  });
});

describe('Register Effects', (): void => {
  let authServiceMock: AuthService;
  let actions$: Observable<Action>;

  it('should dispatch register success action when register http call was successfull', (done) => {
    const registerDetails: RegisterResponse = {
      success: true
    }
    authServiceMock = {
      register: (_req: LoginRequest) => of<RegisterResponse>(registerDetails),
    } as unknown as AuthService;

    actions$ = of(registerStarted({ email: "test@email.com", password: "some_secret_password", name: "A valid Username" }));

    TestBed.runInInjectionContext((): void => {
      handleRegisterSideEffects$(actions$, authServiceMock)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action).toEqual(registerSuccess(registerDetails));
          done();
        });
    });
  });

  it('should dispatch a register error action when register http call was unsuccessfull', (done): void => {
    authServiceMock = {
      register: (_req: RegisterRequest): Observable<RegisterResponse> => throwError(() => new Error("whatever error, not specified yet")),
    } as unknown as AuthService;

    actions$ = of(registerStarted({ email: "test@email.com", password: "some_secret_password", name: "A valid username" }));

    TestBed.runInInjectionContext((): void => {
      handleRegisterSideEffects$(actions$, authServiceMock)
        .pipe(take(1))
        .subscribe((action) => {
          expect(action.type).toEqual(registerError.type);
          done();
        });
    });
  });
});

describe('Auth Effects Navigation', (): void => {
  let navigatonMock: NavController;
  it('should navigate to home after successfull login', (done) => {
    navigatonMock = {
      navigateForward: (_a: string) => jest.fn(),
    } as unknown as NavController;
    const navigationSpy = jest.spyOn(navigatonMock, "navigateForward");

    const actionsMock$ = of(loginSuccess({ token: "valid.jwt.token" }));

    handleNavigateSuccesLoginEffect$(actionsMock$, navigatonMock)
      .pipe(take(1))
      .subscribe((_action) => {
        expect(navigationSpy).toBeCalled();
        expect(navigationSpy).toBeCalledTimes(1);
        expect(navigationSpy).toBeCalledWith("/home");
        done();
      });
  });
});