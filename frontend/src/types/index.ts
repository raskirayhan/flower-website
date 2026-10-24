export type UserRole = 'USER' | 'ADMIN' | 'MANAGER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  loyaltyPoints?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface BotanicalCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  icon: string;
  image: string;
}

export interface BotanicalService {
  id: string;
  slug: string;
  title: string;
  scientificName: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  harvestDate: string;
  originLocation: string;
  petSafety: '100% Pet-Safe' | 'Caution' | 'Toxic to Pets';
  description: string;
  images: string[];
  stock: number;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  itemTitle: string;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  scheduledDate: string;
  deliveryAddress: string;
  notes?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
  serviceSlug: string;
}

export interface ServiceFilterOptions {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  location?: string;
  petFriendly?: boolean;
  sort?: 'featured' | 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';
  page?: number;
  limit?: number;
}

export interface AISuggestion {
  text: string;
  intent: string;
  icon: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
