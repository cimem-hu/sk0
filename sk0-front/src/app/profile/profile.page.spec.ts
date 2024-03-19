import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfilePage } from "./profile.page";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

describe("ProfilePage", () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let jwtHelper: JwtHelperService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [AuthService, JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
      ],
      imports: [HttpClientModule]
    });
    jwtHelper = TestBed.inject(JwtHelperService);
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
