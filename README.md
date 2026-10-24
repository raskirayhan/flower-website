# Flower Market - Artisanal Stems & Botanical Services Platform

[![CI Pipeline](https://github.com/raskirayhan/flower-website/actions/workflows/ci.yml/badge.svg)](https://github.com/raskirayhan/flower-website/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.19-green.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14-2D3748.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Flower Market is a modern, responsive, accessible full-stack e-commerce and booking platform for artisanal cut flowers, NASA-certified houseplants, and botanical landscaping services. Built adhering to enterprise-grade Clean Architecture with an Express + Prisma PostgreSQL API backend and a Vite React TypeScript SPA frontend.

---

## 🌐 Live Website & Repository Links

- 🚀 **Live Storefront (GitHub Pages)**: [https://raskirayhan.github.io/flower-website/](https://raskirayhan.github.io/flower-website/)
- 💻 **GitHub Repository**: [https://github.com/raskirayhan/flower-website.git](https://github.com/raskirayhan/flower-website.git)
- 📡 **Render Deployment Blueprint**: [`render.yaml`](render.yaml)
- 📮 **Postman API Collection**: [`FlowerMarket.postman_collection.json`](FlowerMarket.postman_collection.json)

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Sidebar Items / Capabilities |
| :--- | :--- | :--- | :--- |
| 👤 **Customer User** | `user@flowermarket.shop` | `FlowerUser2026!` | 4 items: Overview, My Orders, Plant Wishlist, Account Profile |
| 🛡️ **Administrator** | `admin@flowermarket.shop` | `FlowerAdmin2026!` | 6 items: Overview, All Orders, Plant Inventory, Customers, Analytics, Settings |
| 📊 **Store Manager** | `manager@flowermarket.shop` | `FlowerManager2026!` | 5 items: Overview, Dispatch & Orders, Stock Management, Analytics, Supplier Notes |

*Note: You can also use the 1-click "Auto-fill Demo Credentials" buttons on the Sign In page to test each role instantly.*

---

## 🏗️ Repository Architecture

The project strictly follows the modular mono-repo blueprint:

```text
flower-website/
├── backend/                         # Express API package
│   ├── prisma/
│   │   ├── schema.prisma             # PostgreSQL schema (11 relational models)
│   │   └── seed.ts                   # Local/demo database seeder
│   ├── src/
│   │   ├── config/                   # Database, Stripe, and Swagger setup
│   │   ├── controllers/              # Request handlers and business operations
│   │   ├── middlewares/              # Auth, validation, rate limiting & error handling
│   │   ├── routes/                   # Auth, services, categories, bookings, payments, AI
│   │   ├── schemas/                  # Zod request validation schemas
│   │   ├── app.ts                    # Express middleware and route assembly
│   │   └── server.ts                 # HTTP server entry point with graceful shutdown
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── frontend/                        # React SPA package
│   ├── src/
│   │   ├── components/               # Layout, UI components, and Flora AI widgets
│   │   ├── context/                  # Authentication and theme state providers
│   │   ├── hooks/                    # API, services filtering, bookings, and AI hooks
│   │   ├── lib/                      # Axios client and formatting utilities
│   │   ├── mock/                     # 16 authentic botanical items, categories, reviews
│   │   ├── pages/                    # Home, Explore, Details, Login, Register, Dashboard
│   │   ├── types/                    # Shared TypeScript interfaces
│   │   ├── App.tsx                   # React Router configuration
│   │   └── main.tsx                  # React entry point
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
├── .github/                          # CI, deployment, Dependabot, PR & issue templates
├── FlowerMarket.postman_collection.json  # Comprehensive API request collection
├── render.yaml                       # Render backend & frontend cloud blueprint
├── LICENSE                           # MIT License
├── README.md                         # Comprehensive project documentation
└── .gitignore                        # Git exclusion rules
```

---

## 🗄️ Database Schema (11 Prisma Models)

Located in [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma):

1. **`User`**: Account identity, hashed passwords, role-based access (`USER`, `ADMIN`, `MANAGER`).
2. **`Profile`**: User bio, loyalty points tier, delivery preferences, notification alerts.
3. **`Category`**: Botanical taxonomy (`Fresh Bouquets`, `Indoor Greens`, `Bonsai`, etc.).
4. **`ProductService`**: Full plant/service specifications (price, height, origin, pet-safety, stock).
5. **`ServiceAddon`**: Optional botanical add-ons (terracotta planters, organic food spray).
6. **`OrderBooking`**: Customer dispatch bookings with delivery addresses and notes.
7. **`Payment`**: Stripe PaymentIntent records, transaction status (`SUCCEEDED`, `PENDING`).
8. **`Review`**: Verified customer ratings (1–5 stars) and comments.
9. **`Notification`**: Real-time user dispatch updates and inventory threshold alerts.
10. **`Coupon`**: Promotional discount codes (`BLOOM15`, `VIPGREEN25`).
11. **`AuditLog`**: System compliance records with IP addresses and action logs.

---

## 🎨 Global UI & Design System

- **3 Primary Brand Colors (+ Neutral Palette)**:
  - 🟠 **Flora Orange**: `#E95A08` (Hover: `#C2410C`)
  - 🟢 **Botanical Emerald**: `#2D6A4F` (Hover: `#1B4332`)
  - 🟡 **Warm Honey Amber**: `#D97706` (Hover: `#B45309`)
  - ⚪ **Canvas Neutrals**: Canvas Light (`#FAF9F6`), Dark Slate (`#0F172A`).
- **Contrast & Theme**: Light and Dark mode with WCAG AAA compliant text contrast (>15:1).
- **Consistent Layout**: Uniform `16px` / `24px` rounded radii, unified card dimensions, and exact 4 cards per row desktop grid.
- **Form Verification**: Regex email checking, password show/hide, loading spinners, and toast confirmations.
- **Authentic Content**: 100% genuine botanical descriptions, NASA air-purification ratings, and origin nursery locations.

---

## 🚀 Key Features

### 1. Landing Page (12 Sections)
- **Hero Slider (60–70% Viewport Height)**: 3 interactive slides with automatic cycling, dot controls, floating trust badges, and bouncing guide prompt.
- **12 Sections**: Hero, Categories, Featured Catalog, Why Us Pillars, Weekend Deals with countdown, Services, Impact Stats, Testimonials, Botanical Journal, FAQs, Newsletter, CTA.

### 2. Core Listing & Explore Page
- **4 Cards Per Row Desktop Grid**: Shimmer skeleton loader during initial state.
- **5 Multi-Field Filters**: Category, Price Range, Minimum Rating, Origin Nursery, and ASPCA Pet Safety.
- **Sorting Options**: Featured, Price: Low to High, Price: High to Low, Highest Rated, Newest.
- **Numbered Pagination**: Previous/Next controls and active criteria chips.

### 3. Product Details Page
- **Interactive Media Gallery**: High-res main viewport with clickable thumbnail selector row.
- **8-Item Specification Grid**: Height, pot diameter, light exposure, watering frequency, pet safety, vase longevity, nursery location, packaging.
- **Booking Modal**: Delivery date selection and street address input.

### 4. Role-Based Dashboard
- **User Role (4 items)**: Overview, My Orders, Plant Wishlist, Account Profile.
- **Admin Role (6 items)**: System Overview, All Orders, Plant Inventory, Customers, Analytics, Store Settings.
- **Manager Role (5 items)**: Manager Overview, Dispatch & Orders, Stock Management, Analytics, Supplier Notes.
- **Dynamic Responsive SVG Charts**: Monthly sales area chart and fulfillment bar charts.
- **Filterable & Paginated Tables**: Status filters, live search, and pagination.

### 5. AI Features Implementation
1. **Flora AI Concierge Chatbot Widget**: Floating chat widget with intent recognition (pet-safety, rose care, delivery times) and prompt chips.
2. **AI-Powered Predictive Search**: Smart keyword suggestion popover with intent detection.
3. **AI Dashboard Co-Pilot**: Real-time inventory depletion anomaly detection and sales surge alerts.

---

## 🛠️ Local Development Quickstart

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npm run dev
```
*Backend runs on `http://localhost:5000` (Swagger docs at `http://localhost:5000/docs`).*

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 📜 Git Commit Evolution (> 50 Commits Milestone)

This repository includes over **65+ semantic commits** detailing every development phase:
- Workflows: CI pipelines, Dependabot, PR templates, issue templates.
- Backend: Prisma schema, seeder, Stripe config, JWT auth, Zod validation, controllers, routes, Express app.
- Frontend: Types, Axios client, mock datasets, Theme/Auth context, UI components, AI widgets, 12-section home, explore, details, auth, and role-based dashboard.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
