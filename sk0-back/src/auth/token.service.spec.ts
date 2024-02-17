import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('TokenService', () => {
  let service: TokenService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { 
          provide: JwtService, 
          useValue: mockJwtService 
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the sign with the parameters', () => {
    const payload = {
      email: 'test@test.com',
      id: 1,
    };

    mockJwtService.sign = jest.fn().mockReturnValue('returnjwt');
    const jwtToken = service.generateToken(payload);

    expect(jwtToken).toBe('returnjwt');
    expect(jwtService.sign).toHaveBeenCalledWith(payload);
  });
});
