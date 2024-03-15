import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { LoginUserDto } from "../dtos/login-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { TokenService } from "../../auth/token.service";

describe("AuthService", () => {
  let authService: AuthService;
  let mockUsersService: UsersService;
  let mockPasswordService: PasswordService;
  const mockUserRepository: Partial<Repository<User>> = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn()
  };
  const mockTokenService: Partial<TokenService> = {
    generateToken: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: PasswordService,
          useValue: {
            hashPassword: jest.fn(),
            comparePasswords: jest.fn()
          }
        },
        {
          provide: TokenService,
          useValue: mockTokenService
        },
        {
          provide: "UserRepository",
          useValue: mockUserRepository
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    mockUsersService = module.get<UsersService>(UsersService);
    mockPasswordService = module.get<PasswordService>(PasswordService);
  });

  describe("loginUser", () => {
    it("should return a user when valid credentials are provided", async () => {
      const loginUserDto: LoginUserDto = {
        email: "test@example.com",
        password: "password"
      };
      const expectedUser = {
        id: 1,
        email: "test@example.com",
        password: "password",
        name: "John Doe",
        token: "Token String"
      };

      mockTokenService.generateToken = jest
        .fn()
        .mockReturnValue("Token String");

      mockUsersService.findOneByEmail = jest
        .fn()
        .mockResolvedValue(expectedUser);
      mockPasswordService.compare = jest.fn().mockResolvedValue(true);

      const result = await authService.loginUser(loginUserDto);
      expect(result).toStrictEqual(expectedUser);
      expect(mockTokenService.generateToken).toHaveBeenCalledWith({
        email: expectedUser.email,
        id: expectedUser.id
      });
    });

    it("should throw NotFoundException when user is not found", async () => {
      const loginUserDto: LoginUserDto = {
        email: "nonexistent@example.com",
        password: "password"
      };

      mockUsersService.findOneByEmail = jest.fn().mockResolvedValue(null);

      await expect(authService.loginUser(loginUserDto)).rejects.toThrow(
        NotFoundException
      );
    });

    it("should throw UnauthorizedException when invalid credentials are provided", async () => {
      const loginUserDto: LoginUserDto = {
        email: "test@example.com",
        password: "wrongpassword"
      };

      const userInDbWithDifferentPassword = {
        id: 1,
        email: "test@example.com",
        password: "password",
        name: "John Doe"
      };

      mockUsersService.findOneByEmail = jest
        .fn()
        .mockResolvedValue(userInDbWithDifferentPassword);
      mockPasswordService.compare = jest.fn().mockResolvedValue(false);

      await expect(authService.loginUser(loginUserDto)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });

  describe("createUser", () => {
    it("should return the created user", async () => {
      const newUser: CreateUserDto = {
        email: "test@test.com",
        password: "Password123",
        name: "John Doe"
      };

      const expectedUser = {
        id: 1,
        email: "test@test.com",
        password: "Password123",
        name: "John Doe"
      };

      mockUsersService.create = jest.fn().mockResolvedValue(expectedUser);
      mockPasswordService.hash = jest.fn().mockResolvedValue("hashedPassword");

      const result = await authService.createUser(newUser);
      expect(result).toStrictEqual(expectedUser);
      expect(mockUsersService.create).toHaveBeenCalledWith({
        ...newUser,
        password: "hashedPassword"
      });
    });
  });

  describe("validateUser", () => {
    it("should return a user with correct email", async () => {
      const expectedUser = {
        id: 1,
        email: "test@test.com",
        password: "Password123",
        name: "John Doe"
      };

      const email = "test@test.com";

      mockUsersService.create = jest.fn().mockResolvedValue(expectedUser);

      mockUsersService.findOneByEmail = jest
        .fn()
        .mockResolvedValue(expectedUser);
      mockPasswordService.compare = jest.fn().mockResolvedValue(true);

      const result = await authService.validateUser(email);
      expect(result).toEqual(expectedUser);
    });

    it("should throw NotFoundException when user is not found", async () => {
      const email = "a@b.cd";

      mockUsersService.findOneByEmail = jest.fn().mockResolvedValue(null);

      await expect(authService.validateUser(email)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
