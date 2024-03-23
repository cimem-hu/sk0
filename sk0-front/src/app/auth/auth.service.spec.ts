import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { LoginRequest, RegisterRequest } from "./store/auth.actions";
import { environment } from "../../environments/environment";

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
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should perform a POST request on login", () => {
    const loginDto: LoginRequest = {
      email: "test@example.com",
      password: "password"
    };

    service.login(loginDto).subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/users/login`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(loginDto);
  });

  it("should perform a POST request on register", () => {
    const registerDto: RegisterRequest = {
      email: "test@example.com",
      password: "password",
      name: "John Doe"
    };

    service.register(registerDto).subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/users/register`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(registerDto);
  });
});
