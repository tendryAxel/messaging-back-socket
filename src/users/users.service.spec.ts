import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { ConfigService } from '@nestjs/config';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ...drizzleProvider, ConfigService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should manipulate user', async () => {
    const name = randomStringGenerator();
    const result = await service.create({ name, password: '12345678' });
    expect(result).toBeDefined();
    expect(result.name).toEqual(name);
    expect(result.password).toEqual('12345678');

    const modifiedName = randomStringGenerator();
    const modified = await service.update(result.id, {
      name: modifiedName,
      password: '12345678',
    });
    expect(modified).toBeDefined();
    expect(modified.name).toEqual(modifiedName);

    expect(await service.remove(result.id)).toBeDefined();

    const deleted = await service.findOne(result.id);
    expect(deleted).not.toBeDefined();
  });

  it('should get all user', async () => {
    const users = await service.findAll();
    expect(users).toBeDefined();
  });
});
