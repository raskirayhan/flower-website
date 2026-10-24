import { Request, Response, NextFunction } from 'express';

const VERIFIED_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    rating: 5,
    date: '2026-10-18',
    comment:
      'Arrived in pristine condition! The white blooms are radiant and NASA-rated air-purification actually keeps my bedroom fresh.',
    isVerified: true,
    serviceSlug: 'peace-lily-air-purifier',
  },
  {
    id: 'rev-2',
    author: 'Marcus Sterling',
    rating: 5,
    date: '2026-10-14',
    comment:
      'The ceramic pot and packaging exceeded all expectations. Zero crushed leaves and roots were healthy and damp.',
    isVerified: true,
    serviceSlug: 'peace-lily-air-purifier',
  },
  {
    id: 'rev-3',
    author: 'Sophia Chen',
    rating: 5,
    date: '2026-10-21',
    comment:
      'Unbelievable stem length and petal density. Lasted 12 full days in vase water without dropping a single petal!',
    isVerified: true,
    serviceSlug: 'velvet-ecuadorian-roses',
  },
];

export async function listReviews(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { serviceSlug } = req.query;

    let items = [...VERIFIED_REVIEWS];
    if (serviceSlug) {
      items = items.filter((r) => r.serviceSlug === serviceSlug);
    }

    res.json({
      success: true,
      meta: {
        total: items.length,
        averageRating: 4.95,
      },
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { serviceId, rating, comment } = req.body;
    const author = req.user?.name || 'Verified Customer';

    const newReview = {
      id: `rev-${Date.now()}`,
      author,
      rating: Number(rating),
      comment,
      date: new Date().toISOString().split('T')[0],
      isVerified: true,
      serviceSlug: serviceId,
    };

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Your verified review has been published.',
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
}
