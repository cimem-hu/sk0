import { Actions } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import { AuthEffects } from "./auth.effects";
import type { RegisterRequest, RegisterResponse } from "./auth.actions";
import {
  loginFailure,
  loginStarted,
  loginSuccess,
  registerStarted,
  registerSuccess,
  registerFailure,
  logoutAction,
  navigateToLoginAction,
  navigateToRegisterAction,
  navigateBackToHome
} from "./auth.actions";
import { of, take, throwError } from "rxjs";
import { NavController } from "@ionic/angular";

describe("AuthEffects", () => {
  let authService: jest.Mocked<AuthService>;
  let actions$: Actions;
  let authEffects: AuthEffects;
  let navCtl: jest.Mocked<NavController>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Login", () => {
    beforeEach(() => {
      authService = {
        login: jest.fn()
      } as unknown as jest.Mocked<AuthService>;

      navCtl = {
        navigateForward: jest.fn(),
        navigateBack: jest.fn()
      } as unknown as jest.Mocked<NavController>;
      const user = { email: "test@test.com", password: "Pasword123" };
      actions$ = new Actions(of(loginStarted(user)));
      authEffects = new AuthEffects(actions$, authService, navCtl);
    });

    it("should dispatch loginSuccess when authService.login is successful", (done) => {
      const userData = { name: "Test User", email: "test@test.com", id: 1 };
      const expectedAction = loginSuccess(userData);

      authService.login.mockReturnValue(of(userData));

      const action = authEffects.handleLoginEffects$;
      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toEqual(expectedAction);
        done();
      });
    });

    it('should call navCtl.navigateForward("/home") when loginSuccess is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateForward");
      const userData = { name: "Test User", email: "test@test.com", id: 1 };

      actions$ = of(loginSuccess(userData));
      authEffects = new AuthEffects(actions$, authService, navCtl);
      const action = authEffects.handleLoginSuccessSideEfects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/home");
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
      authEffects = new AuthEffects(actions$, authService, navCtl);
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

  describe("Logout", () => {
    it('should call navCtl.navigateBack("/login") when logoutAction is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateBack");

      actions$ = of(logoutAction());
      authEffects = new AuthEffects(actions$, authService, navCtl);
      const action = authEffects.handleNavigateToLoginEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/login");
        done();
      });
    });
  });

  describe("NavigateToLogin", () => {
    it('should call navCtl.navigateBack("/login") when navigateToLogin is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateBack");

      actions$ = of(navigateToLoginAction());
      authEffects = new AuthEffects(actions$, authService, navCtl);
      const action = authEffects.handleNavigateToLoginEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/login");
        done();
      });
    });
  });

  describe("NavigateToRegister", () => {
    it('should call navCtl.navigateBack("/login") when navigateToLogin is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateForward");

      actions$ = of(navigateToRegisterAction());
      authEffects = new AuthEffects(actions$, authService, navCtl);
      const action = authEffects.handleNavigateToRegisterEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/register");
        done();
      });
    });
  });

  describe("NavigateBakcToHome", () => {
    it('should call navCtl.navigateBack("/home") when navigateBackToHome is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateBack");

      actions$ = of(navigateBackToHome());
      authEffects = new AuthEffects(actions$, authService, navCtl);
      const action = authEffects.handleNavigateToHomeEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/home");
        done();
      });
    });
  });
});
