import { Actions } from "@ngrx/effects";
import { NavController } from "@ionic/angular";
import { of, take } from "rxjs";

import { loginSuccess, logoutAction } from "../../auth/store/auth.actions";
import { NavigationEffects } from "./navigation.effects";
import {
  navigateBackToHome,
  navigateBackToLoginAction,
  navigateToProfile,
  navigateToRegisterAction
} from "./navigation.actions";

describe("NavigationEffects", () => {
  let actions$: Actions;
  let navCtl: jest.Mocked<NavController>;
  let navigationEffects: NavigationEffects;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    navCtl = {
      navigateForward: jest.fn(),
      navigateBack: jest.fn()
    } as unknown as jest.Mocked<NavController>;
  });

  it('should call navCtl.navigateForward("/home") when loginSuccess is dispatched', (done) => {
    const navigationSpy = jest.spyOn(navCtl, "navigateForward");
    const userData = {
      name: "Test User",
      email: "test@test.com",
      id: 1,
      token: "asdfg"
    };

    actions$ = of(loginSuccess(userData));
    navigationEffects = new NavigationEffects(actions$, navCtl);
    const action = navigationEffects.handleNavigateToHomeEffects$;

    action.pipe(take(1)).subscribe((_action) => {
      expect(navigationSpy).toHaveBeenCalledTimes(1);
      expect(navigationSpy).toHaveBeenCalledWith("/home");
      done();
    });
  });

  describe("Logout", () => {
    it('should call navCtl.navigateBack("/login") when logoutAction is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateBack");

      actions$ = of(logoutAction());
      navigationEffects = new NavigationEffects(actions$, navCtl);
      const action = navigationEffects.handleNavigateBackToLoginEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/login");
        done();
      });
    });
  });

  describe("NavigateBackToLogin", () => {
    it('should call navCtl.navigateBack("/login") when navigateBackToLogin is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateBack");

      actions$ = of(navigateBackToLoginAction());
      navigationEffects = new NavigationEffects(actions$, navCtl);
      const action = navigationEffects.handleNavigateBackToLoginEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/login");
        done();
      });
    });
  });

  describe("NavigateToRegister", () => {
    it('should call navCtl.navigateForward("/register") when navigateToRegister is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateForward");

      actions$ = of(navigateToRegisterAction());
      navigationEffects = new NavigationEffects(actions$, navCtl);
      const action = navigationEffects.handleNavigateToRegisterEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/register");
        done();
      });
    });
  });

  describe("NavigateToProfile", () => {
    it('should call navCtl.navigateForward("/profile") when navigateBackToLogin is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateForward");

      actions$ = of(navigateToProfile());
      navigationEffects = new NavigationEffects(actions$, navCtl);
      const action = navigationEffects.handleNavigateToProfileEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/profile");
        done();
      });
    });
  });

  describe("NavigateBackToHome", () => {
    it('should call navCtl.navigateBack("/home") when navigateBackToHome is dispatched', (done) => {
      const navigationSpy = jest.spyOn(navCtl, "navigateBack");

      actions$ = of(navigateBackToHome());
      navigationEffects = new NavigationEffects(actions$, navCtl);
      const action = navigationEffects.handleNavigateBackToHomeEffects$;

      action.pipe(take(1)).subscribe((_action) => {
        expect(navigationSpy).toHaveBeenCalledTimes(1);
        expect(navigationSpy).toHaveBeenCalledWith("/home");
        done();
      });
    });
  });
});
