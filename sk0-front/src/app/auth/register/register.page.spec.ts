import { RegisterPage } from "./register.page";
<<<<<<< HEAD
import { Store } from "@ngrx/store";
import { NotificationService } from "../../common/services/notification.service";
import { registerStarted } from "../store/auth.actions";
import { navigateBackToLoginAction } from "../../common/store/navigation.actions";
import { AppStore } from "src/app/app.store";

describe("RegisterPage", () => {
  let component: RegisterPage;
  let store: jest.Mocked<Store<AppStore>>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(() => {
    store = { dispatch: jest.fn() } as unknown as jest.Mocked<Store<AppStore>>;
    notificationService = {
      alertError: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;
    component = new RegisterPage(notificationService, store);
=======
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { HttpClientTestingModule } from "@angular/common/http/testing";

class HttpClientMock {}

describe("RegisterPage", () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: HttpClientMock, useClass: HttpClientMock }
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
>>>>>>> origin
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch registerStarted action when form is valid and onRegister is called", async () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.registerForm.setValue({
      name: "Test",
      email: "test@test.com",
      password: "Test1234"
    });

    await component.onRegister();

    expect(dispatchSpy).toHaveBeenCalledWith(
      registerStarted({
        email: "test@test.com",
        password: "Test1234",
        name: "Test"
      })
    );
  });

  it("should not dispatch registerStarted action when form is invalid and onRegister is called", async () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.registerForm.setValue({ name: "", email: "", password: "" });

    await component.onRegister();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it("should dispatch navigateBackToLoginAction when onRouteToLogin is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");

    component.onRouteToLogin();

    expect(dispatchSpy).toHaveBeenCalledWith(navigateBackToLoginAction());
  });
});
