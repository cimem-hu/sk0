import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

class HttpClientMock extends HttpClient {

}

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
});
