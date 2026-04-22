import { type Prisma } from '@prisma/client';
import { prisma } from '../lib/database.js';
import { type CreateAddonInput } from '../validations/addon.validation.js';

// Insert one addon row for an org; optional `isActive` is only written when provided.
const insertAddon = async (orgId: string, data: CreateAddonInput) => {
  return prisma.addon.create({
    data: {
      orgId,
      name: data.name,
      price: data.price,
      ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
    },
  });
};

// List addons for one org.
const findAddonsByOrgId = async (orgId: string) => {
  return prisma.addon.findMany({
    where: { orgId },
  });
};

// Fetch one addon scoped by org ownership.
const findAddonByIdAndOrgId = async (id: string, orgId: string) => {
  return prisma.addon.findFirst({
    where: {
      id,
      orgId,
    },
  });
};

// Partial update scoped by org; service maps `count === 0` to 404.
const updateAddonByIdAndOrgId = async (
  id: string,
  orgId: string,
  data: Prisma.AddonUpdateManyMutationInput,
) => {
  return prisma.addon.updateMany({
    where: { id, orgId },
    data,
  });
};

// "Delete" by deactivating the addon for that org.
const softDeleteAddonByIdAndOrgId = async (id: string, orgId: string) => {
  return prisma.addon.updateMany({
    where: { id, orgId },
    data: { isActive: false },
  });
};

export {
  insertAddon,
  findAddonsByOrgId,
  findAddonByIdAndOrgId,
  updateAddonByIdAndOrgId,
  softDeleteAddonByIdAndOrgId,
};
