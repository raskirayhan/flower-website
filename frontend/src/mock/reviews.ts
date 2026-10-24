import { CustomerReview } from '../types/index.js';

export const MOCK_REVIEWS: CustomerReview[] = [
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
