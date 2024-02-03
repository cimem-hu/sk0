import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('loginUser', () => {
    it('should return a user when valid credentials are provided', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const expectedUser = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        name: 'John Doe',
      };

      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(expectedUser);

      const result = await authService.loginUser(loginUserDto);
      expect(result).toEqual(expectedUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(null);

      await expect(authService.loginUser(loginUserDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException when invalid credentials are provided', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const userWithDifferentPassword = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        name: 'John Doe',
      };

      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(userWithDifferentPassword);

      await expect(authService.loginUser(loginUserDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
