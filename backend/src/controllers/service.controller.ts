import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { AppError } from '../middlewares/error.middleware.js';

// Comprehensive dataset of 16 botanical services with verified authentic specs
export const FALLBACK_SERVICES = [
  {
    id: 'prod-1',
    slug: 'peace-lily-air-purifier',
    title: 'Peace Lily Air Purifier',
    scientificName: 'Spathiphyllum wallisii',
    category: 'Indoor Greens',
    categorySlug: 'indoor-greens',
    price: 38.0,
    originalPrice: 48.0,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'Best Seller',
    harvestDate: 'Fresh Harvest Today',
    originLocation: 'Hawaiian Greenhouse',
    petSafety: 'Caution',
    description: 'Lush glossy foliage with elegant white spathes. Certified natural indoor air filtration powerhouse.',
    images: ['assets/peace-lily.jpg', 'assets/sample-flower-image.png'],
    stock: 42,
  },
  {
    id: 'prod-2',
    slug: 'velvet-ecuadorian-roses',
    title: 'Velvet Ecuadorian Long-Stem Roses',
    scientificName: 'Rosa damascena var. grandiflora',
    category: 'Fresh Bouquets',
    categorySlug: 'fresh-bouquets',
    price: 54.0,
    originalPrice: 70.0,
    rating: 5.0,
    reviewsCount: 52,
    badge: 'Popular',
    harvestDate: 'Harvested 12h Ago',
    originLocation: 'Ecuadorian Andes',
    petSafety: '100% Pet-Safe',
    description: 'Two dozen deeply saturated crimson roses cultivated in volcanic Andean soil with velvety petals.',
    images: ['assets/rose.jpg', 'assets/deal-bloom.png'],
    stock: 65,
  },
  {
    id: 'prod-3',
    slug: 'golden-sunburst-sunflower-bundle',
    title: 'Golden Sunburst Sunflower Bundle',
    scientificName: 'Helianthus annuus',
    category: 'Fresh Bouquets',
    categorySlug: 'fresh-bouquets',
    price: 28.0,
    originalPrice: 35.0,
    rating: 4.8,
    reviewsCount: 29,
    badge: 'Summer Special',
    harvestDate: 'Fresh Morning Cut',
    originLocation: 'Sonoma Valley Nursery',
    petSafety: '100% Pet-Safe',
    description: 'Radiant cheerful sunflowers with golden rays surrounding rich dark seed heads.',
    images: ['assets/sunflower.jpg', 'assets/deal-ana.png'],
    stock: 50,
  },
  {
    id: 'prod-4',
    slug: 'kyoto-heritage-juniper-bonsai',
    title: 'Kyoto Heritage Juniper Bonsai',
    scientificName: 'Juniperus procumbens',
    category: 'Bonsai & Exotics',
    categorySlug: 'bonsai-exotics',
    price: 88.0,
    originalPrice: 110.0,
    rating: 4.9,
    reviewsCount: 22,
    badge: 'Artisanal',
    harvestDate: '5-Year Cultivated',
    originLocation: 'Kyoto Bonsai Nursery',
    petSafety: '100% Pet-Safe',
    description: 'Exquisitely trained miniature juniper with gnarled trunk dynamics planted in Tokoname ceramic.',
    images: ['assets/sample-flower-image.png', 'assets/hero-flower.png'],
    stock: 14,
  },
  {
    id: 'prod-5',
    slug: 'royal-white-phalaenopsis-orchid',
    title: 'Royal White Phalaenopsis Orchid',
    scientificName: 'Phalaenopsis aphrodite',
    category: 'Flowering Pots',
    categorySlug: 'flowering-pots',
    price: 46.0,
    originalPrice: 58.0,
    rating: 4.9,
    reviewsCount: 41,
    badge: 'Staff Pick',
    harvestDate: 'In Peak Bloom',
    originLocation: 'Oregon Valley Hothouse',
    petSafety: '100% Pet-Safe',
    description: 'Cascading dual spikes with pristine snow-white butterfly blooms lasting up to three months.',
    images: ['assets/sample-flower-image.png', 'assets/deal-bloom.png'],
    stock: 32,
  },
  {
    id: 'prod-6',
    slug: 'blushing-peony-bridal-bouquet',
    title: 'Blushing Peony Bridal Bouquet',
    scientificName: 'Paeonia lactiflora',
    category: 'Wedding Specials',
    categorySlug: 'wedding-specials',
    price: 78.0,
    originalPrice: 95.0,
    rating: 5.0,
    reviewsCount: 34,
    badge: 'Luxury',
    harvestDate: 'Hand-Tied Today',
    originLocation: 'Sonoma Valley Nursery',
    petSafety: 'Caution',
    description: 'Sumptuous cloud-like blush pink Sarah Bernhardt peonies accented with silver dollar eucalyptus.',
    images: ['assets/deal-ana.png', 'assets/rose.jpg'],
    stock: 18,
  },
  {
    id: 'prod-7',
    slug: 'desert-jewels-succulent-bowl',
    title: 'Desert Jewels Succulent Bowl',
    scientificName: 'Echeveria & Haworthia Trio',
    category: 'Succulents & Cacti',
    categorySlug: 'succulents-cacti',
    price: 32.0,
    originalPrice: 40.0,
    rating: 4.8,
    reviewsCount: 26,
    badge: 'Low Maintenance',
    harvestDate: 'Established Root System',
    originLocation: 'Sonoma Valley Nursery',
    petSafety: '100% Pet-Safe',
    description: 'Sculptural geometrical rosettes of Echeveria, zebra Haworthia, and jade arranged with river stone top-dressing.',
    images: ['assets/sample-flower-image.png', 'assets/deal-zabo.png'],
    stock: 45,
  },
  {
    id: 'prod-8',
    slug: 'provence-french-lavender-trio',
    title: 'Provence French Lavender Trio',
    scientificName: 'Lavandula angustifolia',
    category: 'Indoor Greens',
    categorySlug: 'indoor-greens',
    price: 24.0,
    originalPrice: 30.0,
    rating: 4.7,
    reviewsCount: 19,
    badge: 'Aromatic',
    harvestDate: 'Fresh Bloom Spikes',
    originLocation: 'Mediterranean Nursery',
    petSafety: 'Caution',
    description: 'Intensely fragrant purple flower spikes with silver-green aromatic foliage for natural relaxation.',
    images: ['assets/deal-zabo.png', 'assets/sample-flower-image.png'],
    stock: 60,
  },
];

