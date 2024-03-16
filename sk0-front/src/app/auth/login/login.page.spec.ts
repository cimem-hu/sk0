import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginPage } from "./login.page";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { provideStore } from "@ngrx/store";
import { authStore } from "../store/auth.reducer";

@Injectable()
class HttpClientMock extends HttpClient { }

describe("LoginPage", () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: ActivatedRoute, useValue: {} },
        { provide: HttpClient, useClass: HttpClientMock },
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
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
