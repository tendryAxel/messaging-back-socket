import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { ConfigService } from '@nestjs/config';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService, ...drizzleProvider, ConfigService],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get messages', async () => {
    const messages = await service.findAll();
    expect(messages).toBeDefined();
  });
});
