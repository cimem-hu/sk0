import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterPage } from "./register.page";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { HttpClientTestingModule } from "@angular/common/http/testing";

class HttpClientMock {}

describe("RegisterPage", () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: HttpClientMock, useClass: HttpClientMock }
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
