import { Router } from 'express';
import { register, login, demoLogin, getMe } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authLimiter } from '../middlewares/rateLimiter.middleware.js';
import { registerSchema, loginSchema, demoLoginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/demo-login', validate(demoLoginSchema), demoLogin);
router.get('/me', authenticate, getMe);

export default router;
