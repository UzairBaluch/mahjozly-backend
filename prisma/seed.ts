// Standalone script: `npx prisma db seed` (see prisma.config.ts). Loads .env for DATABASE_URL.
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Platform-owned catalogue — orgs pick categoryId when creating services (see schema comments).
  const categories = [
    { name: 'Hair & Beauty', slug: 'hair-beauty', order: 1 },
    { name: 'Health & Wellness', slug: 'health-wellness', order: 2 },
    { name: 'Fitness', slug: 'fitness', order: 3 },
    { name: 'Consulting', slug: 'consulting', order: 4 },
    { name: 'Events & Venues', slug: 'events-venues', order: 5 },
    { name: 'Education', slug: 'education', order: 6 },
    { name: 'Photography', slug: 'photography', order: 7 },
    { name: 'Flowers & Gifts', slug: 'flowers-gifts', order: 8 },
    { name: 'Other', slug: 'other', order: 99 },
  ];

  // Upsert by slug so re-running seed does not duplicate rows or fail on unique constraints.
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('Categories seeded.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
