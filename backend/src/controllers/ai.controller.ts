import { Request, Response, NextFunction } from 'express';

const KNOWLEDGE_RESPONSES = [
  {
    keywords: ['pet', 'cat', 'dog', 'toxic', 'safe'],
    reply:
      '🐾 Pet-Safety Recommendation: For households with cats or dogs, we strongly suggest our 100% ASPCA non-toxic varieties: Velvet Ecuadorian Roses, Golden Sunburst Sunflowers, or the Desert Jewels Succulent Bowl. Note: Peace lilies should be kept out of direct reach of pets.',
  },
  {
    keywords: ['care', 'water', 'sun', 'light', 'routine'],
    reply:
      '🌿 Botanical Care Advice: Indoor greens like the Peace Lily thrive in medium-to-low indirect light. Water only when the top 2 inches of soil feel dry (about once weekly). Snip yellowing lower leaves at a 45-degree angle to boost root energy.',
  },
  {
    keywords: ['delivery', 'time', 'fast', 'express', 'arrive', 'shipping'],
    reply:
      '🚚 Delivery & Logistics: Orders placed before 1:00 PM qualify for same-day greenhouse dispatch. Standard climate-controlled delivery takes 24 hours, packed in our 100% biodegradable hydration pods to guarantee 7-day bloom freshness.',
  },
  {
    keywords: ['gift', 'anniversary', 'wedding', 'budget', 'cheap'],
    reply:
      '🎁 Gift & Celebration Suggestions: Under $40: The Golden Sunburst Sunflower Bundle ($28) or Desert Jewels Succulent Bowl ($32) are vibrant crowd favorites. For romantic occasions, our Velvet Ecuadorian Roses ($54) include hand-tied luxury silk ribbon and custom calligraphy card.',
  },
];

export async function getAISuggestions(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const q = String(req.query.q || '').toLowerCase();

    const pool = [
      { text: 'Pet-safe indoor houseplants', intent: 'pet_safe', icon: 'paw' },
      { text: 'Long-stem Ecuadorian roses under $60', intent: 'budget_roses', icon: 'tag' },
      { text: 'Low-light bathroom plants (Peace Lily)', intent: 'low_light', icon: 'sun' },
      { text: 'Wedding bouquet styling & bridal party sets', intent: 'wedding', icon: 'heart' },
      { text: 'Drought-tolerant desk succulents & cacti', intent: 'succulents', icon: 'shield' },
      { text: 'Air-purifying NASA certified greens', intent: 'air_purifier', icon: 'leaf' },
    ];

    const matched = q
      ? pool.filter((item) => item.text.toLowerCase().includes(q))
      : pool.slice(0, 4);

    res.json({
      success: true,
      query: q,
      suggestions: matched,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleAIChatMessage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { message } = req.body;
    const lower = String(message || '').toLowerCase();

    let matched = KNOWLEDGE_RESPONSES.find((item) =>
      item.keywords.some((kw) => lower.includes(kw))
    );

    const reply = matched
      ? matched.reply
      : `🌱 Hello! I am Flora, your greenhouse AI assistant. I can guide you on plant care tips, pet-friendly choices, delivery tracking, or recommend the perfect botanical arrangement. How can I help you today?`;

    res.json({
      success: true,
      data: {
        reply,
        timestamp: new Date().toISOString(),
        confidence: matched ? 0.96 : 0.82,
        suggestedActions: [
          'Best pet-safe plants',
          'Care tips for roses',
          'Delivery times & policies',
          'Recommend a gift under $40',
        ],
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getAIDashboardInsights(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.json({
      success: true,
      data: {
        insights: [
          {
            type: 'inventory_alert',
            severity: 'warning',
            message: 'Peace Lily inventory (42 units) is projected to deplete in 48h based on weekend demand surge.',
            recommendation: 'Trigger reorder of 50 units from Hawaiian Greenhouse.',
          },
          {
            type: 'growth_opportunity',
            severity: 'info',
            message: 'Bridal peony bouquet conversions are up +28% following seasonal wedding promos.',
            recommendation: 'Increase featured banner exposure on the home page.',
          },
          {
            type: 'anomaly_detected',
            severity: 'positive',
            message: 'Customer satisfaction score reached 4.95/5 stars with zero transit damage reports.',
            recommendation: 'Maintain current biodegradable hydration pod packaging protocol.',
          },
        ],
      },
    });
  } catch (error) {
    next(error);
  }
}
