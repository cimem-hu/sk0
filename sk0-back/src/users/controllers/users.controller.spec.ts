import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConflictException } from '@nestjs/common';
import { User } from '../user.entity';
import { AuthService } from '../services/auth.service';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;
  beforeEach(async () => {
    mockUsersService = {
      create: jest.fn(),
      findOneById: jest.fn(),
      findOneByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    mockAuthService = {
      createUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    mockUsersService = module.get<UsersService>(UsersService);
    mockAuthService = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

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
      mockAuthService.createUser = jest.fn().mockReturnValue(createdUserMock);

      const result = await controller.createUser(createUserDto);

      expect(result.email).toEqual(createdUserMock.email);
      expect(mockAuthService.createUser).toHaveBeenCalledTimes(1);
      expect(mockAuthService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw ConflictException', async () => {
      mockAuthService.createUser = jest
        .fn()
        .mockRejectedValue(new ConflictException());

      await expect(controller.createUser(createUserDto)).rejects.toThrow(
        new ConflictException(),
      );
      expect(mockAuthService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });
});
