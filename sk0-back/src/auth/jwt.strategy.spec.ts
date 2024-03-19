import { UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "../users/services/auth.service";
import { ConfigService } from "@nestjs/config";
import { User } from "../users/user.entity";
import { TokenPayload } from "./token.service";

describe("JwtStrategy", () => {
  let jwtStrategy: JwtStrategy;
  let mockAuthService: Partial<jest.Mocked<AuthService>>;
  let mockConfigService: Partial<jest.Mocked<ConfigService>>;

  beforeEach(async () => {
    mockAuthService = {
      validateUser: jest.fn()
    };

    mockConfigService = {
      get: jest.fn().mockReturnValue("test_secret")
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: AuthService, useValue: mockAuthService },
        { provide: ConfigService, useValue: mockConfigService }
      ]
    }).compile();

    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
  });

  it("should validate and return the user if the user exists", async () => {
    const user = new User();
    const tokenPayload: TokenPayload = { id: 1, email: "test@test.com", name:"John Doe" };
    (mockAuthService.validateUser as jest.Mock).mockResolvedValue(user);

    const result = await jwtStrategy.validate(tokenPayload);

    expect(result).toEqual(user);
    expect(mockAuthService.validateUser).toHaveBeenCalledWith("test@test.com");
  });

  it("should throw an UnauthorizedException if the user does not exist", async () => {
    (mockAuthService.validateUser as jest.Mock).mockResolvedValue(null);
    const tokenPayload: TokenPayload = { id: 1, email: "test@test.com", name:"John Dont" };

    await expect(jwtStrategy.validate(tokenPayload)).rejects.toThrow(
      UnauthorizedException
    );
  });

  it("should throw an error if JWT_SECRET is not defined", async () => {
    mockConfigService.get = jest.fn().mockReturnValue(undefined);
    expect(
      () =>
        new JwtStrategy(
          mockAuthService as unknown as AuthService,
          mockConfigService as unknown as ConfigService
        )
    ).toThrow(new Error("JWT_SECRET is not defined"));
  });
});
