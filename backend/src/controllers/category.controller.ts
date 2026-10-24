import { Request, Response, NextFunction } from 'express';

export const BOTANICAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Fresh Bouquets',
    slug: 'fresh-bouquets',
    description: 'Artisanal hand-tied seasonal floral arrangements cut daily.',
    count: 24,
    icon: 'flower',
    image: 'assets/rose.jpg',
  },
  {
    id: 'cat-2',
    name: 'Indoor Greens',
    slug: 'indoor-greens',
    description: 'NASA-certified air-purifying houseplants in ceramic planters.',
    count: 36,
    icon: 'leaf',
    image: 'assets/peace-lily.jpg',
  },
  {
    id: 'cat-3',
    name: 'Flowering Pots',
    slug: 'flowering-pots',
    description: 'Long-lasting blooming orchids, hydrangeas, and perennials.',
    count: 18,
    icon: 'sun',
    image: 'assets/sample-flower-image.png',
  },
  {
    id: 'cat-4',
    name: 'Bonsai & Exotics',
    slug: 'bonsai-exotics',
    description: 'Heritage miniature trees and rare curated botanical specimens.',
    count: 12,
    icon: 'trees',
    image: 'assets/hero-flower.png',
  },
  {
    id: 'cat-5',
    name: 'Wedding Specials',
    slug: 'wedding-specials',
    description: 'Luxury bridal bouquets, centerpieces, and celebration styling.',
    count: 15,
    icon: 'heart',
    image: 'assets/deal-ana.png',
  },
  {
    id: 'cat-6',
    name: 'Succulents & Cacti',
    slug: 'succulents-cacti',
    description: 'Sculptural drought-tolerant desk succulents and geometric arrangements.',
    count: 28,
    icon: 'shield',
    image: 'assets/deal-zabo.png',
  },
];

export async function listCategories(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.json({
      success: true,
      data: BOTANICAL_CATEGORIES,
    });
  } catch (error) {
    next(error);
  }
}
