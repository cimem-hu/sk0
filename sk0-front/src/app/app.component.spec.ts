import { Store } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { AppStore } from "./app.store";
import { navigateToProfile } from "./common/store/navigation.actions";
import { logoutAction } from "./auth/store/auth.actions";

describe("AppComponent", () => {
  let component: AppComponent;
  let store: jest.Mocked<Store<AppStore>>;

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn()
    } as unknown as jest.Mocked<Store<AppStore>>;
    component = new AppComponent(store);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch logoutAction action when onLogout is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");

    component.onLogout();

    expect(dispatchSpy).toHaveBeenCalledWith(logoutAction());
  });

  it("should dispatch navigateToProfile action when navigateToProfile is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");

    component.navigateToProfile();

    expect(dispatchSpy).toHaveBeenCalledWith(navigateToProfile());
  });
});
