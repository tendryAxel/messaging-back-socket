import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, ...drizzleProvider, ConfigService],
})
export class MessagesModule {}
