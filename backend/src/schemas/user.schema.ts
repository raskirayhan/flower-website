import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
    preferences: z.string().optional(),
    notificationEmail: z.boolean().optional(),
    notificationSms: z.boolean().optional(),
  }),
});
