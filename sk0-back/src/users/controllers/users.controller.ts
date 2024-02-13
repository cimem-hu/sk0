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
  Patch,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
  UserExistException,
  UserNotFoundException,
  UsersService,
} from '../services/users.service';
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
  async getUserById(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException();
    }
    const response = await this.usersService.findOneById(userId);
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.authService.createUser(createUserDto);
    } catch (err) {
      if (err instanceof UserExistException) {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(200)
  @Post('login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Patch(':id')
  async updateUserbyId(
    @Param('id') id: string,
    @Body() userData: Partial<CreateUserDto>,
  ): Promise<User> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException();
    }
    try {
      return this.usersService.update(userId, userData);
    } catch (err) {
      if (err instanceof UserExistException) {
        throw new ConflictException();
      }
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException();
    }
  }
}
