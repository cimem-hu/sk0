import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ConflictException,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getUsers() {
    return this.usersService.findAll();
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      return createdUser;
    } catch (error) {
      throw new ConflictException('User with this email already exists');
    }
  }
}
