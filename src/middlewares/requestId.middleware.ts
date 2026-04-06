import { type Request, type Response, type NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

// Correlates all logs and support tickets for a single HTTP exchange. Proxies may already send X-Request-ID — reuse it so traces span services.
const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const existing = req.get('x-request-id')?.trim();
  const id = existing && existing.length > 0 ? existing : randomUUID();

  req.id = id;
  // Lets clients echo the same id in bug reports and ties frontend errors to backend logs.
  res.setHeader('X-Request-ID', id);
  next();
};

export { requestId };
