import { findOrganizationByUserId } from '../repositories/business.repository.js';
import { insertService } from '../repositories/service.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { type CreateServiceInput } from '../validations/service.validation.js';

// Org-scoped catalog create: resolve org from the authenticated user; never trust client-sent orgId.
// Body is validated in HTTP layer before this runs; category existence (if required) stays a separate concern.
const createServiceForOrgUser = async (userId: string, input: CreateServiceInput) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  // Repository owns the Prisma insert; service owns "this user has an org" (same 404 contract as profile).
  return insertService(org.id, input);
};

export { createServiceForOrgUser };
