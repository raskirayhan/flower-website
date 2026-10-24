/**
 * Flower Market - Flora AI Botanical Concierge & Smart AI Features
 * 1. AI Floral Concierge Chatbot (Natural Q&A, pet safety, gifting & care)
 * 2. AI Smart Search Suggestions with semantic intent parsing
 * 3. AI Predictive Product Recommendations
 */

(function () {
  'use strict';

  // AI Knowledgebase & Intent Matching
  const AI_KNOWLEDGE = {
    intents: [
      {
        keywords: ['cat', 'dog', 'pet', 'animal', 'toxic', 'safe'],
        reply: "🐾 **Pet Safety Advisory**: For cat and dog parents, we recommend our ASPCA-certified non-toxic plants: **Calathea Bloom Plant**, **Sunburst Sunflower**, and **Lavender Mist Orchid**. Please avoid lilies and peace lilies around curious felines!",
        suggestedIds: ['prod-5', 'prod-3', 'prod-10']
      },
      {
        keywords: ['anniversary', 'love', 'romantic', 'date', 'valentine', 'romance'],
        reply: "🌹 **Romantic Florals**: Nothing conveys heartfelt devotion like our **Crimson Velvet Ecuadorian Roses** (dozen long-stems) or the **Pastel Floral Harmony** centerpiece. Both arrive in luxury gift wrap with personalized handwritten calligraphy cards.",
        suggestedIds: ['prod-2', 'prod-8']
      },
      {
        keywords: ['low light', 'dark', 'office', 'desk', 'shade', 'fluorescent', 'cube'],
        reply: "🌿 **Low-Light Champions**: For windowless offices or shaded bedrooms, our top resilient foliage picks are the **Emerald Snake Plant**, **White Peace Lily**, and **Golden Pothos Totem**. They filter toxins and require minimal care!",
        suggestedIds: ['prod-9', 'prod-1', 'prod-11']
      },
      {
        keywords: ['water', 'care', 'last', 'wilt', 'food', 'cut'],
        reply: "💧 **Botanical Care Tip**: To keep fresh-cut flowers vibrant for up to 14 days, cut stems at a 45° angle under running water, strip any leaves that sit below the waterline, and replace vase water every 48 hours with half a packet of flower food!",
        suggestedIds: []
      },
      {
        keywords: ['budget', 'cheap', 'under 25', 'under 30', 'affordable', 'price'],
        reply: "🏷️ **Best Budget Blooms**: We have glorious arrangements under $30! Check out the **Sunburst Sunflower ($18)**, **Golden Pothos ($21)**, **Pink Lily Blossom ($22)**, and **White Peace Lily ($24)**.",
        suggestedIds: ['prod-3', 'prod-11', 'prod-4', 'prod-1']
      },
      {
        keywords: ['track', 'order', 'status', 'delivery', 'where is'],
        reply: "🚚 **Live Delivery Tracking**: All our orders are dispatched via climate-controlled courier vehicles. Your order will arrive within 24 hours of placement. You can also view live delivery progress in your **Dashboard > My Orders** tab!",
        suggestedIds: []
      }
    ]
  };

  // 1. AI Chatbot Widget
  function initFloraAIChat() {
    // Inject floating button and chat drawer if not present
    let trigger = document.getElementById('flora-ai-trigger');
    if (!trigger) {
      trigger = document.createElement('button');
      trigger.id = 'flora-ai-trigger';
      trigger.className = 'flora-ai-trigger-btn';
      trigger.setAttribute('aria-label', 'Open Flora AI Floral Concierge');
      trigger.innerHTML = `
        <div class="ai-sparkle-badge"><i class="fas fa-wand-magic-sparkles"></i> AI</div>
        <i class="fas fa-robot ai-bot-icon" aria-hidden="true"></i>
        <span class="ai-trigger-tooltip">Ask Flora AI Concierge</span>
      `;
      document.body.appendChild(trigger);
    }

    let chatBox = document.getElementById('flora-ai-chatbox');
    if (!chatBox) {
      chatBox = document.createElement('div');
      chatBox.id = 'flora-ai-chatbox';
      chatBox.className = 'flora-ai-chatbox';
      chatBox.setAttribute('role', 'dialog');
      chatBox.setAttribute('aria-label', 'Flora AI Assistant');
      chatBox.innerHTML = `
        <div class="ai-chat-header">
          <div class="ai-chat-brand">
            <div class="ai-avatar-circle"><i class="fas fa-seedling"></i></div>
            <div>
              <strong>Flora AI</strong>
              <span>Smart Botanical Concierge</span>
            </div>
          </div>
          <button type="button" class="ai-chat-close" id="flora-ai-close" aria-label="Close Chat">&times;</button>
        </div>

        <div class="ai-chat-messages" id="ai-chat-messages">
          <div class="ai-msg ai-msg--bot">
            <p>Hello! 🌸 I am <strong>Flora</strong>, your AI Botanical Concierge. How can I assist your floral journey today?</p>
            <div class="ai-quick-chips">
              <button type="button" class="ai-chip" data-query="Pet-friendly safe plants">🐾 Pet Friendly</button>
              <button type="button" class="ai-chip" data-query="Best romantic anniversary flowers">🌹 Romantic Florals</button>
              <button type="button" class="ai-chip" data-query="Low light office desk plants">🌿 Low Light Plants</button>
              <button type="button" class="ai-chip" data-query="How to make cut flowers last 2 weeks">💧 Care Secrets</button>
            </div>
          </div>
        </div>

        <form class="ai-chat-input-bar" id="ai-chat-form">
          <input type="text" id="ai-user-input" class="ai-input" placeholder="Ask about flowers, pet safety, care..." autocomplete="off">
          <button type="submit" class="ai-send-btn" aria-label="Send message"><i class="fas fa-paper-plane"></i></button>
        </form>
      `;
      document.body.appendChild(chatBox);
    }

    // Toggle Chat visibility
    trigger.addEventListener('click', () => {
      chatBox.classList.toggle('is-active');
      if (chatBox.classList.contains('is-active')) {
        const inp = document.getElementById('ai-user-input');
        if (inp) inp.focus();
      }
    });

    const closeBtn = document.getElementById('flora-ai-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        chatBox.classList.remove('is-active');
      });
    }

    // Quick chip handlers
    chatBox.addEventListener('click', (e) => {
      if (e.target.classList.contains('ai-chip')) {
        const query = e.target.getAttribute('data-query');
        sendUserMessage(query);
      }
    });

    const form = document.getElementById('ai-chat-form');
    const input = document.getElementById('ai-user-input');
    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
          sendUserMessage(text);
          input.value = '';
        }
      });
    }
  }

  function sendUserMessage(text) {
    const msgBox = document.getElementById('ai-chat-messages');
    if (!msgBox) return;

    // Render User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg ai-msg--user';
    userMsg.innerHTML = `<p>${escapeHTML(text)}</p>`;
    msgBox.appendChild(userMsg);
    msgBox.scrollTop = msgBox.scrollHeight;

    // Render Typing Indicator
    const typing = document.createElement('div');
    typing.className = 'ai-msg ai-msg--bot ai-typing-indicator';
    typing.innerHTML = `<span></span><span></span><span></span>`;
    msgBox.appendChild(typing);
    msgBox.scrollTop = msgBox.scrollHeight;

    // Analyze intent using Flora AI
    setTimeout(() => {
      typing.remove();
      const botResponse = generateAIResponse(text);
      const botMsg = document.createElement('div');
      botMsg.className = 'ai-msg ai-msg--bot';
      botMsg.innerHTML = botResponse;
      msgBox.appendChild(botMsg);
      msgBox.scrollTop = msgBox.scrollHeight;
    }, 700);
  }

  function generateAIResponse(userInput) {
    const lower = userInput.toLowerCase();

    // Check knowledgebase intents
    for (const intent of AI_KNOWLEDGE.intents) {
      if (intent.keywords.some(k => lower.includes(k))) {
        let cardMarkup = '';
        if (intent.suggestedIds && intent.suggestedIds.length > 0) {
          const prods = intent.suggestedIds.map(id => getProductById(id)).filter(Boolean);
          cardMarkup = `
            <div class="ai-suggested-cards">
              ${prods.map(p => `
                <div class="ai-mini-card">
                  <img src="${p.images[0]}" alt="${p.name}" class="ai-mini-thumb">
                  <div class="ai-mini-info">
                    <strong>${p.name}</strong>
                    <span>$${p.price}.00</span>
                  </div>
                  <a href="details.html?id=${p.id}" class="ai-mini-link"><i class="fas fa-arrow-right"></i></a>
                </div>
              `).join('')}
            </div>
          `;
        }
        return `<p>${intent.reply}</p>${cardMarkup}`;
      }
    }

    // Default intelligent fall-through
    const matchingProducts = PRODUCTS_DATA.filter(p => 
      p.name.toLowerCase().includes(lower) || 
      p.categoryLabel.toLowerCase().includes(lower) ||
      p.shortDescription.toLowerCase().includes(lower)
    ).slice(0, 3);

    if (matchingProducts.length > 0) {
      return `
        <p>I found ${matchingProducts.length} botanical match(es) for "<em>${escapeHTML(userInput)}</em>":</p>
        <div class="ai-suggested-cards">
          ${matchingProducts.map(p => `
            <div class="ai-mini-card">
              <img src="${p.images[0]}" alt="${p.name}" class="ai-mini-thumb">
              <div class="ai-mini-info">
                <strong>${p.name}</strong>
                <span>$${p.price}.00 • ${p.categoryLabel}</span>
              </div>
              <a href="details.html?id=${p.id}" class="ai-mini-link"><i class="fas fa-arrow-right"></i></a>
            </div>
          `).join('')}
        </div>
      `;
    }

    return `<p>I’m here to help with floral recommendations, pet safety checks, and flower care guides! Could you tell me what room or occasion you have in mind?</p>`;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // 2. AI Smart Search Suggestions Autocomplete
  function initAISmartSearch() {
    const searchInputs = document.querySelectorAll('.ai-search-input');
    searchInputs.forEach(input => {
      let dropdown = input.parentElement.querySelector('.ai-search-dropdown');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'ai-search-dropdown is-hidden';
        input.parentElement.appendChild(dropdown);
      }

      input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        if (query.length < 2) {
          dropdown.classList.add('is-hidden');
          return;
        }

        const matches = PRODUCTS_DATA.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.scientificName.toLowerCase().includes(query) ||
          p.origin.toLowerCase().includes(query)
        ).slice(0, 5);

        if (matches.length === 0) {
          dropdown.innerHTML = `<div class="ai-dropdown-empty">No botanical stems matching "${escapeHTML(query)}"</div>`;
        } else {
          dropdown.innerHTML = `
            <div class="ai-dropdown-header"><i class="fas fa-wand-magic-sparkles text-primary-color"></i> AI Suggestions</div>
            ${matches.map(m => `
              <a href="details.html?id=${m.id}" class="ai-dropdown-item">
                <img src="${m.images[0]}" alt="${m.name}" class="ai-dropdown-thumb">
                <div class="ai-dropdown-info">
                  <strong>${m.name}</strong>
                  <span>$${m.price}.00 • <em style="color: var(--color-secondary);">${m.categoryLabel}</em></span>
                </div>
                <span class="ai-dropdown-rating"><i class="fas fa-star text-amber"></i> ${m.rating}</span>
              </a>
            `).join('')}
          `;
        }
        dropdown.classList.remove('is-hidden');
      });

      document.addEventListener('click', (e) => {
        if (!input.parentElement.contains(e.target)) {
          dropdown.classList.add('is-hidden');
        }
      });
    });
  }

  // Initialize AI Features
  document.addEventListener('DOMContentLoaded', () => {
    initFloraAIChat();
    initAISmartSearch();
  });

})();
