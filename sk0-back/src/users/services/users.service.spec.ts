import { Test, TestingModule } from "@nestjs/testing";
import {
  UserExistException,
  UserNotFoundException,
  UsersService,
} from './users.service';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from './password.service';


describe("UsersService", () => {
  let usersService: UsersService;
  const mockRepo: Partial<Repository<User>> = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn()
  };
  const mockPasswordService: PasswordService = {
    hash: jest.fn(),
    compare: jest.fn(),
  };

  const mockData = {
    name: "Test User",
    email: "a@bc.de",
    password: "password"
  };
  const mockResult = {
    id: 1,
    name: "Test User",
    email: "a@bc.de",
    password: "password"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'UserRepository', useValue: mockRepo },
        UsersService,
        { provide: PasswordService, useValue: mockPasswordService },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("create", () => {
    it("should create a user", async () => {
      mockRepo.create = jest.fn().mockReturnValue(mockResult);
      mockRepo.save = jest.fn().mockResolvedValue(mockResult);
      const result = await usersService.create(mockData);
      expect(result).toStrictEqual(mockResult);
      expect(mockRepo.create).toHaveBeenCalledWith(mockData);
      expect(mockRepo.save).toHaveBeenCalledWith(mockResult);
    });

    it("should throw UserExistException when user already exists", async () => {
      mockRepo.create = jest.fn().mockReturnValue(mockResult);
      usersService.findOneByEmail = jest.fn().mockResolvedValue(mockResult);
      await expect(usersService.create(mockData)).rejects.toThrow(
        UserExistException
      );
    });
  });

  describe("findOneById", () => {
    it("should find a user by id", async () => {
      mockRepo.findOne = jest.fn().mockResolvedValue(mockResult);
      const result = await usersService.findOneById(1);
      expect(result).toStrictEqual(mockResult);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe("findOneByEmail", () => {
    it("should find a user by email", async () => {
      mockRepo.findOne = jest.fn().mockResolvedValue(mockResult);
      const result = await usersService.findOneByEmail(mockData.email);
      expect(result).toStrictEqual(mockResult);
      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { email: mockData.email }
      });
    });
  });

  describe("findAll", () => {
    it("should find all users", async () => {
      mockRepo.find = jest.fn().mockResolvedValue([mockResult]);
      const result = await usersService.findAll();
      expect(result).toStrictEqual([mockResult]);
      expect(mockRepo.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const mockUpdatedUser = { ...mockResult, email: 'aaa@bc.de' };

      mockRepo.findOne = jest.fn().mockResolvedValue(mockResult);
      mockRepo.save = jest.fn().mockResolvedValue(mockResult);
      mockPasswordService.hash = jest
        .fn()
        .mockResolvedValue(mockUpdatedUser.password);

      const result = await usersService.update(1, { email: 'aaa@bc.de' });

      expect(result).toStrictEqual(mockUpdatedUser);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepo.save).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should not update password if password is empty string', async () => {
      mockRepo.findOne = jest.fn().mockResolvedValue(mockResult);
      mockRepo.save = jest.fn().mockResolvedValue(mockResult);
      mockPasswordService.hash = jest.fn().mockResolvedValue('passwordhashed');

      const result = await usersService.update(1, { password: '' });

      expect(result).toStrictEqual(mockResult);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepo.save).toHaveBeenCalledWith(mockResult);
    });

    it('should throw UserNotFoundException when user does not exist', async () => {
      mockRepo.findOne = jest.fn().mockResolvedValue(null);
      await expect(
        usersService.update(1, { email: "aaa@bc.de" })
      ).rejects.toThrow(UserNotFoundException);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should throw ConflictException when user wants to update with existing email", async () => {
      mockRepo.findOne = jest.fn().mockResolvedValue(mockResult);
      await expect(
        usersService.update(2, { email: mockData.email })
      ).rejects.toThrow(UserExistException);
    });
  });

  describe("remove", () => {
    it("should remove a user", async () => {
      mockRepo.findOne = jest.fn().mockResolvedValue(mockResult);
      mockRepo.remove = jest.fn().mockResolvedValue(mockResult);
      const result = await usersService.remove(1);
      expect(result).toStrictEqual(mockResult);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepo.remove).toHaveBeenCalledWith(mockResult);
    });
  });
});
