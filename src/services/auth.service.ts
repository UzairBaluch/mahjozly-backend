// Auth business logic: hashing, duplicate rules, orchestrating repositories. No Express/req/res here.
import { findByEmail, createUser } from '../repositories/auth.repository.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import { type RegisterInput } from '../validations/auth.validation.js';
import * as jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

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

// Issue JWT after validated credentials. Same error text for unknown email vs wrong password to avoid account enumeration.
const login = async (email: string, password: string) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (comparePassword === false) {
    throw new ApiError(401, 'Invalid credentials');
  }
  // Payload stays small; middleware can reload user from DB if you need fresh fields. expiresIn must match env enum in config/env.ts.
  const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
  const { password: _, ...userWithoutPassword } = user;
  return { userWithoutPassword, token };
};

export { register, login };
