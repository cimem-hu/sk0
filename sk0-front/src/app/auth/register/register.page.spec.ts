import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterPage } from "./register.page";
import { HttpClient } from "@angular/common/http";

class HttpClientMock extends HttpClient {}

describe("RegisterPage", () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: HttpClientMock
        }
      ]
    }).createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