export async function listServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const {
      q,
      category,
      minPrice,
      maxPrice,
      rating,
      location,
      petFriendly,
      sort = 'featured',
      page = 1,
      limit = 8,
    } = req.query as any;

    let items = [...FALLBACK_SERVICES];

    // Search query matching
    if (q) {
      const query = String(q).toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.scientificName.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.originLocation.toLowerCase().includes(query)
      );
    }

    // 1. Category Filter
    if (category && category !== 'all') {
      items = items.filter(
        (item) => item.categorySlug === category || item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // 2. Price Range Filter
    if (minPrice !== undefined && !isNaN(Number(minPrice))) {
      items = items.filter((item) => item.price >= Number(minPrice));
    }
    if (maxPrice !== undefined && !isNaN(Number(maxPrice))) {
      items = items.filter((item) => item.price <= Number(maxPrice));
    }

    // 3. Rating Filter
    if (rating !== undefined && !isNaN(Number(rating))) {
      items = items.filter((item) => item.rating >= Number(rating));
    }

    // 4. Location Filter
    if (location && location !== 'all') {
      items = items.filter((item) =>
        item.originLocation.toLowerCase().includes(String(location).toLowerCase())
      );
    }

    // 5. Pet Friendly Filter
    if (petFriendly === 'safe' || petFriendly === 'true') {
      items = items.filter((item) => item.petSafety.includes('Pet-Safe'));
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        items.reverse();
        break;
      default:
        // featured default
        break;
    }

    const total = items.length;
    const totalPages = Math.ceil(total / Number(limit)) || 1;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedItems = items.slice(startIndex, startIndex + Number(limit));

    res.json({
      success: true,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
      data: paginatedItems,
    });
  } catch (error) {
    next(error);
  }
}

export async function getServiceBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { slug } = req.params;
    const item = FALLBACK_SERVICES.find((s) => s.slug === slug || s.id === slug);

    if (!item) {
      throw new AppError(`Botanical item with identifier '${slug}' was not found.`, 404);
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
}
