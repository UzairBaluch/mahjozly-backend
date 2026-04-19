import { prisma } from '../lib/database.js';

// DB lookup by primary key. Returns null if missing — callers (service) map that to ApiError if needed.
const findCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
  });
};
export { findCategoryById };
