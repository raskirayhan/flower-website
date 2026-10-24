import React from 'react';
import { Badge } from '../components/ui/Badge.js';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="success" className="mb-2">Greenhouse Heritage</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
            Cultivating Living Art Since 1898
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            From humble root cuttings in Sonoma Valley to an international community of certified sustainable botanical nurseries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div className="rounded-3xl overflow-hidden h-80 bg-slate-200">
            <img src="assets/flower-store.png" alt="Historic Greenhouse" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
              The 100% Zero-Chemical Commitment
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every petal, stem, and root in our catalog is cultivated in natural volcanic compost and nourished with organic seaweed extracts. We believe flowers should smell like rain, soil, and sun — never harsh synthetic preserves.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#2D6A4F] text-xl font-bold">
                ✓
              </span>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Guaranteed 7-day vase freshness backed by our instant botanical replacement pledge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
