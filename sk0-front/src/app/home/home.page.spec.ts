import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomePage } from "./home.page";
import { HttpClient } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { authStore } from "../auth/store/auth.reducer";
import { profileStore } from "../profile/store/profile.reducer";

class HttpClientMock extends HttpClient {}

describe("HomePage", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: HttpClientMock
        },
        provideStore({ auth: authStore, profile: profileStore })
      ]
    }).createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
