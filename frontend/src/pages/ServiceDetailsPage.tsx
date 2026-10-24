import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_SERVICES } from '../mock/services.js';
import { MOCK_REVIEWS } from '../mock/reviews.js';
import { Button } from '../components/ui/Button.js';
import { Badge } from '../components/ui/Badge.js';
import { Modal } from '../components/ui/Modal.js';
import { Toast } from '../components/ui/Toast.js';
import { formatCurrency } from '../lib/utils.js';

export const ServiceDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = MOCK_SERVICES.find((s) => s.slug === slug || s.id === slug) || MOCK_SERVICES[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const reviews = MOCK_REVIEWS.filter((r) => r.serviceSlug === item.slug);
  const relatedItems = MOCK_SERVICES.filter((s) => s.id !== item.id && s.categorySlug === item.categorySlug).slice(0, 3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryDate || !deliveryAddress) return;

    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setIsBookingOpen(false);
      setToastMessage(`Booking confirmed for ${item.title}! Order code: FM-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1200);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-slate-600">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-slate-600">Catalog</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-bold">{item.title}</span>
        </div>

        {/* Top Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
          {/* Gallery Viewport */}
          <div className="flex flex-col gap-4">
            <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
              <img
                src={item.images[activeImageIndex] || item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#E95A08] text-white">
                {item.badge || 'Artisanal'}
              </span>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === idx ? 'border-[#E95A08]' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="success">{item.category}</Badge>
                <Badge variant={item.petSafety.includes('Pet-Safe') ? 'success' : 'warning'}>
                  🐾 {item.petSafety}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
                {item.title}
              </h1>
              <p className="text-xs font-serif italic text-slate-400 mt-1">
                {item.scientificName}
              </p>

              <div className="flex items-center gap-3 my-4">
                <span className="text-amber-500 font-bold text-sm">★ {item.rating}</span>
                <span className="text-xs text-slate-400">({item.reviewsCount} verified reviews)</span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  ✓ In Stock ({item.stock} available)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                  {formatCurrency(item.price)}
                </span>
                {item.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    {formatCurrency(item.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Quantity & Booking Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-500">Quantity:</span>
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Book Delivery / Appointment →
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setToastMessage(`Added ${quantity}x ${item.title} to your floral basket!`)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Specification Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
          <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-slate-100 mb-6">
            Botanical Specifications & Care Profile
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Growth Height</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">45 – 55 cm</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Pot Diameter</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">16 cm Ceramic</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Light Exposure</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Medium Indirect</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Watering Schedule</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Once / Week</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Pet Safety</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.petSafety}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Bloom Longevity</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Year-Round / 12 Days</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Origin Nursery</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.originLocation}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Packaging</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">100% Biodegradable</span>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-slate-100">
                Customer Ratings & Reviews
              </h2>
              <p className="text-xs text-slate-400 mt-1">Verified purchases from floral club members.</p>
            </div>
            <Badge variant="primary">★ {item.rating} / 5.0</Badge>
          </div>

          <div className="flex flex-col gap-4">
            {reviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No reviews yet for this harvest. Be the first to review!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{rev.author}</span>
                    <span className="text-xs text-amber-500 font-bold">★ {rev.rating}.0</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-slate-400 mt-2 block">{rev.date} • Verified Purchase</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-slate-100 mb-6">
              Companion Stems & Botanical Pairings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedItems.map((rel) => (
                <Link key={rel.id} to={`/service/${rel.slug}`} className="group">
                  <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                    <img src={rel.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#E95A08] transition">
                    {rel.title}
                  </h4>
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                    {formatCurrency(rel.price)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title={`Book Delivery: ${item.title}`}
      >
        <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Delivery Date & Window
            </label>
            <input
              type="date"
              required
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Delivery Street Address
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 742 Evergreen Terrace, Springfield"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 flex justify-between">
            <span>Subtotal ({quantity} item)</span>
            <span className="font-bold">{formatCurrency(item.price * quantity)}</span>
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={bookingLoading} className="w-full mt-2">
            Confirm Order & Schedule Dispatch
          </Button>
        </form>
      </Modal>

      {/* Toast Notification */}
      <Toast
        message={toastMessage || ''}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
