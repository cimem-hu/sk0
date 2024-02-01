import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            loginUser: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('loginUser', () => {
    it('should return a user when valid credentials are provided', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const user = { id: 1, email: loginUserDto.email, password: 'password', name: 'John Doe' };
      
      jest.spyOn(authService, 'loginUser').mockResolvedValue(user);
      
      const result = await usersController.loginUser(loginUserDto);
      
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'nonexistent@example.com',
        password: 'password',
      };
      
      jest.spyOn(authService, 'loginUser').mockRejectedValue(new NotFoundException('User not found'));
      
      await expect(usersController.loginUser(loginUserDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException when invalid credentials are provided', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      
      jest.spyOn(authService, 'loginUser').mockRejectedValue(new UnauthorizedException('Invalid credentials'));
      
      await expect(usersController.loginUser(loginUserDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
