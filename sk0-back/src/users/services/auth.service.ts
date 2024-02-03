import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(newUser: CreateUserDto): Promise<User> {
    // TODO: password hashing Bcrypt
    // Object.assign(newUser, hashedPassword)

    const createdUser = await this.usersService.create(newUser);
    return createdUser;
  }

  async loginUser(loginUser: LoginUserDto) {
    const { email, password } = loginUser;
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser) {
      throw new NotFoundException();
    }

    // TODO: Password compare logic goes here in the future
    const isPasswordMatching = password === foundUser.password;

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    return foundUser;
  }
}
