import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  users = [];

  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const existingUser = this.usersService.getByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    } else {
      this.usersService.createUser(createUserDto);
      return { message: 'User created successfully' };
    }
  }
}
