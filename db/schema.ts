import { pgTable, timestamp, text, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('user_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  name: text('name').unique().notNull(),
  password: text('password').notNull(),
});

export const messagesTable = pgTable('message_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: uuid('author_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
  receptorId: uuid('receptor_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
  content: text('content'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
