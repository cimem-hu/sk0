import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginPage } from "./login.page";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
class HttpClientMock extends HttpClient {}

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
        AuthService,
        { provide: HttpHandler, useValue: {} }
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
