import { Actions } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import { AuthEffects } from "./auth.effects";
import { loginFailure, loginStarted, loginSuccess } from "./auth.actions";
import { of, take, throwError } from "rxjs";

describe("AuthEffects", () => {
  let authService: jest.Mocked<AuthService>;
  let actions$: Actions;
  let authEffects: AuthEffects;

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
      const userData = { name: "Test User", email: "test@test.com", id: 1 };
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
});
