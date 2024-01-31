import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { USER_REPOSITORY } from '../../constants';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private repo: Repository<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.repo.create({ ...user });
    const userByEmail = await this.findOneByEmail(user.email);
    if (userByEmail) {
      throw new ConflictException();
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
      throw new NotFoundException();
    }
    Object.assign(user, attributes);
    const userByEmail = await this.findOneByEmail(user.email);
    if (userByEmail && userByEmail.id !== id) {
      throw new ConflictException();
    }

    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return this.repo.remove(user);
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Password decryption goes here in the future
    const isPasswordMatching = pass === user.password;
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
