import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { usersTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findByName(createUserDto.name)) {
      throw new Error('UserName already exists');
    }
    const [user] = await this.db
      .insert(usersTable)
      .values(createUserDto)
      .returning();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.db.select().from(usersTable);
  }

  async findOne(id: string): Promise<User | null> {
    return (
      await this.db.select().from(usersTable).where(eq(usersTable.id, id))
    )[0];
  }

  async findByName(name: string): Promise<User | null> {
    return (
      await this.db.select().from(usersTable).where(eq(usersTable.name, name))
    )[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return (
      await this.db
        .update(usersTable)
        .set(updateUserDto)
        .where(eq(usersTable.id, id))
        .returning()
    )[0];
  }

  async remove(id: string): Promise<User | null> {
    const [user] = await this.db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();
    return user;
  }
}
