import { findCategoryById } from '../repositories/category.repository.js';
import { findOrganizationByUserId } from '../repositories/business.repository.js';
import { insertService } from '../repositories/service.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { type CreateServiceInput } from '../validations/service.validation.js';

// Org-scoped catalog create: resolve org from the authenticated user; never trust client-sent orgId.
// Request body shape is validated on the route; this layer enforces org + category before any insert.
const createServiceForOrgUser = async (userId: string, input: CreateServiceInput) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  // Category is global (seeded); missing id is a client mistake — 404, not a silent FK failure from Prisma.
  const category = await findCategoryById(input.categoryId);
  if (category === null) {
    throw new ApiError(404, 'No category found');
  }
  // Repository owns the Prisma insert; service owns org + category rules.
  return insertService(org.id, input);
};

export { createServiceForOrgUser };
