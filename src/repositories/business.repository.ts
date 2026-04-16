import { prisma } from '../lib/database.js';

// DB lookup for the org owned by a specific authenticated user.
const findOrganizationByUserId = async (userId: string) => {
  return prisma.organization.findFirst({
    where: { userId, deletedAt: null },
  });
};

// DB update for profile fields only; business/permission checks stay in service layer.
const updateOrganizationByUserId = async (
  userId: string,
  data: {
    name: string;
    location: string;
    phone: string;
    email: string;
    logo: string | null;
    description: string | null;
  },
) => {
  return prisma.organization.update({
    where: { userId },
    data: data,
  });
};

export { findOrganizationByUserId, updateOrganizationByUserId };
