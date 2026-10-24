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
- **Direct Link**: [`details.html?id=prod-1`](details.html?id=prod-1) (supports all 16 botanical items).
- **Interactive Multi-Media Gallery**: Large primary viewport with clickable thumbnail selector row.
- **Separate Detailed Sections**:
  1. **Description & Botanical Overview**: Full botanical narrative, scent profile, aesthetic arrangement guidance.
  2. **Key Information & Specifications**: 8-item spec grid (Plant height, pot size, light exposure, watering schedule, pet safety rating, bloom longevity, fragrance, packaging).
  3. **Customer Reviews & Ratings**: Aggregate star rating badge (4.9/5) + individual verified buyer comments with dates.
  4. **Related Botanical Items**: 3 companion plants with quick details links and add-to-cart controls.
  5. **Direct Purchase Controls**: Interactive quantity counter, "Add to Cart" button, and "Buy Now" express checkout.

### 6. Explore / Catalog Page (`explore.html`)
- **Direct Link**: [`explore.html`](explore.html)
- **Live Search Bar**: Real-time query matching against botanical title, scientific names, descriptions, and origin nurseries.
- **Multi-Field Filtering (5 Filter Types)**:
  - **Category**: All, Fresh Bouquets, Houseplants, Flowering Pots, Bonsai & Exotics, Wedding Specials, Succulents & Cacti.
  - **Price Range**: All Prices, Under $30, $30 - $50, $50 - $75, $75+.
  - **Rating**: Any Rating, 4.8+ Stars, 4.9+ Stars, Perfect 5.0.
  - **Origin / Nursery Location**: Any Origin, Sonoma Valley, Ecuadorian Andes, Kyoto Bonsai Nursery, Hawaiian Greenhouse, Mediterranean Nursery, Oregon Valley.
  - **Pet Safety**: Any, 100% ASPCA Pet-Safe only.
- **Sorting Options**: Featured / Popular, Price: Low to High, Price: High to Low, Highest Rated, Newest Harvest.
- **Active Filter Badges**: Dynamic chips showing active criteria with 1-click removal.
- **Skeleton Shimmer Loader**: Grid skeleton animation during search and filter operations.
- **Pagination**: Numbered pagination controls (8 items per page) with Previous/Next buttons.
- **Desktop Grid**: Strict 4 cards per row desktop grid adhering to all unified card design rules.

### 7. Authentication System (`login.html` & `register.html`)
- **Direct Links**: [`login.html`](login.html) | [`register.html`](register.html)
- **Validation & Error Handling**: Real-time regex validation for email format, password minimum length, and password match confirmation.
- **Password Visibility Toggles**: Interactive show/hide eye toggle buttons for password inputs.
- **1-Click Auto-Fill Demo Credentials**:
  - 👤 **Customer User**: `user@flowermarket.shop` / `FlowerUser2026!`
  - 🛡️ **Administrator**: `admin@flowermarket.shop` / `FlowerAdmin2026!`
  - 📊 **Store Manager**: `manager@flowermarket.shop` / `FlowerManager2026!`
- **Social Login Simulation**: Google and Facebook OAuth buttons with real-time feedback.
- **Session Persistence**: Stores authenticated user session in `localStorage` and synchronizes state across all pages.

### 8. Role-Based Dashboard (`dashboard.html`)
- **Direct Link**: [`dashboard.html`](dashboard.html)
- **Multiple Roles Supported**:
  - **User Role (4 Sidebar Items)**: Overview, My Orders, Plant Wishlist, Account Profile.
  - **Admin Role (6 Sidebar Items)**: System Overview, All Orders, Plant Inventory, Customers, Analytics, Store Settings.
  - **Manager Role (5 Sidebar Items)**: Manager Overview, Dispatch & Orders, Stock Management, Greenhouse Analytics, Supplier Notes.
- **Top Bar**: Search bar, role switcher dropdown, notifications badge, and profile menu with avatar, name, and Logout button.
- **Dynamic Metric Cards**: Role-specific metric cards with trend indicators (+14.2%, +8.6%, etc.).
- **Dynamic Responsive SVG Charts**:
  - 📈 **Monthly Sales Revenue Trend**: Smooth SVG multi-point area chart with gradient fills and month labels.
  - 🍩 **Sales by Botanical Category**: SVG donut chart with segment stroke-dash offsets and color-coded legend.
  - 📊 **Daily Greenhouse Fulfillment**: SVG vertical bar chart with hover tooltips and day labels.
