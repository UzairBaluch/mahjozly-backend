import { prisma } from '../lib/database.js';

const findOrganizationByUserId = async (userId: string) => {
    return prisma.organization.findFirst({
        where: { userId, deletedAt: null },
    });
};

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
