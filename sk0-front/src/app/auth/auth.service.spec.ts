import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { LoginRequest, RegisterRequest } from "./store/auth.actions";

describe("AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
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

    const req = httpMock.expectOne(`${environment.baseUrl}/users/register`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(registerDto);
  });
});
