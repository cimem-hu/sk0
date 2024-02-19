import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginPage } from "./login.page";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";

@Injectable()
class HttpClientMock extends HttpClient {}

describe("LoginPage", () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
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
