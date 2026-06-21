import { ApiError } from '../utils/ApiError.js';
import { type RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded as { id: string; role: string };
    next();
  } catch {
    next(new ApiError(401, 'Unauthorized request'));
  }
};
export { authenticate };
