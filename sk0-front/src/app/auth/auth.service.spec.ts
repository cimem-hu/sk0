import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

class HttpClientMock extends HttpClient {}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: HttpClientMock,
        },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('AuthService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isUserLoggedIn to false and userName to empty string on logout', (done) => {
    service.isUserLoggedIn.next(true);
    service.userName.next('testUser');

    service.logout();

    service.isUserLoggedIn.subscribe((isUserLoggedIn) => {
      expect(isUserLoggedIn).toBe(false);
    });

    service.userName.subscribe((userName) => {
      expect(userName).toBe(null);
      done();
    });
  });
});
