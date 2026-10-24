import { Router } from 'express';
import { updateProfile, getDashboardStats } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateProfileSchema } from '../schemas/user.schema.js';

const router = Router();

router.put('/profile', authenticate, validate(updateProfileSchema), updateProfile);
router.get('/dashboard-stats', authenticate, getDashboardStats);

export default router;
