import { type Request, type Response, type NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const existing = req.get('x-request-id')?.trim();
  const id = existing && existing.length > 0 ? existing : randomUUID();

  req.id = id;
  res.setHeader('X-Request-ID', id);
  next();
};

export { requestId };
