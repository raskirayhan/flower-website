import React from 'react';
import { Badge } from '../components/ui/Badge.js';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Badge variant="neutral" className="mb-2">Legal & Consumer Terms</Badge>
        <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mb-8">
          Privacy Policy & 7-Day Bloom Guarantee
        </h1>

        <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <section>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              1. 7-Day Bloom Freshness Guarantee
            </h2>
            <p>
              We stand unconditionally behind every stem. If your cut flowers or potted plants do not arrive in pristine condition or fail to maintain freshness for 7 consecutive days, submit a photo to concierge@flowermarket.shop for an immediate complimentary re-shipment or full refund.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              2. Data Protection & Encryption
            </h2>
            <p>
              Your personal data, payment information, and delivery coordinates are encrypted using industry-standard TLS 1.3 and processed securely through Stripe. We never sell or share customer contact records with third-party advertising brokers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              3. Sustainable Packaging Standards
            </h2>
            <p>
              All shipments utilize 100% biodegradable moss wraps, kraft cylinders, and natural cotton twine to eliminate single-use plastics from florist logistics.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
