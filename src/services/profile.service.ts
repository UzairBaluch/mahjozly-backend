import { type Prisma } from '@prisma/client';
import {
  findOrganizationByUserId,
  updateOrganizationByUserId,
} from '../repositories/business.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { type UpdateBusinessProfileInput } from '../validations/business.validation.js';

// Business layer: enforce "org must exist" rule before returning/updating profile.
const getBusinessProfileService = async (userId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  return org;
};

// Business layer: partial PATCH; empty payload is rejected before touching the DB.
const updateBusinessProfileService = async (userId: string, input: UpdateBusinessProfileInput) => {
  // Re-check existence so update returns a domain-level 404 instead of raw DB errors.
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  const data = Object.fromEntries(
    Object.entries(input).filter(([, v]) => v !== undefined),
  ) as Prisma.OrganizationUpdateInput;
  if (Object.keys(data).length === 0) {
    throw new ApiError(400, 'No fields to update');
  }
  // Repository performs the actual DB write; service owns the "must exist first" rule.
  const updatedOrg = await updateOrganizationByUserId(userId, data);

  return updatedOrg;
};

export { getBusinessProfileService, updateBusinessProfileService };
