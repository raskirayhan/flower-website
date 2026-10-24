import { useState, useMemo } from 'react';
import { BotanicalService, ServiceFilterOptions } from '../types/index.js';
import { MOCK_SERVICES } from '../mock/services.js';

export function useServices(initialOptions: ServiceFilterOptions = {}) {
  const [options, setOptions] = useState<ServiceFilterOptions>({
    category: 'all',
    sort: 'featured',
    page: 1,
    limit: 8,
    ...initialOptions,
  });

  const [isLoading, setIsLoading] = useState(false);

  const filteredServices = useMemo(() => {
    let result = [...MOCK_SERVICES];

    if (options.q) {
      const query = options.q.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.scientificName.toLowerCase().includes(query) ||
          item.originLocation.toLowerCase().includes(query)
      );
    }

    if (options.category && options.category !== 'all') {
      result = result.filter(
        (item) =>
          item.categorySlug === options.category ||
          item.category.toLowerCase() === options.category?.toLowerCase()
      );
    }

    if (options.minPrice !== undefined) {
      result = result.filter((item) => item.price >= (options.minPrice || 0));
    }

    if (options.maxPrice !== undefined) {
      result = result.filter((item) => item.price <= (options.maxPrice || 999));
    }

    if (options.rating !== undefined) {
      result = result.filter((item) => item.rating >= (options.rating || 0));
    }

    if (options.location && options.location !== 'all') {
      result = result.filter((item) =>
        item.originLocation.toLowerCase().includes((options.location || '').toLowerCase())
      );
    }

    if (options.petFriendly) {
      result = result.filter((item) => item.petSafety.includes('Pet-Safe'));
    }

    switch (options.sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
    }

    return result;
  }, [options]);

  const total = filteredServices.length;
  const page = options.page || 1;
  const limit = options.limit || 8;
  const totalPages = Math.ceil(total / limit) || 1;
  const paginatedServices = filteredServices.slice((page - 1) * limit, page * limit);

  return {
    services: paginatedServices,
    total,
    page,
    totalPages,
    options,
    setOptions,
    isLoading,
    setIsLoading,
  };
}
