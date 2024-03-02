import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { AuthService, LoginResponse } from "./auth.service";
import { expect } from "@jest/globals";

describe("AuthService", () => {
  let service: AuthService;
  let mockHttpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    mockHttpController = TestBed.inject(HttpTestingController);
  });

  it("AuthService should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set isUserLoggedIn to false and userName to empty string on logout", (done) => {
    service.isUserLoggedIn.next(true);
    service.userName.next("testUser");

    service.logout();

    service.isUserLoggedIn.subscribe((isUserLoggedIn) => {
      expect(isUserLoggedIn).toBe(false);
    });

    service.userName.subscribe((userName) => {
      expect(userName).toBe(null);
      done();
    });
  });

  it("should set userId to a value, when http client sends back a valid object with id", (done) => {
    const loginFields = {
      email: "valid@amail.com",
      password: "ValidPassword2"
    };

    const userID: number = 1;

    const loginResponse: LoginResponse = {
      email: loginFields.email,
      id: userID,
      name: "A registered name"
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
  });
});
