// Zod validator for inbound request data — GET reads `query`, everything else reads `body`.
import { type RequestHandler } from 'express';
import { type ZodSchema } from 'zod';

const validate = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    // parse() throws ZodError on invalid input; global error middleware formats the response.
    const raw = req.method === 'GET' || req.method === 'HEAD' ? req.query : req.body;
    const parsed = schema.parse(raw);
    if (req.method === 'GET' || req.method === 'HEAD') {
      req.query = parsed as typeof req.query;
    } else {
      req.body = parsed;
    }
    next();
  };
};

export { validate };
