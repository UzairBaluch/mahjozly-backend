// Auth-related DB access only — no hashing, JWT, or HTTP. Services call these functions.
import { prisma } from '../lib/database.js';
import { type RegisterInput } from '../validations/auth.validation.js';

// Returns the user row if that email exists and not soft-deleted, otherwise null.
const findByEmail = async (email: string) => {
  return prisma.user.findFirst({
    where: { email, deletedAt: null },
  });
};

// Returns the user row by id if not soft-deleted, otherwise null.
const findUserById = async (id: string) => {
  return prisma.user.findFirst({
    where: { id, deletedAt: null },
  });
};

// Single transaction: user row + Organization for ORG (avoids user without org if org create fails).
const createUserWithOrgIfOrgRole = async ({
  name,
  email,
  hashedPassword,
  role,
}: {
  name: string;
  email: string;
  hashedPassword: string;
  role: RegisterInput['role'];
}) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    if (role === 'ORG') {
      await tx.organization.create({
        data: {
          userId: user.id,
          name,
          location: 'Pending setup',
        },
      });
    }
    return user;
  });
};

export { findByEmail, findUserById, createUserWithOrgIfOrgRole };
