import { Store } from "@ngrx/store";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { JwtHandlerService } from "../common/services/jwt-handler.service";
import { navigateBackToLoginAction } from "../common/store/navigation.actions";
import { authGuard } from "./auth.guard";

describe("authGuard", () => {
  beforeEach(() => {
    class MockJwtHandlerService {
      isExpired = jest.fn();
    }

    class MockStore {
      dispatch = jest.fn();
    }

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: JwtHandlerService, useClass: MockJwtHandlerService },
        { provide: Store, useClass: MockStore }
      ]
    });
  });

  it("should return false and navigate back to login if token is expired", async () => {
    const store = TestBed.inject(Store);
    const jwtHandler = TestBed.inject(JwtHandlerService);

    jwtHandler.isExpired = jest.fn().mockResolvedValue(true);
    store.dispatch = jest.fn();

    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    const result = await TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    );

    expect(result).toBe(false);
    expect(store.dispatch).toHaveBeenCalledWith(navigateBackToLoginAction());
  });

  it("should return true if token is not expired", async () => {
    const store = TestBed.inject(Store);
    const jwtHandler = TestBed.inject(JwtHandlerService);

    jwtHandler.isExpired = jest.fn().mockResolvedValue(false);
    store.dispatch = jest.fn();

    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    const result = await TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    );

    expect(result).toBe(true);
  });
});
