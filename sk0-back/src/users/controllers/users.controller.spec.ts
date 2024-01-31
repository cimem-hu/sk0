import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      validateUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<AuthService>(AuthService);
    (service.validateUser as jest.Mock).mockResolvedValue(true);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('loginUser', () => {
    it('should return a success message for valid credentials', async () => {
      const loginUserDto = { email: 'test@example.com', password: 'password123' };
      (service.validateUser as jest.Mock).mockResolvedValue(true);

      await expect(controller.loginUser(loginUserDto)).resolves.toEqual({ message: 'Login successful' });
    });

    it('should throw an UnauthorizedException for invalid credentials', async () => {
      const loginUserDto = { email: 'test@example.com', password: 'wrongpassword' };
      (service.validateUser as jest.Mock).mockResolvedValue(false);

      await expect(controller.loginUser(loginUserDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
