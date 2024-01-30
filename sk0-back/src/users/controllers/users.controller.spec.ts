import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('UsersController', () => {
    let controller: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const mockUsersService = {
            findOneByEmail: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [{ provide: UsersService, useValue: mockUsersService }],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('loginUser', () => {
        it('should return success message for valid credentials', async () => {
            const userDto: LoginUserDto = { email: 'test@example.com', password: 'password123' };
            const expectedUser = { ...userDto, id: 1 };

            (usersService.findOneByEmail as jest.Mock).mockResolvedValue(expectedUser);

            const result = await controller.loginUser(userDto);
            expect(result).toEqual({ message: 'Login successful' });
        });

        it('should throw NotFoundException for non-existing user', async () => {
            const userDto: LoginUserDto = { email: 'nonexistent@example.com', password: 'password123' };

            (usersService.findOneByEmail as jest.Mock).mockResolvedValue(null);

            await expect(controller.loginUser(userDto)).rejects.toThrow(NotFoundException);
        });

        it('should throw UnauthorizedException for invalid password', async () => {
            const userDto: LoginUserDto = { email: 'test@example.com', password: 'wrongPassword' };
            const expectedUser = { email: 'test@example.com', password: 'password123', id: 1 };

            (usersService.findOneByEmail as jest.Mock).mockResolvedValue(expectedUser);

            await expect(controller.loginUser(userDto)).rejects.toThrow(UnauthorizedException);
        });
    });
});
