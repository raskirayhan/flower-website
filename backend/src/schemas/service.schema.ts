import { z } from 'zod';

export const serviceQuerySchema = z.object({
  query: z.object({
    q: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
    maxPrice: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
    rating: z.string().optional().transform((v) => (v ? parseFloat(v) : undefined)),
    location: z.string().optional(),
    petFriendly: z.string().optional(),
    sort: z
      .enum(['featured', 'price_asc', 'price_desc', 'rating_desc', 'newest'])
      .default('featured'),
    page: z.string().default('1').transform((v) => parseInt(v, 10)),
    limit: z.string().default('8').transform((v) => parseInt(v, 10)),
  }),
});

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    slug: z.string().min(3),
    scientificName: z.string().optional(),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().positive('Price must be greater than 0'),
    originalPrice: z.number().positive().optional(),
    durationOrHeight: z.string().optional(),
    originLocation: z.string().optional(),
    petFriendlyRating: z.string().default('Caution'),
    stock: z.number().int().nonnegative().default(50),
    categoryId: z.string().uuid('Invalid category ID'),
    images: z.array(z.string()).min(1, 'At least one image is required'),
    isFeatured: z.boolean().default(false),
  }),
});
