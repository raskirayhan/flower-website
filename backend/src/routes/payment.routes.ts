import { Router } from 'express';
import {
  createPaymentIntentHandler,
  applyCouponHandler,
} from '../controllers/payment.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  createPaymentIntentSchema,
  applyCouponSchema,
} from '../schemas/payment.schema.js';

const router = Router();

router.post('/create-intent', authenticate, validate(createPaymentIntentSchema), createPaymentIntentHandler);
router.post('/apply-coupon', validate(applyCouponSchema), applyCouponHandler);

export default router;
