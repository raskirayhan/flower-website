/**
 * Flower Market - Shared Product Catalog Data
 * Single Source of Truth for Listing and Details Pages
 */

const PRODUCTS_DATA = [
  {
    id: 'prod-1',
    name: 'White Peace Lily',
    category: 'indoor',
    categoryLabel: 'Air Purifying',
    scientificName: 'Spathiphyllum wallisii',
    price: 24,
    originalPrice: 30,
    rating: 4.9,
    reviewsCount: 64,
    dateAdded: 'Harvested Today',
    origin: 'Sonoma Valley Nursery',
    badge: 'Best Seller',
    badgeColor: 'primary',
    shortDescription: 'Lush indoor Spathiphyllum in artisanal terracotta pot, naturally purifying indoor air.',
    fullDescription: 'The White Peace Lily (Spathiphyllum wallisii) is a celebrated indoor botanical classic renowned for its deep emerald lance-shaped leaves and pristine white spathes. Grown organically in our Sonoma greenhouses, this resilient houseplant thrives in gentle indirect light and actively cleanses household air by filtering ambient toxins. Delivered potted in an artisanal porous terracotta vessel that ensures optimal root breathability.',
    images: [
      'assets/peace-lily.jpg',
      'assets/sample-flower-image.png',
      'assets/flower-store.png',
      'assets/hero-flower.png'
    ],
    specs: {
      height: '18 – 22 inches (45 – 55 cm)',
      potDiameter: '6.5 inches breathable terracotta',
      lightRequirement: 'Bright indirect light to moderate shade',
      wateringFrequency: 'Every 7 – 10 days; water when top inch dries',
      petSafety: 'Mildly toxic if ingested (keep away from curious cats)',
      bloomLongevity: 'Continuous blooms lasting 6 to 8 weeks',
      fragrance: 'Subtle sweet nocturnal fragrance',
      packaging: '100% compostable root wrapping with hydration pod'
    },
    reviews: [
      {
        author: 'Sophia Martinez',
        rating: 5,
        date: 'October 18, 2026',
        comment: 'Arrived in flawless condition with two unopened white spathes! It has already opened up beautifully on my living room bookshelf.',
        verified: true
      },
      {
        author: 'Marcus Vance',
        rating: 5,
        date: 'October 12, 2026',
        comment: 'Very easy to care for. The terracotta pot is heavy and feels handcrafted. Purifies the room and looks stunning.',
        verified: true
      },
      {
        author: 'Elena Rostova',
        rating: 4.8,
        date: 'October 04, 2026',
        comment: 'Packaged with extreme care—zero soil spilled during courier transit. Highly recommended florist!',
        verified: true
      }
    ],
    relatedIds: ['prod-5', 'prod-7', 'prod-4']
  },
  {
    id: 'prod-2',
    name: 'Crimson Velvet Rose',
    category: 'bouquets',
    categoryLabel: 'Fresh Cut',
    scientificName: 'Rosa damascena rubra',
    price: 35,
    originalPrice: 42,
    rating: 5.0,
    reviewsCount: 88,
    dateAdded: 'Cut Today 6:00 AM',
    origin: 'Ecuadorian Highlands',
    badge: 'Fresh Cut',
    badgeColor: 'secondary',
    shortDescription: 'Dozen long-stem Ecuadorian crimson roses paired with fresh silver dollar eucalyptus.',
    fullDescription: 'Cultivated in high-altitude volcanic soil along the Ecuadorian equator, our Crimson Velvet Roses boast unusually large flower heads with up to 45 velvety petals per bloom. Hand-harvested at dawn, conditioned in floral nourishment solution, and spiraled with fresh fragrant silver dollar eucalyptus and panicled baby\'s breath. Perfect for anniversaries, birthdays, or heartfelt romantic gestures.',
    images: [
      'assets/rose.jpg',
      'assets/deal-ana.png',
      'assets/hero-flower.png',
      'assets/sample-flower-image.png'
    ],
    specs: {
      height: '24-inch long stems (60 cm)',
      potDiameter: 'Arrangement wrapped in linen Kraft wrap',
      lightRequirement: 'Keep in cool room out of direct sunlight',
      wateringFrequency: 'Change vase water and trim stems every 2 days',
      petSafety: 'Non-toxic to cats and dogs (pet friendly)',
      bloomLongevity: 'Guaranteed fresh for 7 to 10 days in vase',
      fragrance: 'Deep classic damask rose aroma',
      packaging: 'Hydration stem bag with satin ribbon wrap'
    },
    reviews: [
      {
        author: 'David Chen',
        rating: 5,
        date: 'October 21, 2026',
        comment: 'Ordered for our 10th anniversary. My wife was in awe—the petals are so rich and velvety, and the scent filled our entire home.',
        verified: true
      },
      {
        author: 'Claire Gallagher',
        rating: 5,
        date: 'October 15, 2026',
        comment: 'The eucalyptus pairing elevates this beyond normal roses. Stood fresh in my vase for over 9 days without drooping!',
        verified: true
      }
    ],
    relatedIds: ['prod-4', 'prod-8', 'prod-3']
  },
  {
    id: 'prod-3',
    name: 'Sunburst Sunflower',
    category: 'bouquets',
    categoryLabel: 'Seasonal',
    scientificName: 'Helianthus annuus',
    price: 18,
    originalPrice: 22,
    rating: 4.8,
    reviewsCount: 52,
    dateAdded: 'Fresh Cut Yesterday',
    origin: 'California Coastal Farm',
    badge: 'Seasonal',
    badgeColor: 'tertiary',
    shortDescription: 'Golden field-cut sunflowers radiating positive energy and rustic cottage charm.',
    fullDescription: 'Sunburst Sunflowers are sunshine made tangible. Sourced directly from our organic coastal California family farms, each stem features heavy golden disc florets framed by radiant yellow ray petals. Naturally pollen-free to minimize allergies while maximizing vase life and cheerful radiance. Tied with natural jute twine.',
    images: [
      'assets/sunflower.jpg',
      'assets/hero-flower.png',
      'assets/deal-bloom.png',
      'assets/sample-flower-image.png'
    ],
    specs: {
      height: '20 inches (50 cm)',
      potDiameter: 'Hand-tied bouquet ready for medium vase',
      lightRequirement: 'Prefers well-lit room, avoid heat vents',
      wateringFrequency: 'Replace lukewarm vase water every 48 hours',
      petSafety: 'Completely pet-friendly and non-toxic',
      bloomLongevity: '7 to 12 days in fresh water',
      fragrance: 'Earthy, honeyed countryside scent',
      packaging: 'Biodegradable kraft paper and wet-pack wrap'
    },
    reviews: [
      {
        author: 'Hannah Miller',
        rating: 5,
        date: 'October 19, 2026',
        comment: 'Such cheerful, massive blooms! Sent these to a sick friend and they completely brightened her week.',
        verified: true
      },
      {
        author: 'Robert Lee',
        rating: 4.7,
        date: 'October 08, 2026',
        comment: 'Pollen-free claim is true—no yellow dust all over my kitchen table. Very pleased.',
        verified: true
      }
    ],
    relatedIds: ['prod-2', 'prod-8', 'prod-1']
  },
  {
    id: 'prod-4',
    name: 'Pink Lily Blossom',
    category: 'bouquets',
    categoryLabel: 'Fragrant',
    scientificName: 'Lilium orientalis',
    price: 22,
    originalPrice: 28,
    rating: 4.9,
    reviewsCount: 41,
    dateAdded: 'Fresh Harvest Today',
    origin: 'Holland Glasshouses',
    badge: 'Popular',
    badgeColor: 'primary',
    shortDescription: 'Fragrant Oriental stargazer lilies with delicate blush petals and graceful blooms.',
    fullDescription: 'Celebrated worldwide for their dramatic starry blossoms and sweet, intoxicating fragrance, our Oriental Pink Lilies arrive in tight bud form so you can enjoy the magic of each bloom unfurling day by day. Every stem displays 3 to 5 buds accented by Italian ruscus greenery.',
    images: [
      'assets/sample-flower-image.png',
      'assets/rose.jpg',
      'assets/hero-flower.png',
      'assets/deal-ana.png'
    ],
    specs: {
      height: '22 inches (55 cm)',
      potDiameter: 'Long stem cut arrangement',
      lightRequirement: 'Moderate indirect light',
      wateringFrequency: 'Top up water daily; remove anthers as blooms open',
      petSafety: 'Toxic to felines (do NOT purchase for cat owners)',
      bloomLongevity: 'Up to 14 days as buds open consecutively',
      fragrance: 'Strong, luxurious sweet perfume',
      packaging: 'Protective netted sleeves with floral preservation pouch'
    },
    reviews: [
      {
        author: 'Jessica Taylor',
        rating: 5,
        date: 'October 22, 2026',
        comment: 'Came with 4 tight buds that opened within 48 hours into gigantic pink stars. The fragrance is divine!',
        verified: true
      }
    ],
    relatedIds: ['prod-2', 'prod-1', 'prod-8']
  },
  {
    id: 'prod-5',
    name: 'Calathea Bloom Plant',
    category: 'indoor',
    categoryLabel: 'Pet Friendly',
    scientificName: 'Calathea orbifolia',
    price: 28,
    originalPrice: 35,
    rating: 4.7,
    reviewsCount: 39,
    dateAdded: 'Fresh Potted Oct 20',
    origin: 'Oahu Tropical Conservatory',
    badge: 'Eco Pick',
    badgeColor: 'secondary',
    shortDescription: 'Ornamental prayer plant with striking patterned leaves that fold gently at dusk.',
    fullDescription: 'The Calathea Orbifolia is a showstopper among tropical foliage. Featuring wide, silver-striped leaves that resemble hand-painted watercolors, this living sculpture practices nyctinasty—its leaves fold upwards like praying hands as night falls. Completely safe for cats and dogs.',
    images: [
      'assets/deal-bloom.png',
      'assets/peace-lily.jpg',
      'assets/deal-zabo.png',
      'assets/flower-store.png'
    ],
    specs: {
      height: '14 – 16 inches (35 – 40 cm)',
      potDiameter: '6-inch modern matte ceramic pot',
      lightRequirement: 'Medium to low indirect light; avoids direct sun',
      wateringFrequency: 'Keep soil evenly moist with filtered or rain water',
      petSafety: '100% Non-toxic & Pet Safe (ASPCA certified)',
      bloomLongevity: 'Evergreen perennial foliage year-round',
      fragrance: 'Clean, neutral tropical rainforest aroma',
      packaging: 'Secure plant cradle box with coconut coir insulation'
    },
    reviews: [
      {
        author: 'Amber Davies',
        rating: 5,
        date: 'October 17, 2026',
        comment: 'As a cat mom, finding safe, beautiful plants is hard. This calathea is stunning and my cat leaves it alone completely.',
        verified: true
      }
    ],
    relatedIds: ['prod-1', 'prod-7', 'prod-6']
  },
  {
    id: 'prod-6',
    name: 'Scarlet Anthurium Ana',
    category: 'flowering',
    categoryLabel: 'Long Lasting',
    scientificName: 'Anthurium andraeanum',
    price: 32,
    originalPrice: 38,
    rating: 4.9,
    reviewsCount: 73,
    dateAdded: 'Fresh Potted Oct 22',
    origin: 'Hawaii Volcanic Nursery',
    badge: 'Trending',
    badgeColor: 'primary',
    shortDescription: 'Heart-shaped fiery red spathes that bloom continuously for months in indirect light.',
    fullDescription: 'Known as the Painter’s Palette or Flamingo Flower, the Scarlet Anthurium is the world’s longest-blooming houseplant. Each heart-shaped waxy red spathe lasts up to eight weeks on the plant, while new buds emerge regularly from the glossy foliage.',
    images: [
      'assets/deal-ana.png',
      'assets/rose.jpg',
      'assets/deal-bloom.png',
      'assets/hero-flower.png'
    ],
    specs: {
      height: '16 – 20 inches (40 – 50 cm)',
      potDiameter: '6-inch geometric stoneware planter',
      lightRequirement: 'Bright indirect light for prolific continuous blooming',
      wateringFrequency: 'Water every 7 to 9 days when top half dries',
      petSafety: 'Contains calcium oxalate (keep out of reach of pets)',
      bloomLongevity: 'Individual flowers last 2+ months; repeats year-round',
      fragrance: 'Subtle, fresh botanical scent',
      packaging: 'Eco-padded air-vented protective container'
    },
    reviews: [
      {
        author: 'Brian Walker',
        rating: 5,
        date: 'October 14, 2026',
        comment: 'The scarlet color is so intense it almost looks fake until you touch it! Three weeks in and still looks brand new.',
        verified: true
      }
    ],
    relatedIds: ['prod-5', 'prod-1', 'prod-2']
  },
  {
    id: 'prod-7',
    name: 'Zabo Bonsai Ficus',
    category: 'indoor',
    categoryLabel: 'Architectural',
    scientificName: 'Ficus retusa microcarpa',
    price: 45,
    originalPrice: 55,
    rating: 5.0,
    reviewsCount: 94,
    dateAdded: 'Shaped Oct 15',
    origin: 'Kyoto Heritage Greenhouse',
    badge: 'Signature',
    badgeColor: 'tertiary',
    shortDescription: 'Sculptural miniature bonsai featuring aerial roots potted in glazed stoneware.',
    fullDescription: 'Our Zabo Bonsai Ficus is an exquisite living sculpture trained by master bonsai artisans over four years. Featuring stout banyan-style aerial roots and small, thick glossy green leaves, it brings calming Zen aesthetics to any executive desk, entryway, or meditation nook. Exceptionally forgiving and beginner-friendly.',
    images: [
      'assets/deal-zabo.png',
      'assets/flower-store.png',
      'assets/deal-bloom.png',
      'assets/peace-lily.jpg'
    ],
    specs: {
      height: '12 – 15 inches (30 – 38 cm)',
      potDiameter: '8-inch traditional glazed ceramic bonsai tray with saucer',
      lightRequirement: 'Bright indirect light; enjoys morning window sun',
      wateringFrequency: 'Immerse or drench when moss surface feels dry (approx. 5-7 days)',
      petSafety: 'Mildly irritating sap if chewed (keep elevated)',
      bloomLongevity: 'Lifelong architectural living companion',
      fragrance: 'Subtle forest earth notes',
      packaging: 'Wooden stabilizing base crate with humidity moss collar'
    },
    reviews: [
      {
        author: 'Liam O’Connor',
        rating: 5,
        date: 'October 20, 2026',
        comment: 'The craftsmanship on this bonsai is breathtaking. The aerial roots look like an ancient sacred banyan tree in miniature.',
        verified: true
      }
    ],
    relatedIds: ['prod-5', 'prod-1', 'prod-6']
  },
  {
    id: 'prod-8',
    name: 'Pastel Floral Harmony',
    category: 'flowering',
    categoryLabel: 'Centerpiece',
    scientificName: 'Arrangement botanica',
    price: 39,
    originalPrice: 48,
    rating: 4.8,
    reviewsCount: 45,
    dateAdded: 'Artisan Tied Today',
    origin: 'Flower Market Studio',
    badge: 'Chef Choice',
    badgeColor: 'secondary',
    shortDescription: 'Hand-tied arrangement of seasonal pastel garden blooms curated by master florists.',
    fullDescription: 'Pastel Floral Harmony is our signature seasonal centerpiece. Our head florists combine soft blush spray roses, powdery blue hydrangeas, cream lisianthus, and frosted lamb\'s ear foliage into a cascading romantic cluster. Includes an etched glass cylinder vase and a packet of natural flower food.',
    images: [
      'assets/hero-flower.png',
      'assets/sample-flower-image.png',
      'assets/rose.jpg',
      'assets/sunflower.jpg'
    ],
    specs: {
      height: '18 inches tall, 14 inches spread',
      potDiameter: 'Included hand-blown cylinder vase (8” x 4”)',
      lightRequirement: 'Keep away from ripening fruit and drafty windows',
      wateringFrequency: 'Refresh vase water daily with half packet of flower food',
      petSafety: 'Contains mixed stems (consult guide before purchase)',
      bloomLongevity: '7 to 10 days of vibrant elegance',
      fragrance: 'Harmonious bouquet of garden tea roses and sweet herbs',
      packaging: 'Gift box with silk ribbon and handwritten calligraphy note option'
    },
    reviews: [
      {
        author: 'Rachel Adams',
        rating: 5,
        date: 'October 23, 2026',
        comment: 'Received this for my birthday and it took my breath away. Even better in person than the photos!',
        verified: true
      }
    ],
    relatedIds: ['prod-2', 'prod-4', 'prod-3']
  }
];

// Helper to look up a product by ID
function getProductById(id) {
  return PRODUCTS_DATA.find(p => p.id === id) || null;
}
