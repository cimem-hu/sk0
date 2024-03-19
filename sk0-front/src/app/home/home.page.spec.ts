import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomePage } from "./home.page";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";

class HttpClientMock {}

describe("HomePage", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: HttpClientMock, useClass: HttpClientMock }
      ]
    }).createComponent(HomePage);
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
