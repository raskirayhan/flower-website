import React, { useState, useEffect } from 'react';
import { AISuggestion } from '../../types/index.js';

interface AISearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSelectSuggestion?: (intent: string) => void;
  placeholder?: string;
}

export const AISearchBar: React.FC<AISearchBarProps> = ({
  value,
  onChange,
  onSelectSuggestion,
  placeholder = 'Search by name, origin, or botanical keyword...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);

  const defaultPool: AISuggestion[] = [
    { text: 'Pet-safe indoor houseplants', intent: 'safe', icon: '🐾' },
    { text: 'Long-stem Ecuadorian roses under $60', intent: 'roses', icon: '🌹' },
    { text: 'Low-light NASA air-purifying Peace Lily', intent: 'indoor-greens', icon: '🍃' },
    { text: 'Bridal bouquet styling & wedding specials', intent: 'wedding-specials', icon: '💍' },
  ];

  useEffect(() => {
    if (!value) {
      setSuggestions(defaultPool);
    } else {
      const q = value.toLowerCase();
      const filtered = defaultPool.filter((item) =>
        item.text.toLowerCase().includes(q)
      );
      setSuggestions(filtered.length > 0 ? filtered : defaultPool);
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <span className="absolute left-4 text-slate-400 text-lg">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E95A08]"
        />
        <span className="absolute right-4 text-xs font-bold text-[#E95A08] bg-orange-100 dark:bg-orange-950/40 px-2 py-0.5 rounded-md">
          AI
        </span>
      </div>

      {isOpen && suggestions.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-30">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              ✨ Smart Suggestions
            </p>
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onChange(item.text);
                  if (onSelectSuggestion) onSelectSuggestion(item.intent);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
