import { Router } from 'express';
import {
  createBooking,
  getMyBookings,
  updateBookingStatus,
} from '../controllers/booking.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  createBookingSchema,
  updateBookingStatusSchema,
} from '../schemas/booking.schema.js';

const router = Router();

router.post('/', authenticate, validate(createBookingSchema), createBooking);
router.get('/my', authenticate, getMyBookings);
router.patch('/:id/status', authenticate, validate(updateBookingStatusSchema), updateBookingStatus);

export default router;
