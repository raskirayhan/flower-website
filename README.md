# Flower Market

[![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Flower Market is a modern, responsive, accessible storefront for fresh artisanal flowers, houseplants, and botanical arrangements. Built with vanilla HTML5, CSS3, and JavaScript, following strict design system tokens and usability standards.

---

## 🌐 Live Demo

Visit the live website hosted on GitHub Pages:
👉 **[https://raskirayhan.github.io/flower-website/](https://raskirayhan.github.io/flower-website/)**

---

## Architecture & Features

### 1. Advanced Full-Width Sticky Navbar
- **Routes & Authentication States**:
  - *Logged Out (6+ Public Routes)*: Home, Catalog, Categories, Services, Why Us, Journal, FAQ.
  - *Logged In (8+ Routes)*: Unlocks "My Orders" and "Saved Wishlist" with dedicated badges.
- **Advanced Profile Dropdown Menu**:
  - Displays user avatar, name ("Rayhan Raski"), "Floral VIP" member tier badge.
  - Direct shortcuts to Order History & Tracking, Saved Wishlist, Active Subscriptions, and Delivery Addresses.
  - Interactive "Sign In / Sign Out" simulation button that toggles authentication state with instant UI updates and toast feedback.
- **Header Actions**:
  - Dark / Light mode toggle switch.
  - Dynamic shopping cart pill with live item count and running subtotal.
  - Mobile hamburger slide-out drawer navigation with accessible focus trapping.

### 2. Hero Section (60–70% Viewport Height)
- **Interactive Multi-Slide Carousel**:
  - Slide 1: *Always Fresh Flowers for You* (Pastel Floral Centerpiece)
  - Slide 2: *Breathe Life with Indoor Greens* (Air-Purifying Peace Lily & Houseplants)
  - Slide 3: *Hand-Tied Velvet Ecuadorian Roses* (Long-Stem Romance Stems)
- **Controls & Behavior**:
  - Previous / Next arrow navigation, dot indicators, and automatic advance (pauses on mouse hover).
  - Animated floating trust cards ("Guaranteed 24h Express Delivery", "7-Day Bloom Guarantee").
- **Visual Flow to Next Section**:
  - Animated bouncing scroll down prompt ("Explore Botanical Categories") guiding visitors into the catalog.

### 3. 12 Meaningful Landing Page Sections
1. **Hero Section (`#hero`)**: 60–70% height interactive slider, CTAs, floating perks.
2. **Botanical Categories (`#categories`)**: 6 category cards with item counts (Bouquets, Indoor Greens, Flowering Pots, Bonsai, Wedding Specials, Succulents).
3. **Core Listing / Featured Catalog (`#catalog`)**: Category filter pills, shimmering skeleton loader, 4-cards-per-row desktop grid, metadata tags, and "View Details" + "Add to Cart" actions.
4. **Why Choose Us / Features (`#features`)**: 4 pillars with icons (100% Organically Farmed, 2h Express Dispatch, Plastic-Free Recyclable Packaging, 7-Day Bloom Guarantee) + rotating florist badge.
5. **Seasonal Deals & Highlights (`#deals`)**: 3 cards (Bloom 60% Off, Ana 30% Off, Zabo 25% Off) with real-time countdown timer.
6. **Greenhouse Services (`#services`)**: Bridal styling, corporate greening, weekly flower club, sympathy arrangements.
7. **Statistics & Impact (`#stats`)**: 4 live metric counters (12,500+ Delivered, 99.8% On-Time, 4.9/5 Rating, 100% Plastic-Free).
8. **Verified Testimonials (`#testimonials`)**: 3 buyer reviews with verified badges, star ratings, and real feedback.
9. **Botanical Journal / Blog (`#journal`)**: 3 educational articles with interactive read-modal dialog.
10. **Interactive FAQs (`#faq`)**: 6 collapsible accordion items with animated smooth expansions.
11. **Newsletter / Floral Club (`#newsletter`)**: Form with email regex validation, loader state, inline errors, and 15% discount voucher success card.
12. **Final Call-to-Action (`#cta`)**: High-contrast closing conversion banner with instant order triggers.

### 4. Core Listing / Card Section Rules
- **Desktop Grid**: Strict **4 cards per row** on desktop screens (`>= 1024px`), 2 per row on tablets, 1 on mobile.
- **Component Consistency**: Exact same height, same `16px` border radius, same 4:3 image aspect ratio.
- **Card Data & Meta Information**:
  - Image with category pill
  - Title & short description
  - Star rating with total review counts
  - Extended meta: Harvest date (e.g. *Fresh Harvest Today*) and Origin location (e.g. *Sonoma Valley Nursery*, *Ecuadorian Highlands*)
  - Two buttons: "**Details**" (navigates to the dedicated details page) and "**Add**" (instant cart addition with toast feedback).
- **Skeleton Loader**:
  - 8 shimmering placeholder cards with animated linear gradient shimmer (`@keyframes shimmer`) displayed during initial loading and category filtering.

### 5. Dedicated Public Details Page (`details.html`)
- **Direct Link**: [`details.html?id=prod-1`](details.html?id=prod-1) (supports all 8 product IDs).
- **Interactive Multi-Media Gallery**: Large primary viewport with clickable thumbnail selector row.
- **Separate Detailed Sections**:
  1. **Description & Botanical Overview**: Full botanical narrative, scent profile, aesthetic arrangement guidance.
  2. **Key Information & Specifications**: 8-item spec grid (Plant height, pot size, light exposure, watering schedule, pet safety rating, bloom longevity, fragrance, packaging).
  3. **Customer Reviews & Ratings**: Aggregate star rating badge (4.9/5) + individual verified buyer comments with dates.
  4. **Related Botanical Items**: 3 companion plants with quick details links and add-to-cart controls.
  5. **Direct Purchase Controls**: Interactive quantity counter, "Add to Cart" button, and "Buy Now" express checkout.

---

## Global UI & Design System

1. **Max 3 Primary Colors (+ Optional Neutral Palette)**:
   - **Primary 1 (Brand Flora Orange)**: `#E95A08` (Hover: `#C2410C`)
   - **Primary 2 (Botanical Emerald)**: `#2D6A4F` (Hover: `#1B4332`)
   - **Primary 3 (Warm Honey / Amber)**: `#D97706` (Hover: `#B45309`)
   - **Neutral Palette**: Light Canvas (`#FAF9F6`), Dark Slate (`#0F172A`), Pure White cards (`#FFFFFF`).

2. **Light & Dark Mode**:
   - One-click theme switcher in header.
   - WCAG AAA text contrast (>15:1) in both light and dark modes; saved to `localStorage`.

3. **Forms with Validation, Loaders & Feedback**:
   - Newsletter form with email regex validation, spinner loader, inline error alerts, and success voucher card.
   - Cart checkout form with full name, email, street address, and delivery date validation.
   - Contact modal with live error helpers and success confirmation card.

---

## Setup & Local Preview

Serve the repository with any local static HTTP server:

```bash
# Using Node.js npx
npx serve .

# Or using Python 3
python -m http.server 8000
```

Open `http://localhost:8000` or `http://localhost:8000/details.html?id=prod-1` in your browser.

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
│   └── flower.css           # Tokens, dark mode, 10+ sections, 4-col grid, details page
├── scripts/
│   ├── products-data.js     # Single source of truth for products, specs & reviews
│   ├── app.js               # Slider, skeleton loader, auth state, cart drawer, modals
│   └── details.js           # Multi-angle gallery, specifications, reviews, related items
├── index.html               # 12-section landing page with interactive hero slider
├── details.html             # Dedicated public product details showcase page
└── README.md
```

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
