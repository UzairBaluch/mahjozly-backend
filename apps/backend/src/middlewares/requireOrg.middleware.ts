// Runs after `authenticate` — business routes are for ORG accounts only; USER tokens get 403.
import { type Request, type Response, type NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

const requireOrg = (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user;
  if (user?.role !== 'ORG') {
    throw new ApiError(403, 'Forbidden');
  }
  next();
};
export { requireOrg };
