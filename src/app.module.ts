import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { UsersModule } from './users/users.module';
import { drizzleProvider } from './drizzle/drizzle.provider';
import { ConfigService } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ...drizzleProvider, ConfigService],
})
export class AppModule {}
