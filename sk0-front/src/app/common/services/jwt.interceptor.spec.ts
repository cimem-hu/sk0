import { TestBed, waitForAsync } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";

import { JwtInterceptor } from "./jwt.interceptor";
import { StorageService } from "./storage.service";

describe("JwtInterceptor", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let storageServiceMock: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: StorageService, useValue: { tokenGetter: jest.fn() } }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    storageServiceMock = TestBed.inject(StorageService);
  });

  it("should add JWT token to request headers", waitForAsync(() => {
    const token = "dummy-jwt-token";
    storageServiceMock.tokenGetter = jest.fn().mockResolvedValue(token);

    httpClient
      .get("/api/data")
      .toPromise()
      .then(() => {
        const httpRequest = httpTestingController.expectOne("/api/data");
        expect(httpRequest.request.headers.has("Authorization")).toEqual(true);
        expect(httpRequest.request.headers.get("Authorization")).toEqual(
          `Bearer ${token}`
        );
        httpRequest.flush({ data: "test" });
      });
  }));
});
