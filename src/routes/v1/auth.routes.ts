import { validate } from '../../middlewares/validate.middleware.js';
import { Router, type Request, type Response } from 'express';
import { registerSchema, loginSchema } from '../../validations/auth.validation.js';
import { registerUser, loginUser } from '../../controllers/auth.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const authRouter = Router();

// POST /api/v1/auth/register -> validate request body first, then run controller.
authRouter.post('/register', validate(registerSchema), registerUser);
authRouter.post('/login', validate(loginSchema), loginUser);

// Current user from JWT — same handler for `/me` and `/profile` (client-friendly alias).
// TODO(auth): Keep both paths in sync on purpose for now. If product needs different
// payloads or behavior per path, add separate handlers — do not extend only one route.
const sendAuthUser = async (req: Request, res: Response) => {
  res.send(req.user);
};
authRouter.get('/me', authenticate, sendAuthUser);
authRouter.get('/profile', authenticate, sendAuthUser);

export { authRouter };
