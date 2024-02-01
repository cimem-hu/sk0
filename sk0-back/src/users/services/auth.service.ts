import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.usersService.create(createUserDto);
    return createdUser;
  }
}
