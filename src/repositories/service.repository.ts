import { prisma } from '../lib/database.js';
import { type CreateServiceInput } from '../validations/service.validation.js';

// DB insert for a new service row. Named `insertService` so callers are not confused with app-layer `create*` helpers.
const insertService = async (orgId: string, data: CreateServiceInput) => {
  // `create({ data })` expects one flat row object—same level as orgId, not `data: { orgId, data: { ... } }`. No `where` on create.
  // With exactOptionalPropertyTypes, optional keys must be left out—not set to `undefined`.
  return prisma.service.create({
    data: {
      orgId,
      name: data.name,
      categoryId: data.categoryId,
      price: data.price,
      duration: data.duration,
      // Only spread optional fields when the client sent a value.
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.maxPerSlot !== undefined ? { maxPerSlot: data.maxPerSlot } : {}),
      ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
    },
  });
};

export { insertService };
