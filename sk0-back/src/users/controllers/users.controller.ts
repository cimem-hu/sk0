import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    
    const existingUser = await this.usersService.validateUser(loginUserDto.email, loginUserDto.password);

    if (existingUser) {
      return { message: 'Login successful' };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
