import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
<<<<<<< HEAD
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { LoginRequest, RegisterRequest } from "./store/auth.actions";

describe("AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
=======

import { AuthService, LoginResponse } from "./auth.service";
import { expect } from "@jest/globals";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

describe("AuthService", () => {
  let service: AuthService;
  let mockHttpController: HttpTestingController;
  let jwtHelper: JwtHelperService;
>>>>>>> origin

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
<<<<<<< HEAD
      providers: [AuthService]
=======
      providers: [
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
      ]
>>>>>>> origin
    });

    service = TestBed.inject(AuthService);
<<<<<<< HEAD
    httpMock = TestBed.inject(HttpTestingController);
=======
    mockHttpController = TestBed.inject(HttpTestingController);
    jwtHelper = TestBed.inject(JwtHelperService);
>>>>>>> origin
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should send a login request", () => {
    const loginDto: LoginRequest = {
      email: "user@email.com",
      password: "Password123"
    };
    service.login(loginDto).subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/users/login`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(loginDto);
  });

  it("should send a register request", () => {
    const registerDto: RegisterRequest = {
      name: "User",
      email: "user@email.com",
      password: "Password123"
    };
    service.register(registerDto).subscribe();

<<<<<<< HEAD
    const req = httpMock.expectOne(`${environment.baseUrl}/users/register`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(registerDto);
=======
    const userID: number = 1;

    const loginResponse: LoginResponse = {
      email: loginFields.email,
      id: userID,
      name: "A registered name",
      token: ""
    };
    service.login(loginFields);

    service.userId.subscribe((id) => {
      expect(id).toBe(userID);
      done();
    });

    mockHttpController
      .expectOne({
        method: "POST"
      })
      .flush(loginResponse);
    mockHttpController.verify();
>>>>>>> origin
  });
});
