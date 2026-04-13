import { asyncHandler } from '../utils/asyncHandler.js';
import { register, login } from '../services/auth.service.js';
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

const loginUser = asyncHandler(async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const result = await login(email, password);
  
  return res.status(200).json(new ApiResponse(200, result, 'Login user successfully'));
});

export { registerUser, loginUser };
