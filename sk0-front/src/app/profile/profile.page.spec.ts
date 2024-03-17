import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfilePage } from "./profile.page";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { provideStore } from "@ngrx/store";
import { authStore } from "../auth/store/auth.reducer";
import { profileStore } from "./store/profile.reducer";

describe("ProfilePage", () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideStore({ auth: authStore, profile: profileStore })
      ],
      imports: [HttpClientModule]
    }).createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
