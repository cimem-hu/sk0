import { Store } from "@ngrx/store";

import { HomePage } from "./home.page";
import { AppStore } from "../app.store";
import { logoutAction } from "../auth/store/auth.actions";

describe("HomePage", () => {
  let component: HomePage;
  let store: jest.Mocked<Store<AppStore>>;

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn()
    } as unknown as jest.Mocked<Store<AppStore>>;
    component = new HomePage(store);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch logoutAction action when onLogout is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");

    component.onLogout();

    expect(dispatchSpy).toHaveBeenCalledWith(logoutAction());
  });
});
