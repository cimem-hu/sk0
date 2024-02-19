import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { TokenService } from '../../auth/token.service';
import { PasswordService } from './password.service';

export type LoginResult = {
  id: number;
  email: string;
  password: string;
  name: string;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser(newUser: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(newUser.password);
    const userToCreate = { ...newUser, password: hashedPassword };

    const createdUser = await this.usersService.create(userToCreate);
    return createdUser;
  }

  async loginUser(loginUser: LoginUserDto): Promise<LoginResult> {
    const { email, password } = loginUser;
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser) {
      throw new NotFoundException();
    }

    const isPasswordMatching = await this.passwordService.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const token = this.tokenService.generateToken({
      email: foundUser.email,
      id: foundUser.id,
    });
    return { ...foundUser, token } as LoginResult;
  }

  async validateUser(email: string) {
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }
}
