import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideStore } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "../auth/auth.service";
import { ProfilePage } from "./profile.page";
import { authStore } from "../auth/store/auth.reducer";

describe("ProfilePage", () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      providers: [AuthService,
        provideStore(
          { auth: authStore },
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true
            }
          }
        )],
      imports: [HttpClientModule],
    }).createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
