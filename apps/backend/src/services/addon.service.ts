import { findOrganizationByUserId } from '../repositories/business.repository.js';
import {
  insertAddon,
  findAddonsByOrgId,
  findAddonByIdAndOrgId,
  updateAddonByIdAndOrgId,
  softDeleteAddonByIdAndOrgId,
} from '../repositories/addon.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { type CreateAddonInput, type UpdateAddonInput } from '../validations/addon.validation.js';

// Create one addon scoped to the authenticated org user.
const createAddonForOrgUser = async (userId: string, input: CreateAddonInput) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }

  const createdAddon = await insertAddon(org.id, input);

  return createdAddon;
};
// List all addons for the authenticated org user.
const listAddonsForOrgUser = async (userId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }

  return findAddonsByOrgId(org.id);
};
// Get one addon by id with org ownership enforcement.
const getAddonByIdForOrgUser = async (userId: string, addonId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }

  const addon = await findAddonByIdAndOrgId(addonId, org.id);
  if (addon === null) {
    throw new ApiError(404, 'Addon not found');
  }
  return addon;
};
// Update one addon by id for the authenticated org; `count === 0` maps to 404.
const updateAddonByIdForOrgUser = async (
  userId: string,
  addonId: string,
  input: UpdateAddonInput,
) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  const data = {
    ...(input.name !== undefined ? { name: input.name } : {}),

    ...(input.price !== undefined ? { price: input.price } : {}),

    ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
  };

  const updated = await updateAddonByIdAndOrgId(addonId, org.id, data);
  if (updated.count === 0) {
    throw new ApiError(404, 'Addon not found');
  }
  return updated;
};
// Soft-delete (deactivate) one addon by id for the authenticated org.
const softDeleteAddonByIdForOrgUser = async (userId: string, addonId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  const deleted = await softDeleteAddonByIdAndOrgId(addonId, org.id);
  if (deleted.count === 0) {
    throw new ApiError(404, 'Addon not found');
  }
  return deleted;
};

export {
  createAddonForOrgUser,
  listAddonsForOrgUser,
  getAddonByIdForOrgUser,
  updateAddonByIdForOrgUser,
  softDeleteAddonByIdForOrgUser,
};
