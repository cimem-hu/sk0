<<<<<<< HEAD
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
=======
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomePage } from "./home.page";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

class HttpClientMock {}

describe("HomePage", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: HttpClientMock, useClass: HttpClientMock }
      ]
    }).createComponent(HomePage);
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
>>>>>>> origin
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
