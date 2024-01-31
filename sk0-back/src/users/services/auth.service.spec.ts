import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

const mockUsersService = {
  findOneByEmail: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return the user if email and password match', async () => {
      const mockData = {
        email: 'test@example.com',
        password: 'password',
      };
      const mockResult = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
      };
      
      mockUsersService.findOneByEmail.mockResolvedValue(mockResult);
      
      const result = await authService.validateUser(mockData.email, mockData.password);
      expect(result).toEqual(mockResult);
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(mockData.email);
    });

    it('should throw an UnauthorizedException if the password does not match', async () => {
      const mockData = {
        email: 'test@example.com',
        password: 'password',
      };
      
      const mockResult = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
      };
      
      mockUsersService.findOneByEmail.mockResolvedValue(mockResult);
      
      await expect(authService.validateUser(mockData.email, 'wrongpassword')).rejects.toThrow(UnauthorizedException);
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(mockData.email);
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null);
      await expect(authService.validateUser('nonexistent@example.com', 'password')).rejects.toThrow(NotFoundException);
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    });
  });
});
