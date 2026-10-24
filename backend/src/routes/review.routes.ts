import { Router } from 'express';
import { listReviews, createReview } from '../controllers/review.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { createReviewSchema } from '../schemas/review.schema.js';

const router = Router();

router.get('/', listReviews);
router.post('/', authenticate, validate(createReviewSchema), createReview);

export default router;
