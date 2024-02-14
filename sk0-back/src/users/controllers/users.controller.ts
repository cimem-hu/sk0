import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  HttpCode,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../user.entity';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';

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

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException();
    }
    return this.usersService.findOneById(userId);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
