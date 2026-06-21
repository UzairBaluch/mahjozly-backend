import { type Prisma } from '@prisma/client';
import {
  findOrganizationByUserId,
  updateOrganizationByUserId,
} from '../repositories/business.repository.js';
import { uploadBase64Image } from '../lib/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';
import { type UpdateBusinessProfileInput, type UploadOrgLogoInput } from '../validations/business.validation.js';

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

// Upload org logo image to Cloudinary, then persist `Organization.logo` as the HTTPS URL string.
const uploadOrgLogoService = async (userId: string, input: UploadOrgLogoInput) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }

  try {
    const uploaded = await uploadBase64Image(input.imageBase64, {
      folder: 'mahjozly/org-logos',
      publicId: `org_${org.id}_${Date.now()}`,
    });
    return updateOrganizationByUserId(userId, { logo: uploaded.secureUrl });
  } catch {
    throw new ApiError(502, 'Logo upload failed');
  }
};

export { getBusinessProfileService, updateBusinessProfileService, uploadOrgLogoService };
