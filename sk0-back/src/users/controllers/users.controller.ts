import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  //ConflictException,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../user.entity';
import { AuthService } from '../services/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('')
  getUsers() {
    return this.usersService.findAll();
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }
}
