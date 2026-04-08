import { type Request, type Response, type NextFunction } from 'express';
import { type RequestHandler } from 'express';

// Wrap async controllers so rejected promises are forwarded to Express error middleware via next(err).
// This removes repeated try/catch blocks from each controller.
const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Promise.resolve handles both sync throws and async rejections.
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
  };
};
export { asyncHandler };
