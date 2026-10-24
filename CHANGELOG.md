# Changelog

All notable changes to the Flower Market platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-24

### Added
- **Backend Architecture**:
  - Express.js API package with modular routing, Zod validation, and AppError handling.
  - PostgreSQL schema with 11 relational Prisma models (User, Profile, Category, ProductService, ServiceAddon, OrderBooking, Payment, Review, Notification, Coupon, AuditLog).
  - Database seeder with realistic botanical records, customer accounts, and 1-click demo logins.
  - JWT authentication and Role-Based Access Control (RBAC: USER, ADMIN, MANAGER).
  - Stripe payment intent creation, checkout lifecycle, and discount coupon handling.
  - OpenAPI 3.0 Swagger interactive documentation (`/docs`).
  - Flora AI intelligence endpoints for predictive auto-suggestions, concierge chat, and dashboard anomaly detection.
- **Frontend SPA**:
  - Vite + React 18 + TypeScript single-page application with Tailwind CSS and Radix-inspired components.
  - 12-section landing page with interactive 60-70% height hero slider, trust badges, impact metrics, and testimonial carousels.
  - Explore page with real-time search, 5-field multi-filtering, sorting, active chips, and pagination.
  - Dedicated public service details page with multi-image gallery, 8-spec care matrix, customer reviews, and booking modal.
  - Role-based dashboard with responsive sidebar, dynamic SVG charts, filterable tables, and profile editor.
  - Authentication system with login/register validation, password visibility toggles, and 1-click demo logins.
  - Flora AI chatbot widget with intent recognition, quick prompt chips, and typing indicator.
  - Informative pages: About Us, Nursery Coordinates & Contact, Botanical Gazette Blog, Privacy & 7-Day Guarantee.
- **DevOps & Infrastructure**:
  - GitHub Actions CI pipeline for backend typechecking and frontend build verification.
  - GitHub Pages deployment workflow.
  - Dependabot automated security dependency scanning.
  - Standardized Pull Request and Issue templates.
  - Render cloud deployment blueprint (`render.yaml`).
  - Complete Flower Market API Postman collection (`FlowerMarket.postman_collection.json`).
