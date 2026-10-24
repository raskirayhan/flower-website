import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../hooks/useServices.js';
import { MOCK_CATEGORIES } from '../mock/categories.js';
import { Button } from '../components/ui/Button.js';
import { Card } from '../components/ui/Card.js';
import { Skeleton } from '../components/ui/Skeleton.js';
import { AISearchBar } from '../components/ai/AISearchBar.js';
import { formatCurrency } from '../lib/utils.js';

export const ExplorePage: React.FC = () => {
  const { services, total, page, totalPages, options, setOptions, isLoading } = useServices();
  const [searchVal, setSearchVal] = useState(options.q || '');

  const handleCategoryChange = (cat: string) => {
    setOptions((prev) => ({ ...prev, category: cat, page: 1 }));
  };

  const handlePriceChange = (min?: number, max?: number) => {
    setOptions((prev) => ({ ...prev, minPrice: min, maxPrice: max, page: 1 }));
  };

  const handleRatingChange = (rating?: number) => {
    setOptions((prev) => ({ ...prev, rating, page: 1 }));
  };

  const handleLocationChange = (loc: string) => {
    setOptions((prev) => ({ ...prev, location: loc, page: 1 }));
  };

  const handlePetFriendlyToggle = () => {
    setOptions((prev) => ({ ...prev, petFriendly: !prev.petFriendly, page: 1 }));
  };

  const handleSortChange = (sort: any) => {
    setOptions((prev) => ({ ...prev, sort, page: 1 }));
  };

  const clearAllFilters = () => {
    setSearchVal('');
    setOptions({
      category: 'all',
      sort: 'featured',
      page: 1,
      limit: 8,
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      location: undefined,
      petFriendly: undefined,
      q: undefined,
    });
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
            Botanical Catalog & Stems
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover {total} sustainably harvested plants, fresh bouquets, and bonsai arrangements.
          </p>
        </div>

        {/* AI Search & Primary Controls */}
        <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <AISearchBar
              value={searchVal}
              onChange={(v) => {
                setSearchVal(v);
                setOptions((prev) => ({ ...prev, q: v, page: 1 }));
              }}
              onSelectSuggestion={(intent) => {
                if (intent === 'safe') {
                  setOptions((prev) => ({ ...prev, petFriendly: true, page: 1 }));
                } else {
                  setOptions((prev) => ({ ...prev, category: intent, page: 1 }));
                }
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Sort by:</span>
            <select
              value={options.sort || 'featured'}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E95A08]"
            >
              <option value="featured">Featured / Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Highest Rated</option>
              <option value="newest">Newest Harvest</option>
            </select>
          </div>
        </div>

        {/* Filter Bar with 5 Filter Types */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Filter 1: Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                value={options.category || 'all'}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="all">All Categories</option>
                {MOCK_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 2: Price Range */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Price Range
              </label>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'under30') handlePriceChange(0, 30);
                  else if (val === '30to50') handlePriceChange(30, 50);
                  else if (val === '50plus') handlePriceChange(50, 999);
                  else handlePriceChange(undefined, undefined);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="all">All Prices</option>
                <option value="under30">Under $30</option>
                <option value="30to50">$30 – $50</option>
                <option value="50plus">$50 and above</option>
              </select>
            </div>

            {/* Filter 3: Rating */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Minimum Rating
              </label>
              <select
                value={options.rating || ''}
                onChange={(e) => handleRatingChange(e.target.value ? Number(e.target.value) : undefined)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="">Any Rating</option>
                <option value="4.8">★ 4.8 & Above</option>
                <option value="4.9">★ 4.9 & Above</option>
                <option value="5.0">★ 5.0 Perfect</option>
              </select>
            </div>

            {/* Filter 4: Location / Origin Nursery */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Origin Nursery
              </label>
              <select
                value={options.location || 'all'}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="all">All Locations</option>
                <option value="Sonoma">Sonoma Valley Nursery</option>
                <option value="Andes">Ecuadorian Andes</option>
                <option value="Hawaiian">Hawaiian Greenhouse</option>
                <option value="Kyoto">Kyoto Bonsai Nursery</option>
                <option value="Oregon">Oregon Valley Hothouse</option>
              </select>
            </div>

            {/* Filter 5: Pet Safety */}
            <div className="flex flex-col justify-end">
              <button
                onClick={handlePetFriendlyToggle}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                  options.petFriendly
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {options.petFriendly ? '🐾 100% Pet-Safe Only' : '🐾 Any Pet Safety'}
              </button>
            </div>
          </div>

          {/* Active Filter Chips & Reset */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Active Criteria:</span>
              {options.category && options.category !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#E95A08] text-xs font-bold">
                  Category: {options.category}
                </span>
              )}
              {options.petFriendly && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#2D6A4F] text-xs font-bold">
                  🐾 Pet-Safe
                </span>
              )}
              {options.location && options.location !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                  📍 {options.location}
                </span>
              )}
            </div>
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-slate-500 hover:text-red-500 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* 4 Cards Per Row Desktop Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <Skeleton className="w-full h-48" />
                <Skeleton className="w-2/3 h-5" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-1/3 h-6" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-4xl mb-3 block">🌿</span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              No matching botanical items found
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your price range or clearing pet safety filters to browse all fresh greenhouse stems.
            </p>
            <Button variant="outline" size="sm" className="mt-4" onClick={clearAllFilters}>
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setOptions((prev) => ({ ...prev, page: page - 1 }))}
            >
              ← Previous
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setOptions((prev) => ({ ...prev, page: i + 1 }))}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                  page === i + 1
                    ? 'bg-[#E95A08] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setOptions((prev) => ({ ...prev, page: page + 1 }))}
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
