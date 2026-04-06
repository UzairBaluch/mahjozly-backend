// Prisma CLI config (v7): schema/migrations paths, seed command, datasource URL from env.
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // `tsx` runs TypeScript seed without precompiling; must be a devDependency or available on PATH.
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
