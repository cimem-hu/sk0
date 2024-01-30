import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../types/user';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      name: 'testuser',
      email: 'testuser@example.com',
      password: 'password1234',
    },
  ];

  createUser(userDto: CreateUserDto) {
    this.users.push(userDto);
  }

  getUsers() {
    return this.users;
  }

  getByEmail(email: string): User | null {
    return this.users.find((user) => user.email === email);
  }
}
