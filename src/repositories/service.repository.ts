import { type Prisma } from '@prisma/client';
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

// Catalog list for one org — excludes soft-deleted rows (`deletedAt` set). Order is undefined until the schema adds a sort field.
const findServicesByOrgId = async (orgId: string) => {
  return prisma.service.findMany({
    where: { orgId, deletedAt: null },
  });
};

// Single row fetch scoped by org — always include `orgId` in `where` so a leaked id cannot read another org’s row.
const findServiceByIdAndOrgId = async (id: string, orgId: string) => {
  return prisma.service.findFirst({
    where: { id, orgId, deletedAt: null },
  });
};

// Partial update for an active row. `updateMany` returns `{ count }` — service maps `count === 0` to 404.
// Caller (service) builds `data` as Prisma-safe scalars only; never pass full `CreateServiceInput` here.
const updateServiceByIdAndOrgId = async (
  id: string,
  orgId: string,
  data: Prisma.ServiceUpdateManyMutationInput,
) => {
  return prisma.service.updateMany({
    where: { id, orgId, deletedAt: null },
    data,
  });
};

// Soft delete: row stays for FKs (e.g. bookings); hidden from normal lists via `deletedAt`. `isActive` forced false for clarity.
const softDeleteServiceByIdAndOrgId = async (id: string, orgId: string) => {
  return prisma.service.updateMany({
    where: { id, orgId, deletedAt: null },
    data: { deletedAt: new Date(), isActive: false },
  });
};
export {
  insertService,
  findServicesByOrgId,
  findServiceByIdAndOrgId,
  updateServiceByIdAndOrgId,
  softDeleteServiceByIdAndOrgId,
};
