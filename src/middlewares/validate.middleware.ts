// Generic body validator for routes that use Zod schemas.
import { type RequestHandler } from 'express';
import { type ZodSchema } from 'zod';

const validate = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    // parse() throws ZodError on invalid input; global error middleware formats the response.
    req.body = schema.parse(req.body);
    next();
  };
};

export { validate };