- **Filterable & Paginated Data Tables**:
  - **Recent Orders Table**: Status filter (All, Processing, Dispatched, Delivered), search input, and paginated rows.
  - **Plant Inventory Table**: Category filter, stock status alerts (In Stock, Low Stock, Restocking), and pagination.
- **Editable User Profile Tab**:
  - Form allowing users/admins to update Full Name, Email, Phone Number, Delivery Address, Bio, and Notification preferences.
  - Live form validation, spinner loading state, and toast notification confirmation.

### 9. Additional Informational Pages
- 🌿 **About Us (`about.html`)**: Story of our 1898 heritage greenhouse, sustainable farming philosophy, zero-pesticide commitment, and meet-the-florists showcase.
- 📬 **Contact Us (`contact.html`)**: Direct greenhouse address, email, telephone, operating hours, interactive message form with validation, and visiting instructions.
- 📰 **Botanical Blog / Journal (`blog.html`)**: Rich botanical guides, reading times, care tips, category filtering, and modal reader.
- ⚖️ **Privacy & Terms (`privacy.html`)**: Data protection standards, cookie notice, 7-day bloom guarantee policy, and customer rights.

### 10. AI Features Implementation
1. 🤖 **Flora AI Chatbot Concierge (`scripts/ai-concierge.js`)**:
   - Floating chat badge visible across all pages with pulse animation.
   - Intelligent botanical intent recognition (care tips, pet safety advice, budget recommendations, delivery tracking, floral styling).
   - Quick prompt suggestion chips ("Best pet-safe plants", "Care tips for roses", "Delivery times", "Recommend a gift under $40").
   - Realistic typing indicator with smart delayed bot responses.
2. 🔍 **AI-Powered Search & Predictive Auto-Suggestions**:
   - Intelligent suggestion popover dropdown in the search bar.
   - Detects intent keywords (e.g., "cheap", "safe", "wedding", "indoor", "gift") and automatically pre-filters the catalog with relevant items.
3. 🧠 **AI Dashboard Co-Pilot & Anomaly Detection**:
   - Dynamic AI intelligence banner in the dashboard.
   - Generates actionable real-time insights: restock warnings (Peace Lily reaching low thresholds), sales surge anomaly alerts (+28% weekend bridal bookings), and customer behavior predictions.

---

## 🔑 Demo Credentials

| Role | Email | Password | Sidebar Items / Capabilities |
| :--- | :--- | :--- | :--- |
| **Customer User** | `user@flowermarket.shop` | `FlowerUser2026!` | 4 items: Overview, My Orders, Plant Wishlist, Account Profile |
| **Administrator** | `admin@flowermarket.shop` | `FlowerAdmin2026!` | 6 items: Overview, All Orders, Plant Inventory, Customers, Analytics, Settings |
| **Store Manager** | `manager@flowermarket.shop` | `FlowerManager2026!` | 5 items: Overview, Dispatch & Orders, Stock Management, Analytics, Supplier Notes |

*Note: You can also use the 1-click "Auto-fill Demo Credentials" buttons on [`login.html`](login.html) to sign in instantly.*

---

## 📋 Final Submission Checklist

- ✅ **Live Website URL**: [https://raskirayhan.github.io/flower-website/](https://raskirayhan.github.io/flower-website/)
- ✅ **GitHub Repository Link**: [https://github.com/raskirayhan/flower-website.git](https://github.com/raskirayhan/flower-website.git)
- ✅ **Global UI Rules**: Maximum 3 primary colors (`#E95A08`, `#2D6A4F`, `#D97706`), Light/Dark mode with WCAG AAA contrast, consistent layout & card dimensions, form validation with loaders, no dummy/placeholder content.
- ✅ **Home / Landing Page**: 12 sections, 60–70% height hero slider, 4-col cards, responsive navbar with auth state and advanced profile dropdown, functional footer.
- ✅ **Details Page**: Publicly accessible, multi-angle gallery, specifications grid, customer reviews, related items, buy controls.
- ✅ **Listing / Explore Page**: Live search, 5-field filtering (category, price, rating, location, pet safety), sorting, pagination, skeleton loader.
- ✅ **Authentication System**: Login & register pages, validation, show/hide password, 1-click demo logins, social buttons.
- ✅ **Dashboard**: Multi-role (User $\ge 4$ items, Admin $\ge 6$ items, Manager), dynamic SVG charts, filterable & paginated tables, editable profile.
- ✅ **Additional Pages**: About, Contact, Blog, Privacy/Terms.
- ✅ **AI Features**: Flora AI Concierge Chatbot, AI Search Auto-Suggestions, AI Dashboard Co-pilot.

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
