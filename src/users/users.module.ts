import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...drizzleProvider, ConfigService],
})
export class UsersModule {}
