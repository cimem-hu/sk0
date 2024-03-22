import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { AuthService } from "../services/auth.service";
import {
  UserExistException,
  UserNotFoundException,
  UsersService
} from "../services/users.service";
import {
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  HttpStatus
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { User } from "../user.entity";

describe("UsersController", () => {
  let controller: UsersController;
  let mockAuthService: Partial<AuthService>;
  let mockUsersService: Partial<UsersService>;

  const expectedUser: User = {
    id: 1,
    email: "test@example.com",
    password: "password",
    name: "John Doe"
  };

  const createUserDto: CreateUserDto = {
    name: "John Doe",
    email: "test@example.com",
    password: "password"
  };

  beforeEach(async () => {
    mockAuthService = {
      createUser: jest.fn(),
      loginUser: jest.fn()
    };

    mockUsersService = {
      findOneById: jest.fn(),
      create: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      const expectedUsers: User[] = [expectedUser];
      mockUsersService.findAll = jest.fn().mockResolvedValue(expectedUsers);

      const result = await controller.getUsers();

      expect(result).toEqual(expectedUsers);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const expectedUsers: User[] = [expectedUser];
      mockUsersService.findAll = jest.fn().mockResolvedValue(expectedUsers);

      const result = await controller.getAllUsers();

      expect(result).toEqual(expectedUsers);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  // Get user by id
  describe("getUserById", () => {
    const mockId = "1";

    it("should give back user data with id 1", async () => {
      mockUsersService.findOneById = jest.fn().mockResolvedValue(expectedUser);
      const result = await controller.getUserById(mockId);
      expect(result).toStrictEqual(expectedUser);
      expect(mockUsersService.findOneById).toHaveBeenCalledWith(
        parseInt(mockId)
      );
    });

    it("should throw not found exception with non existing id", async () => {
      mockUsersService.findOneById = jest.fn().mockResolvedValue(null);
      await expect(controller.getUserById(mockId)).rejects.toThrow(
        NotFoundException
      );
    });

    it("should throw bad request exception with non numberic id", async () => {
      const badId = "notanumber";
      await expect(controller.getUserById(badId)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe("updateUserById", () => {
    const mockId = "1";

    it("should overwrite user with id 1", async () => {
      const modifyName = { name: "New Name" };
      Object.assign(expectedUser, modifyName);
      mockUsersService.update = jest.fn().mockResolvedValue(expectedUser);
      const result = await controller.updateUserById(mockId, modifyName);
      expect(result).toStrictEqual(expectedUser);
      expect(mockUsersService.update).toHaveBeenCalledWith(
        parseInt(mockId),
        modifyName
      );
    });

    it("should throw bad request exception with non numberic id", async () => {
      const badId = "notanumber";
      await expect(controller.updateUserById(badId, {})).rejects.toThrow(
        BadRequestException
      );
    });

    it("should throw conflict exception with duplicate user", async () => {
      const modifyName = { name: "New Name" };
      mockUsersService.update = jest
        .fn()
        .mockRejectedValue(new UserExistException("User exists", 400));
      await expect(
        controller.updateUserById(mockId, modifyName)
      ).rejects.toThrow(ConflictException);
    });

    it("should throw not found exception with non existing id", async () => {
      const modifyName = { name: "New Name" };
      mockUsersService.update = jest
        .fn()
        .mockRejectedValue(
          new UserNotFoundException("User not found", HttpStatus.NOT_FOUND)
        );
      await expect(
        controller.updateUserById(mockId, modifyName)
      ).rejects.toThrow(NotFoundException);
    });

    it("should throw internal server error exception with unknown error", async () => {
      const modifyName = { name: "New Name" };
      mockUsersService.update = jest.fn().mockRejectedValue(new Error());
      await expect(
        controller.updateUserById(mockId, modifyName)
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  // Register
  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      (mockAuthService.createUser as jest.Mock).mockResolvedValue(expectedUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toEqual(expectedUser);
      expect(mockAuthService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it("should throw ConflictException on duplicate user", async () => {
      mockAuthService.createUser = jest
        .fn()
        .mockRejectedValue(new UserExistException("User exists", 400));

      await expect(controller.createUser(createUserDto)).rejects.toThrow(
        ConflictException
      );
    });

    it("should throw InternalServerErrorException on unknown error", async () => {
      mockAuthService.createUser = jest.fn().mockRejectedValue(new Error());

      await expect(controller.createUser(createUserDto)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  // Login
  describe("loginUser", () => {
    it("should return a user when valid credentials are provided", async () => {
      const loginUserDto: LoginUserDto = {
        email: "test@example.com",
        password: "password"
      };

      (mockAuthService.loginUser as jest.Mock).mockResolvedValue(expectedUser);

      const result = await controller.loginUser(loginUserDto);

      expect(result).toEqual(expectedUser);
      expect(mockAuthService.loginUser).toHaveBeenCalledWith(loginUserDto);
    });

    it("should throw NotFoundException when user is not found", async () => {
      const loginUserDto: LoginUserDto = {
        email: "nonexistent@example.com",
        password: "password"
      };

      (mockAuthService.loginUser as jest.Mock).mockRejectedValue(
        new NotFoundException("User not found")
      );

      await expect(controller.loginUser(loginUserDto)).rejects.toThrow(
        NotFoundException
      );
    });

    it("should throw UnauthorizedException when invalid credentials are provided", async () => {
      const loginUserDto: LoginUserDto = {
        email: "test@example.com",
        password: "wrongpassword"
      };

      (mockAuthService.loginUser as jest.Mock).mockRejectedValue(
        new UnauthorizedException("Invalid credentials")
      );

      await expect(controller.loginUser(loginUserDto)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
