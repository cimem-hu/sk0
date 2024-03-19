import { TestBed } from '@angular/core/testing';

import { JwtHandlerService } from './jwt-handler.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('JwtHandlerService', () => {
  let service: JwtHandlerService;
  let jwtHelper: JwtHelperService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtHandlerService, JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS}
      ],
    });
    service = TestBed.inject(JwtHandlerService);
    jwtHelper = TestBed.inject(JwtHelperService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
