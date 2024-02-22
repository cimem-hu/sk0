import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";
import {
  NotFoundException,
  UnauthorizedException,
  ConflictException
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
      findOneById: jest.fn()
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

    it("should throw error with non existing id", async () => {
      mockUsersService.findOneById = jest.fn().mockResolvedValue(null);
      await expect(controller.getUserById(mockId)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("patchUserById", () => {
    const mockId = "1";

    it("should overwrite user with id 1", async () => {
      const modifyName = { name: "Csabi" };
      Object.assign(expectedUser, modifyName);
      mockUsersService.update = jest.fn().mockResolvedValue(expectedUser);
      const result = await controller.updateUserbyId(mockId, modifyName);
      expect(result).toStrictEqual(expectedUser);
      expect(mockUsersService.update).toHaveBeenCalledWith(
        parseInt(mockId),
        modifyName
      );
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
      (mockAuthService.createUser as jest.Mock).mockRejectedValue(
        new ConflictException()
      );

      await expect(controller.createUser(createUserDto)).rejects.toThrow(
        ConflictException
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
