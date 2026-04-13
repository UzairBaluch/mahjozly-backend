import { validate } from '../../middlewares/validate.middleware.js';
import { Router } from 'express';
import { registerSchema, loginSchema } from '../../validations/auth.validation.js';
import { registerUser, loginUser } from '../../controllers/auth.controller.js';

const authRouter = Router();

// POST /api/v1/auth/register -> validate request body first, then run controller.
authRouter.post('/register', validate(registerSchema), registerUser);
authRouter.post('/login', validate(loginSchema), loginUser);

export { authRouter };
