import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { LoginUserDto } from "../dtos/login-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../user.entity";
import { TokenService } from "../../auth/token.service";
import { PasswordService } from "./password.service";
import { LoginResultDto } from "../dtos/login-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService
  ) {}

  async createUser(newUser: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(newUser.password);
    const userToCreate = { ...newUser, password: hashedPassword };

    const createdUser = await this.usersService.create(userToCreate);
    return createdUser;
  }

  async loginUser(loginUser: LoginUserDto): Promise<LoginResultDto> {
    const { email, password } = loginUser;
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser) {
      throw new NotFoundException();
    }

    const isPasswordMatching = await this.passwordService.compare(
      password,
      foundUser.password
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const token = this.tokenService.generateToken({
      email: foundUser.email,
      id: foundUser.id,
      name: foundUser.name
    });
    return { ...foundUser, token } as LoginResultDto;
  }

  async validateUser(email: string) {
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }
}
