import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  
    async createUser(createUserDto: CreateUserDto): Promise<User> {
      const createdUser = await this.usersService.create(createUserDto);
      return createdUser;
    }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(loginUserDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Password decryption logic goes here in the future
    const isPasswordMatching = loginUserDto.password === user.password;

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}