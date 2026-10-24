import { z } from 'zod';

export const createPaymentIntentSchema = z.object({
  body: z.object({
    bookingId: z.string().min(1, 'Booking ID is required'),
    paymentMethod: z.enum(['card', 'apple_pay', 'google_pay']).default('card'),
  }),
});

export const applyCouponSchema = z.object({
  body: z.object({
    code: z.string().min(2, 'Coupon code is required'),
    orderAmount: z.number().positive(),
  }),
});
