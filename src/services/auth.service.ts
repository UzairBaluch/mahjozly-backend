// Auth business logic: hashing, duplicate rules, orchestrating repositories. No Express/req/res here.
import { findByEmail, createUser } from '../repositories/auth.repository.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import { type RegisterInput } from '../validations/auth.validation.js';

// Create account after body has been validated (Zod). Caller should not send password back to the client.
const register = async (input: RegisterInput) => {
  const existedUser = await findByEmail(input.email);
  if (existedUser) {
    throw new ApiError(409, 'Email already in use');
  }
  // Cost factor 10 is a common default; plain password exists only in memory here.
  const hashedPassword = await bcrypt.hash(input.password, 10);
  const registeredUser = await createUser({
    name: input.name,
    email: input.email,
    role: input.role,
    hashedPassword,
  });
  // Prisma returns `password` (hash); strip it before the controller serializes the response.
  const { password: _, ...userWithoutPassword } = registeredUser;
  return userWithoutPassword;
};

export { register };
