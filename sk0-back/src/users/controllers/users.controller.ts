import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    
    const existingUser = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);

    if (existingUser) {
      return { message: 'Login successful' };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
