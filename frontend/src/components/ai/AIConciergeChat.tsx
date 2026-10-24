import React, { useState } from 'react';
import { useAIConcierge } from '../../hooks/useAIConcierge.js';
import { Button } from '../ui/Button.js';

export const AIConciergeChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isTyping, sendMessage } = useAIConcierge();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleChipClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-sm font-bold"
        >
          <span className="text-xl animate-pulse">🌿</span>
          <span>Ask Flora AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[500px] overflow-hidden animate-scale-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">
                🌱
              </span>
              <div>
                <h4 className="font-bold text-sm">Flora AI Concierge</h4>
                <p className="text-[11px] text-emerald-200">Online • Botanical Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={() => handleChipClick('Which plants are 100% pet safe?')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap hover:border-[#2D6A4F]"
            >
              🐾 Pet-Safe Plants
            </button>
            <button
              onClick={() => handleChipClick('Care tips for Ecuadorian roses')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap hover:border-[#2D6A4F]"
            >
              🌹 Rose Care
            </button>
            <button
              onClick={() => handleChipClick('What are your delivery times?')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap hover:border-[#2D6A4F]"
            >
              🚚 Delivery Times
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#E95A08] text-white rounded-br-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            {isTyping && (
              <div className="self-start bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-2xl text-xs text-slate-500 animate-pulse">
                Flora is thinking...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about plants or gifts..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
            />
            <Button type="submit" variant="secondary" size="sm" className="px-3">
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
