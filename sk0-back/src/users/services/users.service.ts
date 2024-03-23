import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { CreateUserDto } from "../dtos/create-user.dto";
import { PasswordService } from "./password.service";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { plainToClass } from "class-transformer";

export class UserNotFoundException extends HttpException {}
export class UserExistException extends HttpException {}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private passwordService: PasswordService
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.usersRepository.create({ ...user });
    const userByEmail = await this.findOneByEmail(user.email);
    if (userByEmail) {
      throw new UserExistException("Exists", 400);
    }

    return this.usersRepository.save(createdUser);
  }

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: number, attributes: Partial<User>): Promise<UpdateUserDto> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new UserNotFoundException("Not found", 400);
    }
    if (attributes.password != "") {
      attributes.password = await this.passwordService.hash(
        attributes.password
      );
    }

    Object.assign(user, attributes);
    const userByEmail = await this.findOneByEmail(user.email);

    if (userByEmail && userByEmail.id !== id) {
      throw new UserExistException("Exists", 400);
    }
    const savedUser = await this.usersRepository.save(user);
    return plainToClass(UpdateUserDto, savedUser);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return this.usersRepository.remove(user);
  }
}
