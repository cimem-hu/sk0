import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './auth.service';

describe('LoginService', () => {
  let service: LoginService;
  const falseFormData = new FormGroup({
    email: new FormControl('notindatabase@gmail.com'),
    password: new FormControl('notindatabase'),
  });
  const trueFormData = new FormGroup({
    email: new FormControl('teszt@gmail.com'),
    password: new FormControl('ABCDe111!'),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('LoginService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loginrequest should return false', () => {
    expect(service.loginRequest(falseFormData)).toBeFalsy();
  });

  it('loginrequest should return true', () => {
    expect(service.loginRequest(trueFormData)).toBeTruthy();
  });
});
