import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import {
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let mockAuthService: Partial<AuthService>;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    mockAuthService = {
      createUser: jest.fn(),
      loginUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    mockAuthService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Register
  describe('createUser', () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'a@bc.de',
      password: 'password',
    };

    const createdUserMock: User = {
      id: 1,
      name: 'Test User',
      email: 'a@bc.de',
      password: 'password',
    };

    it('should create a new user successfully', async () => {
      jest
        .spyOn(mockAuthService, 'createUser')
        .mockResolvedValue(createdUserMock);

      const result = await controller.createUser(createUserDto);

      expect(result.email).toEqual(createdUserMock.email);
      expect(mockAuthService.createUser).toHaveBeenCalledTimes(1);
      expect(mockAuthService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw ConflictException', async () => {
      jest
        .spyOn(mockAuthService, 'createUser')
        .mockRejectedValue(new ConflictException());

      await expect(controller.createUser(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockAuthService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  // Login
  describe('loginUser', () => {
    it('should return a user when valid credentials are provided', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const user = {
        id: 1,
        email: loginUserDto.email,
        password: 'password',
        name: 'John Doe',
      };

      jest.spyOn(mockAuthService, 'loginUser').mockResolvedValue(user);

      const result = await controller.loginUser(loginUserDto);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      jest
        .spyOn(mockAuthService, 'loginUser')
        .mockRejectedValue(new NotFoundException('User not found'));

      await expect(controller.loginUser(loginUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException when invalid credentials are provided', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      jest
        .spyOn(mockAuthService, 'loginUser')
        .mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      await expect(controller.loginUser(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
