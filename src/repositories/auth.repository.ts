// Auth-related DB access only — no hashing, JWT, or HTTP. Services call these functions.
import { prisma } from '../lib/database.js';
import { type RegisterInput } from '../validations/auth.validation.js';

// Returns the user row if that email exists, otherwise null. Used before register (duplicate check) and on login.
const findByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

// Inserts a new user. `hashedPassword` must already be hashed in the service; we map it to the `password` column.
const createUser = async ({
  name,
  email,
  hashedPassword,
  role,
}: {
  name: string;
  email: string;
  hashedPassword: string;
  // Same allowed values as Zod register schema / Prisma Role enum.
  role: RegisterInput['role'];
}) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
};

export { findByEmail, createUser };
