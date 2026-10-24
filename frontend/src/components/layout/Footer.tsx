import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#E95A08] flex items-center justify-center text-white text-xl">
                🌸
              </span>
              <span className="text-xl font-extrabold text-white font-serif">
                Flower Market
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cultivating fresh artisanal bouquets, NASA-rated air-purifying houseplants, and sustainable greenery services since 1898.
            </p>
            <div className="flex items-center gap-3 text-lg">
              <span className="p-2 rounded-xl bg-slate-800 hover:text-white cursor-pointer transition">🌱</span>
              <span className="p-2 rounded-xl bg-slate-800 hover:text-white cursor-pointer transition">📷</span>
              <span className="p-2 rounded-xl bg-slate-800 hover:text-white cursor-pointer transition">🐦</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore Catalog
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li><Link to="/explore?category=fresh-bouquets" className="hover:text-white transition">Fresh Bouquets</Link></li>
              <li><Link to="/explore?category=indoor-greens" className="hover:text-white transition">Indoor Greens</Link></li>
              <li><Link to="/explore?category=bonsai-exotics" className="hover:text-white transition">Heritage Bonsai</Link></li>
              <li><Link to="/explore?category=wedding-specials" className="hover:text-white transition">Wedding Florals</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Greenhouse
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition">Our Heritage Story</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Botanical Journal</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Nursery Coordinates</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">7-Day Freshness Guarantee</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Visiting Hours
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              📍 45 Nursery Lane, Sonoma Valley, CA<br />
              📞 +1 (555) 234-FLOW<br />
              Mon - Sat: 8:00 AM – 7:00 PM<br />
              Sunday: 9:00 AM – 5:00 PM
            </p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
              ● Greenhouse Open Now
            </span>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Flower Market & Services. Modern Full-Stack Clean Architecture. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/privacy" className="hover:text-slate-400">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-400">Support Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
