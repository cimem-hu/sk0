import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { ProfileService } from "./profile.service";
import { environment } from "../../environments/environment";
import { ProfileUpdateRequest } from "./store/profile.actions";

describe("ProfileService", () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });

    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should send a profile update request", () => {
    const id = 1;
    const profileUpdateDto: ProfileUpdateRequest = {
      name: "UpdatedName"
    };

    service.update(id, profileUpdateDto).subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/users/${id}`);
    expect(req.request.method).toBe("PATCH");
    expect(req.request.body).toEqual(profileUpdateDto);
  });
});
