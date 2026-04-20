import { findCategoryById } from '../repositories/category.repository.js';
import { findOrganizationByUserId } from '../repositories/business.repository.js';
import {
  findServiceByIdAndOrgId,
  findServicesByOrgId,
  insertService,
} from '../repositories/service.repository.js';
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

// Org-scoped catalog list: same org resolution as create — ORG user with no `Organization` row → 404 (not empty list).
// Soft-deleted services are excluded in the repository (`deletedAt: null`); zero rows is valid — return `[]`.
const listServicesForOrgUser = async (userId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  return findServicesByOrgId(org.id);
};

// One org-owned service by id — second arg to the repo must be `org.id` (organization id), not `userId`.
const getServiceByIdForOrgUser = async (userId: string, serviceId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  const service = await findServiceByIdAndOrgId(serviceId, org.id);
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }
  return service;
};

export { createServiceForOrgUser, listServicesForOrgUser, getServiceByIdForOrgUser };
