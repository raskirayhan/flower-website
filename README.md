# Flower Market

[![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Flower Market is a modern, responsive, accessible storefront for fresh artisanal flowers, houseplants, and botanical arrangements. Built with vanilla HTML5, CSS3, and JavaScript, following strict design system tokens and usability standards.

---

## Global UI & Design System

The application strictly implements the following design architecture:

1. **Max 3 Primary Colors (+ Optional Neutral Palette)**:
   - **Primary 1 (Brand Flora Orange)**: `#E95A08` (Hover: `#C2410C`, Focus Ring: `rgba(233, 90, 8, 0.3)`)
   - **Primary 2 (Botanical Emerald)**: `#2D6A4F` (Hover: `#1B4332`, Focus Ring: `rgba(45, 106, 79, 0.3)`)
   - **Primary 3 (Warm Honey / Amber)**: `#D97706` (Hover: `#B45309`, Focus Ring: `rgba(217, 119, 6, 0.3)`)
   - **Neutral Palette**:
     - *Light Mode*: Alabaster background (`#FAF9F6`), pure white cards (`#FFFFFF`), high-contrast dark text (`#111827`, 16.5:1 contrast ratio, WCAG AAA).
     - *Dark Mode*: Deep slate background (`#0F172A`), slate card surfaces (`#1E293B`), bright legible text (`#F8FAFC`, 15.8:1 contrast ratio, WCAG AAA).

2. **Light & Dark Mode Support**:
   - One-click theme switcher in the navigation bar with sun/moon iconography.
   - Automatically detects system OS preferences (`prefers-color-scheme`).
   - Persists user selection across page reloads via `localStorage`.

3. **Consistent Layout, Spacing & Alignment**:
   - Standard 8pt spacing system (`--space-1` to `--space-12`).
   - Symmetrical container widths (`max-width: 1200px`) with consistent lateral padding.
   - Clear visual rhythm and typographic scale (`Noto Serif` for headings, `Inter` for functional UI).

4. **Component & Card Consistency**:
   - Uniform border radii: `--radius-card: 16px` across all catalog and promotional cards.
   - Unified button components (`44px` height, `--radius-btn: 10px`, hover/active states).
   - Standard form inputs (`--radius-input: 10px`, clear focus rings).
   - Uniform product card dimensions with consistent 4:3 aspect ratio image containers.

5. **Form Validation, Loaders, Error Messages & Success States**:
   - **Newsletter Form**:
     - Client-side email regex validation.
     - Animated button spinner loader on submission (`Subscribing...`).
     - Clear inline accessible error alerts (`role="alert"`).
     - Personalized success state card with confirmation and re-subscription reset.
   - **Checkout & Order Form (Cart Drawer)**:
     - Field-level validation for Full Name, Email, Street Address, and Delivery Date.
     - Live validation clearing as user types.
     - Animated order processing loader (`Processing Order...`).
     - Order confirmation screen displaying unique order ID (`#FM-XXXXXX`), total paid, and scheduled delivery date.
   - **Contact Us Modal Form**:
     - Multi-field validation, subject selection, loader state, and confirmation card.

6. **Fully Responsive Across All Breakpoints**:
   - **Desktop (> 1024px)**: 4-column catalog grid, 2-column hero, split promotional deal banners.
   - **Tablet (641px - 1024px)**: 2-column catalog grid, responsive deal layout, collapsible drawer.
   - **Mobile (<= 640px)**: 1-column product layout, slide-out hamburger navigation menu, full-width touch-friendly buttons (minimum 44px tap targets).

7. **Zero Placeholder or Dummy Content**:
   - 8 distinct, authentic floral and plant products with real prices, descriptions, star ratings, and tags.
   - All navigation links connect to real page sections (`#catalog`, `#features`, `#deals`, `#newsletter`, `#contact`).
   - Fully functional shopping cart state with live badge counter, subtotal, shipping rules, and line-item controls.

---

## Tech Stack

- **HTML5**: Semantic elements, accessible ARIA attributes, standard dialogs.
- **CSS3**: CSS Custom Properties (Tokens), Flexbox, CSS Grid, media queries, animations.
- **JavaScript (ES6+)**: Vanilla modular architecture, zero runtime dependencies.
- **Google Fonts**: `Noto Serif` & `Inter`.
- **Font Awesome 6**: Vector icons for cart, badges, social links, and theme toggle.

---

## Setup & Local Preview

Serve the repository with any local static HTTP server:

```bash
# Using Node.js npx
npx serve .

# Or using Python 3
python -m http.server 8000
```

Open `http://localhost:8000` in your web browser.

---

## Folder Structure

```text
flower-website/
├── assets/                  # High-resolution botanical photos, logos & badges
│   ├── peace-lily.jpg
│   ├── rose.jpg
│   ├── sunflower.jpg
│   ├── sample-flower-image.png
│   ├── deal-bloom.png
│   ├── deal-ana.png
│   ├── deal-zabo.png
│   ├── hero-flower.png
│   ├── flower-store.png
│   └── trusted-badge.png
├── styles/
│   └── flower.css           # Design tokens, dark mode, layout, and components
├── scripts/
│   └── app.js               # Theme toggle, cart state, filter, form validations
├── index.html               # Semantic HTML5 single-page application
└── README.md
```

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
