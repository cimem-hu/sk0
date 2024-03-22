import { Store } from "@ngrx/store";
import { LoginPage } from "./login.page";
import { AppStore } from "../../app.store";
import { NotificationService } from "../../common/services/notification.service";
import { loginStarted } from "../store/auth.actions";
import { navigateToRegisterAction } from "../../common/store/navigation.actions";

describe("LoginPage", () => {
  let component: LoginPage;
  let store: jest.Mocked<Store<AppStore>>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(() => {
    store = { dispatch: jest.fn() } as unknown as jest.Mocked<Store<AppStore>>;
    notificationService = {
      alertError: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;
    component = new LoginPage(notificationService, store);
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch loginStarted action when form is valid and onLogin is called", async () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.loginForm.setValue({
      email: "test@test.com",
      password: "Test1234"
    });

    await component.onLogin();

    expect(dispatchSpy).toHaveBeenCalledWith(
      loginStarted({
        email: "test@test.com",
        password: "Test1234"
      })
    );
  });

  it("should not dispatch loginStarted action when form is invalid and onLogin is called", async () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.loginForm.setValue({ email: null, password: null });

    await component.onLogin();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it("should dispatch navigateToRegister when onRegistration is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");

    component.onRegistration();

    expect(dispatchSpy).toHaveBeenCalledWith(navigateToRegisterAction());
  });

  it("should reset the form when ionDidLeave is called", () => {
    const initForm = { email: "email@test.com", password: "Password123" };
    const emptyForm = { email: null, password: null };
    component.loginForm.setValue(initForm);

    component.ionViewDidLeave();

    const updatedForm = component.loginForm.getRawValue();
    expect(updatedForm).toStrictEqual(emptyForm);
  });
});
