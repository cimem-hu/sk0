import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Password decryption logic goes here in the future
    const isPasswordMatching = pass === user.password;

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
