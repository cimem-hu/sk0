import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { User } from 'src/users/types/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 2,
      username: 'testuser',
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

  getByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
