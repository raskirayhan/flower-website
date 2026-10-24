import { PrismaClient, Role, BookingStatus, PaymentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting FixItNow Botanical Database Seeder...');

  // 1. Clean existing records in dependency order
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderBooking.deleteMany();
  await prisma.serviceAddon.deleteMany();
  await prisma.productService.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Existing records cleared.');

  // 2. Hash default passwords
  const passwordHash = await bcrypt.hash('FlowerUser2026!', 10);
  const adminPasswordHash = await bcrypt.hash('FlowerAdmin2026!', 10);
  const managerPasswordHash = await bcrypt.hash('FlowerManager2026!', 10);

  // 3. Seed Users & Profiles
  const user = await prisma.user.create({
    data: {
      email: 'user@flowermarket.shop',
      password: passwordHash,
      name: 'Sarah Jenkins',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: Role.USER,
      address: '742 Evergreen Terrace, Springfield, OR',
      profile: {
        create: {
          bio: 'Passionate urban gardener, orchid enthusiast, and sustainable living advocate.',
          preferences: 'Pet-safe plants, organic fertilizers, weekly flower club',
          loyaltyPoints: 340,
        },
      },
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@flowermarket.shop',
      password: adminPasswordHash,
      name: 'Elena Rostova',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: Role.ADMIN,
      address: '100 Botanical Way, Suite 400, San Francisco, CA',
      profile: {
        create: {
          bio: 'Chief Botanical Director & Greenhouse Operations Lead.',
          loyaltyPoints: 1200,
        },
      },
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@flowermarket.shop',
      password: managerPasswordHash,
      name: 'Marcus Vance',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: Role.MANAGER,
      address: '45 Nursery Lane, Sonoma Valley, CA',
      profile: {
        create: {
          bio: 'Greenhouse Logistics Manager & Inventory Coordinator.',
          loyaltyPoints: 850,
        },
      },
    },
  });

  console.log('✅ Demo users seeded: Customer User, Administrator, Store Manager.');

  // 4. Seed Categories
  const categoriesData = [
    { name: 'Fresh Bouquets', slug: 'fresh-bouquets', description: 'Handcrafted floral bouquets fresh from local valley farms.', icon: 'flower' },
    { name: 'Indoor Greens', slug: 'indoor-greens', description: 'Air-purifying houseplants with premium ceramic pots.', icon: 'leaf' },
    { name: 'Flowering Pots', slug: 'flowering-pots', description: 'Vibrant blooming perennial and annual potted arrangements.', icon: 'sun' },
    { name: 'Bonsai & Exotics', slug: 'bonsai-exotics', description: 'Carefully shaped heritage bonsai and rare botanical wonders.', icon: 'trees' },
    { name: 'Wedding Specials', slug: 'wedding-specials', description: 'Bespoke floral styling, arches, and bridal party arrangements.', icon: 'heart' },
    { name: 'Succulents & Cacti', slug: 'succulents-cacti', description: 'Resilient low-water desert flora and architectural succulents.', icon: 'shield' },
  ];

  const categories = await Promise.all(
    categoriesData.map((cat, idx) =>
      prisma.category.create({
        data: { ...cat, displayOrder: idx + 1 },
      })
    )
  );

  const catMap = new Map(categories.map((c) => [c.slug, c.id]));
  console.log(`✅ Seeded ${categories.length} botanical categories.`);

  // 5. Seed Services / Botanical Products
  const peaceLily = await prisma.productService.create({
    data: {
      title: 'Peace Lily Air Purifier',
      slug: 'peace-lily-air-purifier',
      scientificName: 'Spathiphyllum wallisii',
      description: 'Lush glossy foliage with elegant white spathes. NASA-certified natural air filtration powerhouse.',
      price: 38.0,
      originalPrice: 48.0,
      durationOrHeight: '45 - 55 cm',
      originLocation: 'Hawaiian Greenhouse',
      petFriendlyRating: 'Caution',
      stock: 42,
      rating: 4.9,
      reviewCount: 38,
      isFeatured: true,
      categoryId: catMap.get('indoor-greens')!,
      images: [
        'assets/peace-lily.jpg',
        'assets/sample-flower-image.png',
      ],
      addons: {
        create: [
          { name: 'Terracotta Self-Watering Planter', price: 12.0, description: 'Natural clay pot with capillary wick system' },
          { name: 'Organic Plant Food Spray (250ml)', price: 8.5, description: 'Seaweed extract micro-nutrient booster' },
        ],
      },
    },
  });

  const roses = await prisma.productService.create({
    data: {
      title: 'Velvet Ecuadorian Long-Stem Roses',
      slug: 'velvet-ecuadorian-roses',
      scientificName: 'Rosa damascena var. grandiflora',
      description: 'Two dozen deeply saturated crimson roses cultivated in volcanic Andean soil. Guaranteed 10-day vase life.',
      price: 54.0,
      originalPrice: 70.0,
      durationOrHeight: '60 cm stems',
      originLocation: 'Ecuadorian Andes',
      petFriendlyRating: '100% Pet-Safe',
      stock: 65,
      rating: 5.0,
      reviewCount: 52,
      isFeatured: true,
      categoryId: catMap.get('fresh-bouquets')!,
      images: [
        'assets/rose.jpg',
        'assets/deal-bloom.png',
      ],
      addons: {
        create: [
          { name: 'Handblown Fluted Glass Vase', price: 18.0, description: 'Artisanal clear fluted vessel' },
          { name: 'Artisan Floral Shears', price: 15.0, description: 'Stainless steel stem pruning snips' },
        ],
      },
    },
  });

  console.log('✅ Seeded featured botanical services and products.');

  // 6. Seed Order Bookings
  const booking1 = await prisma.orderBooking.create({
    data: {
      bookingCode: 'FM-2026-8901',
      customerId: user.id,
      serviceId: peaceLily.id,
      status: BookingStatus.DISPATCHED,
      scheduledDate: new Date('2026-10-25T14:00:00Z'),
      totalAmount: 38.0,
      deliveryAddress: '742 Evergreen Terrace, Springfield, OR',
      notes: 'Please leave on the front porch near the garden gate.',
      payment: {
        create: {
          stripePaymentIntentId: 'pi_test_30924729104',
          amount: 38.0,
          currency: 'USD',
          status: PaymentStatus.SUCCEEDED,
          method: 'card',
        },
      },
      review: {
        create: {
          serviceId: peaceLily.id,
          customerId: user.id,
          rating: 5,
          comment: 'Arrived in perfect condition with glossy leaves and three open white blooms! Outstanding packaging.',
          isVerifiedPurchase: true,
        },
      },
    },
  });

  console.log('✅ Seeded order bookings, payments, and verified reviews.');

  // 7. Seed Coupons
  await prisma.coupon.createMany({
    data: [
      { code: 'BLOOM15', discountPercent: 15, minOrderAmount: 30.0, maxUses: 500, isActive: true },
      { code: 'VIPGREEN25', discountPercent: 25, minOrderAmount: 75.0, maxUses: 200, isActive: true },
    ],
  });

  console.log('✅ Seeded promotional discount coupons.');

  // 8. Seed Audit Log
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'SYSTEM_SEED',
      details: 'Initial botanical marketplace database seed executed successfully.',
    },
  });

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
