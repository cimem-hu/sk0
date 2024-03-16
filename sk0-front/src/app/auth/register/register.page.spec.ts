import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterPage } from "./register.page";
import { HttpClient } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { authStore } from "../store/auth.reducer";

class HttpClientMock extends HttpClient {}

describe("RegisterPage", () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: HttpClientMock
        },
        provideStore(
          { auth: authStore },
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true
            }
          }
        )
      ]
    }).createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
