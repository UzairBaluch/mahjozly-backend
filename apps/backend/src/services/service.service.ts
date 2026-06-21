import { findCategoryById } from '../repositories/category.repository.js';
import { findOrganizationByUserId } from '../repositories/business.repository.js';
import {
  findServiceByIdAndOrgId,
  findServicesByOrgId,
  updateServiceByIdAndOrgId,
  softDeleteServiceByIdAndOrgId,
  insertService,
} from '../repositories/service.repository.js';
import { ApiError } from '../utils/ApiError.js';
import {
  type CreateServiceInput,
  type UpdateServiceInput,
} from '../validations/service.validation.js';

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

// Update one org-owned service by id; validates optional category and maps no-match updates to 404.
const updateServiceByIdForOrgUser = async (
  userId: string,
  serviceId: string,
  input: UpdateServiceInput,
) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }

  if (input.categoryId) {
    const category = await findCategoryById(input.categoryId);
    if (category === null) {
      throw new ApiError(404, 'No category found');
    }
  }
  const data = {
    ...(input.name !== undefined ? { name: input.name } : {}),
    ...(input.categoryId !== undefined ? { categoryId: input.categoryId } : {}),
    ...(input.price !== undefined ? { price: input.price } : {}),
    ...(input.description !== undefined ? { description: input.description } : {}),
    ...(input.duration !== undefined ? { duration: input.duration } : {}),
    ...(input.maxPerSlot !== undefined ? { maxPerSlot: input.maxPerSlot } : {}),
    ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
  };
  const updated = await updateServiceByIdAndOrgId(serviceId, org.id, data);
  if (updated.count === 0) {
    throw new ApiError(404, 'Service not found');
  }
  return updated;
};

// Soft-delete one org-owned service by id; maps no-match delete result to a 404 domain error.
const softDeleteServiceByIdForOrgUser = async (userId: string, serviceId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  const deleted = await softDeleteServiceByIdAndOrgId(serviceId, org.id);
  if (deleted.count === 0) {
    throw new ApiError(404, 'Service not found');
  }
  return deleted;
};

export {
  createServiceForOrgUser,
  listServicesForOrgUser,
  getServiceByIdForOrgUser,
  updateServiceByIdForOrgUser,
  softDeleteServiceByIdForOrgUser,
};
