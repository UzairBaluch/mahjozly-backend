import { asyncHandler } from '../utils/asyncHandler.js';
import { register } from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { type Request, type Response } from 'express';

// HTTP layer only: receives validated body, calls service, returns transport response.
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const result = await register({
    name,
    email,
    password,
    role,
  });

  // 201 Created for a new account.
  return res.status(201).json(new ApiResponse(201, result, 'User registered successfully'));
});

export { registerUser };
