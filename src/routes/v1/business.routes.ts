import { authenticate } from '../../middlewares/auth.middleware.js';
import { Router } from 'express';

const businessRouter = Router();

businessRouter.get('/profile', authenticate /* controller-left */);
businessRouter.patch('/profile', authenticate /* controller-left */);

export { businessRouter };
