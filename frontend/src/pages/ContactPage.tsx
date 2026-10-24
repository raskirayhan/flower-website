import React, { useState } from 'react';
import { Button } from '../components/ui/Button.js';
import { Input } from '../components/ui/Input.js';
import { Toast } from '../components/ui/Toast.js';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMsg('Message sent! Our master florists will respond within 2 hours.');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
            Contact Greenhouse Concierge
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Have questions about wedding floral bookings, corporate greening, or specialized plant care?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-4">
              Send an Inquiry
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Message / Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#E95A08]"
                />
              </div>
              <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                Dispatch Message
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl">
            <div>
              <h3 className="font-bold text-lg font-serif mb-4">Direct Nursery Coordinates</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                📍 45 Nursery Lane, Sonoma Valley, CA 95476<br />
                📞 Direct Telephone: +1 (555) 234-FLOW<br />
                ✉️ Support: concierge@flowermarket.shop
              </p>
              <div className="p-4 rounded-2xl bg-white/10 text-xs leading-relaxed">
                <span className="font-bold text-[#E95A08] block mb-1">🌱 Express Delivery Dispatch</span>
                Same-day dispatch cut-off is 1:00 PM Pacific Time Monday through Saturday.
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 text-xs text-slate-400">
              Flower Market is certified by the American Horticultural Society.
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toastMsg || ''}
        isVisible={!!toastMsg}
        onClose={() => setToastMsg(null)}
      />
    </div>
  );
};
