// Loads DATABASE_URL into process.env when this module is imported outside a dotenv-preloaded entrypoint.
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// In dev, nodemon/tsc cycles reload modules — hang one client on globalThis so you do not exhaust PG connections.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Driver adapter: Prisma talks to Postgres via `pg` using DATABASE_URL (required in Prisma 7 with this setup).
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
