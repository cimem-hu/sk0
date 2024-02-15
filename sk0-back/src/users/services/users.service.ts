import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { USER_REPOSITORY } from '../../constants';
import { CreateUserDto } from '../dtos/create-user.dto';

export class UserNotFoundException extends Error {}
export class UserExistException extends Error {}

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private repo: Repository<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.repo.create({ ...user });
    const userByEmail = await this.findOneByEmail(user.email);
    if (userByEmail) {
      throw new UserExistException();
    }

    return this.repo.save(createdUser);
  }

  async findOneById(id: number): Promise<User> {
    return this.repo.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async update(id: number, attributes: Partial<User>): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    Object.assign(user, attributes);
    const userByEmail = await this.findOneByEmail(user.email);
    if (userByEmail && userByEmail.id !== id) {
      throw new UserExistException();
    }

    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return this.repo.remove(user);
  }
}
