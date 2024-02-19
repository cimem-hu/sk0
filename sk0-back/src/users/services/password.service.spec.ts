import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should hash a password and not equal to the original password', async () => {
      const password = 'examplePassword';
      const hashedPassword = await service.hash(password);
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword.length).toBeGreaterThan(0);
      expect(hashedPassword).not.toEqual(password);
    });
  });

  describe('compare', () => {
    it('should return true for matching passwords', async () => {
      const plainTextPassword = 'examplePassword';
      const hashedPassword = await service.hash(plainTextPassword);
      const isMatching = await service.compare(plainTextPassword, hashedPassword);
      expect(isMatching).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const plainTextPassword = 'examplePassword';
      const hashedPassword = await service.hash(plainTextPassword);
      const nonMatchingPassword = 'wrongPassword';
      const isMatching = await service.compare(nonMatchingPassword, hashedPassword);
      expect(isMatching).toBe(false);
    });
  });
});
