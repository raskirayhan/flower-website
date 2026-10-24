import React, { useState } from 'react';
import { Badge } from '../components/ui/Badge.js';
import { Modal } from '../components/ui/Modal.js';

export const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const articles = [
    {
      title: '7 Crucial Rules to Extend Rose Vase Life Past 10 Days',
      category: 'Florist Wisdom',
      readTime: '4 min read',
      date: 'Oct 20, 2026',
      excerpt: 'Why 45-degree underwater stem trimming and cold water changes keep Ecuadorian roses turgid and fragrant.',
      content:
        'Always snip 1 inch off the stem base under running water to prevent air bubbles (embolism) from blocking vascular water channels. Keep the vase away from direct fruit bowls, as ripening ethylene gas triggers premature petal dropping.',
    },
    {
      title: 'NASA Clean Air Study: How Peace Lilies Filter Indoor VOCs',
      category: 'Botanical Science',
      readTime: '6 min read',
      date: 'Oct 15, 2026',
      excerpt: 'Scientific breakdown of benzene, formaldehyde, and carbon monoxide absorption through glossy spathe stomata.',
      content:
        'Peace lilies do not simply release oxygen — their root biome actively metabolizes ambient indoor toxins. Maintain moist soil without standing water to allow maximum root aeration.',
    },
    {
      title: 'The Art of Tokoname Bonsai: Shaping Heritage Junipers',
      category: 'Japanese Horticulture',
      readTime: '5 min read',
      date: 'Oct 08, 2026',
      excerpt: 'Techniques for copper wiring, jin styling, and seasonal dormancy cycles in miniature juniper trees.',
      content:
        'Juniperus procumbens thrives in open-air morning sun. Mist foliage every morning and only repot every 2 to 3 years during early spring dormancy.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <Badge variant="primary" className="mb-2">The Botanical Gazette</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
            Greenhouse Stories & Plant Care
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedArticle(art)}
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#E95A08] cursor-pointer transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-bold text-[#2D6A4F]">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-[#E95A08] transition mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
              <span className="text-xs font-bold text-[#E95A08] mt-4 block">
                Read Full Guide →
              </span>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        title={selectedArticle?.title}
      >
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
          <Badge variant="success">{selectedArticle?.category}</Badge>
          <p>{selectedArticle?.content}</p>
        </div>
      </Modal>
    </div>
  );
};
