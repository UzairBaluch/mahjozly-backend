import {
  findOrganizationByUserId,
  updateOrganizationByUserId,
} from '../repositories/business.repository.js';
import { ApiError } from '../utils/ApiError.js';

// Business layer: enforce "org must exist" rule before returning/updating profile.
const getBusinessProfileService = async (userId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  return org;
};

const updateBusinessProfileService = async (
  userId: string,
  input: {
    name: string;
    location: string;
    phone: string;
    email: string;
    logo: string | null;
    description: string | null;
  },
) => {
  // Re-check existence so update returns a domain-level 404 instead of raw DB errors.
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  // Repository performs the actual DB write; service owns the "must exist first" rule.
  const updatedOrg = await updateOrganizationByUserId(userId, input);

  return updatedOrg;
};
export { getBusinessProfileService, updateBusinessProfileService };
