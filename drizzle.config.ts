import { defineConfig } from 'drizzle-kit';
import * as process from 'node:process';

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      'postgresql://postgres:123@localhost:5432/message',
    user: process.env.USER ?? 'postgres',
  },
});
