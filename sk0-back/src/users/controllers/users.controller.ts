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
  InternalServerErrorException
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import {
  UserExistException,
  UserNotFoundException,
  UsersService
} from "../services/users.service";
import { User } from "../user.entity";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../dtos/login-user.dto";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { LoginResultDto } from "../dtos/login-response.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @ApiBearerAuth()
  @Get("protected")
  @ApiResponse({
    status: 200,
    description: "The found users",
    type: Array<User>
  })
  getUsers() {
    return this.usersService.findAll();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "The found users",
    type: Array<User>
  })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "The found user by id",
    type: User
  })
  async getUserById(@Param("id") id: string): Promise<User> {
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

  @Post("register")
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: "The found user by id",
    type: User
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.authService.createUser(createUserDto);
    } catch (err) {
      if (err instanceof UserExistException) {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(200)
  @Post("login")
  @ApiResponse({
    status: 200,
    description: "The found user by id",
    type: LoginResultDto
  })
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @ApiBearerAuth()
  @Patch(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "The found pathed by id",
    type: UpdateUserDto
  })
  async updateUserById(
    @Param("id") id: string,
    @Body() userData: Partial<CreateUserDto>
  ): Promise<UpdateUserDto> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException();
    }
    try {
      return await this.usersService.update(userId, userData);
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
