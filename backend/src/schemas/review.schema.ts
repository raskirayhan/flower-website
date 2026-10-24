import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    serviceId: z.string().min(1, 'Service ID is required'),
    rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5 stars'),
    comment: z.string().min(10, 'Review comment must be at least 10 characters'),
  }),
});
