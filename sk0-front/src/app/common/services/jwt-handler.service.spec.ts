import { TestBed } from "@angular/core/testing";

import { JwtHandlerService } from "./jwt-handler.service";
import { StorageService } from "./storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../../../app/profile/store/profile.reducer";

describe("JwtHandlerService", () => {
  let service: JwtHandlerService;
  let mockStorageService = {
    tokenGetter: jest.fn()
  } as unknown as jest.Mocked<StorageService>;
  let mockJwtHelperService = {
    decodeToken: jest.fn(),
    isTokenExpired: jest.fn()
  } as unknown as jest.Mocked<JwtHelperService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtHandlerService,
        { provide: StorageService, useValue: mockStorageService },
        { provide: JwtHelperService, useValue: mockJwtHelperService }
      ]
    });
    service = TestBed.inject(JwtHandlerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return false when token is expired", async () => {
    mockStorageService.tokenGetter = jest.fn().mockResolvedValue("testToken");
    mockJwtHelperService.isTokenExpired = jest.fn().mockResolvedValue(false);
    expect(await service.isExpired()).toBe(false);
  });

  it("should return null if token is not present", async () => {
    mockStorageService.tokenGetter = jest.fn().mockResolvedValue(null);
    expect(await service.getUser()).toBeNull();
  });

  it("should return a user if token is present", async () => {
    const testUser: User = {
      id: 1,
      name: "Test",
      email: "test@test.com"
    };

    mockStorageService.tokenGetter = jest.fn().mockResolvedValue("testToken");
    mockJwtHelperService.decodeToken = jest.fn().mockResolvedValue(testUser);
    expect(await service.getUser()).toStrictEqual(testUser);
  });
});
