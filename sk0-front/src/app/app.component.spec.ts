import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { authStore } from "./auth/store/auth.reducer";
import { provideStore } from "@ngrx/store";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule],
      providers: [provideRouter([]),
      provideStore(
        { auth: authStore },
        {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }
      )]
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
