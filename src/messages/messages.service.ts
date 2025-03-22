import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';
import { Message } from './entities/message.entity';
import { messagesTable, usersTable } from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const [message] = await this.db
      .insert(messagesTable)
      .values(createMessageDto)
      .returning();
    return message;
  }

  findAll(): Promise<Message[]> {
    return this.db.select().from(messagesTable);
  }

  async findOne(id: string): Promise<Message | null> {
    return (
      await this.db.select().from(messagesTable).where(eq(messagesTable.id, id))
    )[0];
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return (
      await this.db
        .update(usersTable)
        .set(updateMessageDto)
        .where(eq(usersTable.id, id))
        .returning()
    )[0];
  }

  async remove(id: string) {
    const [user] = await this.db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();
    return user;
  }
}
