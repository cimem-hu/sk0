import { ProfilePage } from "./profile.page";
<<<<<<< HEAD
import { Store } from "@ngrx/store";
import { NotificationService } from "../common/services/notification.service";
import {
  profileUpdateStarted,
  ProfileUpdateRequest
} from "./store/profile.actions";
import { navigateBackToHome } from "../common/store/navigation.actions";
import { AppStore } from "../app.store";
import { of } from "rxjs";

describe("ProfilePage", () => {
  let component: ProfilePage;
  let store: jest.Mocked<Store<AppStore>>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn()
    } as unknown as jest.Mocked<Store<AppStore>>;
    notificationService = {
      alertError: jest.fn(),
      toastMessage: jest.fn()
    } as unknown as jest.Mocked<NotificationService>;
    component = new ProfilePage(notificationService, store);
=======
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

describe("ProfilePage", () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let jwtHelper: JwtHelperService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
      ],
      imports: [HttpClientModule]
    });
    jwtHelper = TestBed.inject(JwtHelperService);
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
>>>>>>> origin
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch profileUpdateStarted action when form is valid and onUpdate is called", async () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.profileForm.setValue({
      name: "Test",
      email: "test@test.com",
      password: "Test1234"
    });

    await component.onUpdate();

    expect(dispatchSpy).toHaveBeenCalledWith(
      profileUpdateStarted({
        name: "Test",
        email: "test@test.com",
        password: "Test1234"
      } as ProfileUpdateRequest)
    );
  });

  it("should not dispatch profileUpdateStarted action when password is not strong enough and onUpdate is called", async () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.profileForm.setValue({
      name: "Test",
      email: "test@test.com",
      password: "test"
    });

    await component.onUpdate();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it("should dispatch navigateBackToHome action when onCancel is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");

    component.onCancel();

    expect(dispatchSpy).toHaveBeenCalledWith(navigateBackToHome());
  });

  it("should patch profileForm with user data on ngOnInit", () => {
    const user = {
      name: "John Doe",
      email: "johndoe@example.com"
    };
    store.select = jest.fn().mockReturnValue(of(user));
    const profileFormPatchValueSpy = jest.spyOn(
      component.profileForm,
      "patchValue"
    );
    const user$ = of(user);
    jest.spyOn(store, "select").mockReturnValue(user$);

    component.ngOnInit();

    expect(profileFormPatchValueSpy).toHaveBeenCalledWith({
      name: user?.name,
      email: user?.email
    });
  });
});
