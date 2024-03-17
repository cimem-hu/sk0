import { Actions } from "@ngrx/effects";
import { of, take, throwError } from "rxjs";

import { AuthService } from "../auth.service";
import { AuthEffects } from "./auth.effects";
import type { RegisterRequest, RegisterResponse } from "./auth.actions";
import {
  loginFailure,
  loginStarted,
  loginSuccess,
  registerStarted,
  registerSuccess,
  registerFailure
} from "./auth.actions";

describe("AuthEffects", () => {
  let authService: jest.Mocked<AuthService>;
  let actions$: Actions;
  let authEffects: AuthEffects;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Login", () => {
    beforeEach(() => {
      authService = {
        login: jest.fn()
      } as unknown as jest.Mocked<AuthService>;

      const user = { email: "test@test.com", password: "Pasword123" };
      actions$ = new Actions(of(loginStarted(user)));
      authEffects = new AuthEffects(actions$, authService);
    });

    it("should dispatch loginSuccess when authService.login is successful", (done) => {
      const userData = {
        name: "Test User",
        email: "test@test.com",
        id: 1,
        token: "asdfg"
      };
      const expectedAction = loginSuccess(userData);

      authService.login.mockReturnValue(of(userData));

      const action = authEffects.handleLoginEffects$;
      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toEqual(expectedAction);
        done();
      });
    });

    it("should dispatch loginFailure when authService.login fails", (done) => {
      const error = new Error("Something went wrong");
      const expectedAction = loginFailure({ message: error.message });

      authService.login.mockReturnValue(throwError(() => error));

      const action = authEffects.handleLoginEffects$;
      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toEqual(expectedAction);
        done();
      });
    });
  });

  describe("Register", () => {
    beforeEach(() => {
      authService = {
        register: jest.fn()
      } as unknown as jest.Mocked<AuthService>;

      const user: RegisterRequest = {
        email: "test@test.com",
        password: "Pasword123",
        name: "John Doe"
      };
      actions$ = new Actions(of(registerStarted(user)));
      authEffects = new AuthEffects(actions$, authService);
    });

    it("should dispatch registerSuccess when authService.register is successful", (done) => {
      const registerData: RegisterResponse = {
        email: "valid@email.com",
        id: 1,
        name: "John Doe",
        password: "hiddenPassword"
      };

      const expectedAction = registerSuccess(registerData);

      authService.register.mockReturnValue(of(registerData));

      const action = authEffects.handleRegisterEffects$;
      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toEqual(expectedAction);
        done();
      });
    });

    it("should dispatch registerFailure when authService.register fails", (done) => {
      const error = new Error("Something went wrong");
      const expectedAction = registerFailure({ message: error.message });

      authService.register.mockReturnValue(throwError(() => error));

      const action = authEffects.handleRegisterEffects$;
      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toEqual(expectedAction);
        done();
      });
    });
  });
});
