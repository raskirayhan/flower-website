import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    serviceId: z.string().min(1, 'Service ID is required'),
    scheduledDate: z.string().datetime('Valid ISO date required for delivery/appointment'),
    deliveryAddress: z.string().min(5, 'Delivery address must be provided'),
    notes: z.string().optional(),
    addonIds: z.array(z.string()).optional(),
  }),
});

export const updateBookingStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'DISPATCHED', 'COMPLETED', 'CANCELLED']),
  }),
});
