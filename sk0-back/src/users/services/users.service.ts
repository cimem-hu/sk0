import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { USER_REPOSITORY } from '../../constants';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PasswordService } from './password.service';

export class UserNotFoundException extends HttpException {}
export class UserExistException extends HttpException {}

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private repo: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.repo.create({ ...user });
    const userByEmail = await this.findOneByEmail(user.email);
    if (userByEmail) {
      throw new UserExistException('Exists', 400);
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
      throw new UserNotFoundException('Not found', 400);
    }
    if (attributes.password != '') {
      attributes.password = await this.passwordService.hash(
        attributes.password,
      );
    }

    Object.assign(user, attributes);
    const userByEmail = await this.findOneByEmail(user.email);

    if (userByEmail && userByEmail.id !== id) {
      throw new UserExistException('Exists', 400);
    }

    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return this.repo.remove(user);
  }
}
