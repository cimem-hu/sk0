import { TestBed } from "@angular/core/testing";
import { StorageService } from "./storage.service";
import { Storage } from "@ionic/storage-angular";

describe("StoreService", () => {
  let service: StorageService;
  let mockStorage = {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn()
  } as unknown as jest.Mocked<Storage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useValue: mockStorage }]
    });
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#saveToken should store", async () => {
    const testToken = "testToken";
    await service.saveToken(testToken);
    expect(mockStorage.set).toHaveBeenCalledWith("token", testToken);
  });

  it("#tokenGetter should get token", async () => {
    const testToken = "testToken";
    mockStorage.get = jest.fn().mockResolvedValue("testToken");
    const token = await service.tokenGetter();
    expect(token).toBe(testToken);
  });

  it("#removeToken should remove token", async () => {
    await service.removeToken();
    expect(mockStorage.remove).toHaveBeenCalledTimes(1);
  });
});
