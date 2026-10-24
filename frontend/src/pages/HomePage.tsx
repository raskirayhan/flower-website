import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_SERVICES } from '../mock/services.js';
import { MOCK_CATEGORIES } from '../mock/categories.js';
import { Button } from '../components/ui/Button.js';
import { Card } from '../components/ui/Card.js';
import { Badge } from '../components/ui/Badge.js';
import { Skeleton } from '../components/ui/Skeleton.js';
import { formatCurrency } from '../lib/utils.js';

export const HomePage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const heroSlides = [
    {
      title: 'Always Fresh Flowers for You',
      subtitle: 'Hand-picked from certified sustainable Sonoma Valley and Andean highland nurseries.',
      cta: 'Explore Daily Stems',
      tag: '🌸 Spring Collection',
      image: 'assets/hero-flower.png',
    },
    {
      title: 'Breathe Life with Indoor Greens',
      subtitle: 'NASA-rated air-purifying houseplants with artisan terracotta self-watering planters.',
      cta: 'Browse Houseplants',
      tag: '🌿 Clean Air Living',
      image: 'assets/peace-lily.jpg',
    },
    {
      title: 'Velvet Long-Stem Ecuadorian Roses',
      subtitle: 'Cultivated in mineral-rich volcanic soil for extraordinary 12-day vase longevity.',
      cta: 'Order Luxury Roses',
      tag: '🌹 Signature Roses',
      image: 'assets/rose.jpg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingCatalog(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterLoading(true);
    setTimeout(() => {
      setNewsletterLoading(false);
      setNewsletterSuccess(true);
    }, 1000);
  };

  const filteredItems = selectedCategory === 'all'
    ? MOCK_SERVICES.slice(0, 8)
    : MOCK_SERVICES.filter(s => s.categorySlug === selectedCategory).slice(0, 8);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION (60-70% Viewport Height) */}
      <section className="relative w-full h-[65vh] min-h-[500px] max-h-[700px] bg-slate-900 text-white overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${
              activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute right-0 w-full md:w-2/3 h-full object-cover opacity-60 md:opacity-80"
            />
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl flex flex-col items-start gap-4 animate-fade-in">
                <Badge variant="primary" className="text-xs uppercase tracking-widest font-bold">
                  {slide.tag}
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link to="/explore">
                    <Button variant="primary" size="lg">
                      {slide.cta} →
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="text-white border-white/40 hover:bg-white/10">
                      Our Greenhouse Tour
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Hero Slider Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                activeSlide === idx ? 'w-8 bg-[#E95A08]' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. BOTANICAL CATEGORIES */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="success" className="mb-2">Carefully Curated</Badge>
            <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
              Botanical Categories
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              From fresh morning harvest bouquets to ancient Tokoname bonsai arrangements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {MOCK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center hover:border-[#E95A08] hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-[#E95A08] transition">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-400">{cat.count} items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE LISTING SECTION (4 Cards Per Row Desktop Grid) */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <Badge variant="primary" className="mb-1">Handpicked Selections</Badge>
              <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
                Featured Botanical Catalog
              </h2>
            </div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'all'
                    ? 'bg-[#E95A08] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All Stems
              </button>
              {MOCK_CATEGORIES.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    selectedCategory === c.slug
                      ? 'bg-[#E95A08] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Skeleton or 4-col card grid */}
          {loadingCatalog ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <Skeleton className="w-full h-48" />
                  <Skeleton className="w-2/3 h-5" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-1/3 h-6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="flex flex-col group h-full">
                  <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E95A08] text-white shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {item.originLocation}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span className="font-semibold text-[#2D6A4F] dark:text-emerald-400">{item.category}</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          ★ {item.rating} <span className="text-slate-400">({item.reviewsCount})</span>
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-[#E95A08] transition">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                          {formatCurrency(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            {formatCurrency(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <Link to={`/service/${item.slug}`}>
                        <Button variant="primary" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/explore">
              <Button variant="outline" size="lg">
                View All Botanical Stems & Services ({MOCK_SERVICES.length}) →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US / FEATURES */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-3xl mb-4 block">🌱</span>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">
                100% Organically Farmed
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Zero synthetic pesticides or harsh chemical blooms. Fed with seaweed extracts and volcanic compost.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-3xl mb-4 block">⚡</span>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">
                2h Express Dispatch
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Same-day dispatch for orders confirmed before 1:00 PM. Handled in temperature-regulated vans.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-3xl mb-4 block">📦</span>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">
                Plastic-Free Packaging
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Biodegradable moss wraps and recyclable kraft cylinders protect stems while protecting the planet.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-3xl mb-4 block">✨</span>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">
                7-Day Bloom Guarantee
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                If your stems do not stay fresh and vibrant for a full week, we replace them immediately with zero hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEASONAL DEALS */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-[#E95A08] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest">
                Flash Weekend Special
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif mt-3">
                Save 25% on Heritage Bonsai & Exotic Houseplants
              </h2>
              <p className="text-sm text-orange-100 mt-3 leading-relaxed">
                Use code <strong className="underline font-mono">VIPGREEN25</strong> at checkout for complimentary artisan terracotta planter with drainage plate.
              </p>
            </div>
            <Link to="/explore">
              <Button variant="secondary" size="lg" className="bg-slate-900 hover:bg-slate-950 text-white border-0">
                Claim Weekend Deal →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. STATISTICS & IMPACT */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-[#E95A08] font-serif">12,500+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Stems Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-400 font-serif">99.8%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">On-Time Dispatch</p>
            </div>
            <div>
              <p className="text-4xl font-black text-amber-400 font-serif">4.95 / 5</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Verified Ratings</p>
            </div>
            <div>
              <p className="text-4xl font-black text-blue-400 font-serif">100%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Zero-Plastic Policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED TESTIMONIALS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="success" className="mb-2">Real Feedback</Badge>
            <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
              Loved by Plant Parents
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "The Peace Lily arrived in flawless condition! The gloss on the leaves and NASA-rated purification actually keeps my home studio fresh."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#2D6A4F]">
                  EV
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Eleanor Vance</h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">✓ Verified Buyer</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "The Ecuadorian Roses stayed fresh for 12 whole days without drooping! The silk ribbon and packaging felt like high-end couture."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center font-bold text-[#E95A08]">
                  SC
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Sophia Chen</h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">✓ Verified Buyer</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "The Kyoto Juniper Bonsai is a true work of living art. The Tokoname pot and care guide gave me confidence as a beginner collector."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center font-bold text-blue-600">
                  MS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Marcus Sterling</h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">✓ Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER WITH VALIDATION & FEEDBACK */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Badge variant="primary" className="mb-2">Greenhouse Club</Badge>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
            Get 15% Off Your First Order
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
            Join 8,000+ botanical enthusiasts for weekly plant care guides, rare variety drops, and seasonal vouchers.
          </p>

          {newsletterSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-[#2D6A4F] dark:text-emerald-400 font-semibold">
              🎉 Welcome to the Greenhouse Club! Check your inbox for code <strong className="underline font-mono">BLOOM15</strong>.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#E95A08]"
              />
              <Button type="submit" variant="primary" isLoading={newsletterLoading}>
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* 9. FINAL CALL-TO-ACTION */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif mb-4">
            Bring Botanical Freshness into Your Space Today
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Experience the difference of sustainably grown, farm-direct blooms with guaranteed 7-day freshness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/explore">
              <Button variant="primary" size="lg">
                Explore Full Catalog
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
                Contact Greenhouse Concierge
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
