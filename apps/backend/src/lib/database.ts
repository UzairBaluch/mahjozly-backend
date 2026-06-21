// Re-export the monorepo-wide Prisma singleton so existing repository imports keep working
// without rewriting every file. Prefer importing directly from `@mahjozly/db` in new code.
export { prisma } from '@mahjozly/db';
