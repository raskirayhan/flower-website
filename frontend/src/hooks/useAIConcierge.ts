import { useState } from 'react';
import { AIChatMessage } from '../types/index.js';

export function useAIConcierge() {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: '🌱 Hello! I am Flora, your greenhouse AI assistant. How can I help you choose the best blooms or care for your plants today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (userText: string) => {
    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse =
        '🌿 Our botanical experts recommend bright, indirect sunlight and watering once a week for indoor perennials. Let me know if you need specific advice for orchids, roses, or bonsai!';

      const lower = userText.toLowerCase();
      if (lower.includes('pet') || lower.includes('cat') || lower.includes('dog')) {
        botResponse =
          '🐾 Pet-Safety Advice: Sunflowers, Ecuadorian Roses, and Desert Succulents are 100% ASPCA non-toxic! Peace lilies should be kept up high away from cats.';
      } else if (lower.includes('rose') || lower.includes('bouquet')) {
        botResponse =
          '🌹 For long-lasting roses: Trim stems at 45 degrees under running water and refresh the vase water every 48 hours for up to 12 days of vibrant vase life.';
      } else if (lower.includes('delivery') || lower.includes('time')) {
        botResponse =
          '🚚 Express Delivery: Orders placed before 1 PM ship same-day in our hydration pods with guaranteed 7-day freshness!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return { messages, isTyping, sendMessage };
}
