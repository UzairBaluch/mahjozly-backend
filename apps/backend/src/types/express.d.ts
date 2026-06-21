// Module augmentation — TypeScript merges this into Express so `req.id` is typed project-wide.
// Augments Express's Request where it is actually defined (@types/express-serve-static-core).
// Mount request-id middleware before any handler that reads `req.id`.
import type {} from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    id: string;
    user?: {
      id: string;
      role: string;
    };
  }
}