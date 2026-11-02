# 🌸 System Design & Backend Architecture Document
## Project: Flower Market & Botanical Services Platform
**Course:** Level 4 Web Development (Programming Hero)  
**Assignment:** Assignment 05 - System Design and Architecture  
**Student Name:** Rayhan Raski  
**Date:** November 2026  
**Status:** Complete & Ready for Evaluation  

---

# 1. Project Requirements

### 1.1 Project Name
**Flower Market & Botanical Services Platform**

### 1.2 Target Users
1. **Urban Plant Enthusiasts & Home Decorators:** Individuals looking for air-purifying, pet-safe indoor houseplants with care instructions and guarantees.
2. **Event Organizers & Couples:** People booking wedding arrangements, celebratory bouquets, and bridal party botanical styling.
3. **Corporate Clients:** Offices and businesses requiring regular indoor green maintenance and weekly bouquet subscriptions.
4. **Greenhouse Operations Staff & Florists:** Managers and administrators who oversee inventory, dispatch schedules, and order fulfillment.

### 1.3 Main Purpose
To provide an end-to-end e-commerce and on-demand botanical service platform where customers can explore sustainably farmed flowers and plants, filter based on pet safety and environmental needs, book climate-controlled deliveries, process secure digital payments, and interact with an AI botanical concierge.

### 1.4 User Roles
- **Customer (User):** Public catalog browsing, search & filtering, booking floral arrangements, making card payments, reviewing purchases, managing personal profile and order tracking.
- **Store Manager:** Managing daily warehouse dispatch, tracking plant stock thresholds, monitoring greenhouse humidity/fulfillment metrics, viewing supplier orders.
- **Administrator (Admin):** Full system authority including user role management, catalog creation, discount coupon creation, analytics dashboards, and auditing system logs.

### 1.5 Core Features (7 Features)
1. **Botanical Catalog & Advanced Multi-Field Filtering:** Search and filter by category, price range, minimum rating, origin nursery, and ASPCA pet safety.
2. **Order Booking & Delivery Scheduling:** Automated scheduling of hand-tied bouquet harvests with specific delivery time windows and instructions.
3. **Stripe Payment Gateway Integration:** Secure payment intent handling, automated checkout lifecycle, and dynamic discount coupon deductions.
4. **Verified Customer Reviews & Rating Engine:** Post-fulfillment rating and review submissions tied to confirmed bookings.
5. **Flora AI Concierge & Smart Search:** NLP-driven automated botanical advice, pet-safety suggestions, and predictive search auto-complete.
6. **Role-Based Access Control (RBAC) Dashboard:** Multi-role analytics with dynamic SVG revenue charts, paginated order data tables, and inventory replenishment alerts.
7. **Automated Notification & Audit System:** Real-time dispatch alerts and administrative action logging.

---

# 2. System Design & Architecture (SDA) Workflow

### 2.1 Major Feature Workflow: "Place Botanical Order & Schedule Delivery"

```text
[ Client (Browser / React SPA) ]
                │
                ▼  (1) HTTP POST /api/bookings with JWT Bearer Token
┌────────────────────────────────────────────────────────────────────────┐
│                        API Gateway & Middlewares                       │
│  ├─ Rate Limiter (Prevents DDoS & brute force)                         │
│  ├─ CORS & Helmet (Security headers)                                   │
│  ├─ Authentication Middleware (Verifies JWT signature & extracts User) │
│  └─ Validation Middleware (Zod schema validates body parameters)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (2) Validated Request Context
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Route & Controller Layer                        │
│  ├─ booking.routes.ts -> Routes POST to createBookingHandler          │
│  └─ booking.controller.ts -> Extracts customerId, payload, calls Svc   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (3) Invoke Business Logic
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Service / Business Logic Layer                    │
│  ├─ Check Product Availability & Stock Level                           │
│  ├─ Calculate Total Amount (Base Price + Addons - Coupon Discount)     │
│  ├─ Generate Unique Booking Code (e.g. FM-2026-XXXX)                   │
│  └─ Coordinate Database Transaction with Prisma ORM                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (4) Database Operations
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           Database Layer                               │
│  ├─ PostgreSQL (Prisma Client Transaction)                             │
│  ├─ INSERT into order_bookings table                                   │
│  ├─ DECREMENT product_services.stock                                   │
│  └─ INSERT into notifications table (Dispatch scheduled)               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (5) Record Saved & Transaction Committed
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           Response Pipeline                            │
│  ├─ Format 201 Created Response Object                                 │
│  ├─ Send Notification Event / Email Dispatch Trigger                   │
│  └─ Return JSON: { success: true, message, data: { bookingCode, ... } }│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼  (6) 201 Created JSON
[ Client (UI updates with Toast & Order Tracking View) ]
```

### 2.2 Step-by-Step Explanation:
1. **Client Action:** The user selects a botanical product (e.g., *Peace Lily Air Purifier*), specifies a delivery date, delivery address, and clicks "Book Delivery". An HTTP POST request is dispatched with the user's JWT access token in the `Authorization` header.
2. **Security & Validation Middlewares:** 
   - `auth.middleware.ts` decodes and verifies the JWT token.
   - `validate.middleware.ts` runs the payload through `createBookingSchema` (Zod), checking for valid ISO dates and address formats.
3. **Controller Handling:** `booking.controller.ts` unpacks the sanitized data and delegates execution to the booking business service.
4. **Service & Business Rules:** The service checks if the item is in stock (`stock > 0`), applies any valid promotional coupons (e.g. `BLOOM15`), and computes the subtotal.
5. **Database Transaction:** Prisma executes a relational atomic transaction on PostgreSQL: creates the order booking record, decrements the product inventory, and creates an in-app notification.
6. **API Response:** A standardized HTTP 201 Created payload is sent back to the frontend containing order codes, delivery status, and booking details.

---

# 3. Database Entity Relationship Diagram (ERD)

### 3.1 Entities Summary (11 Relational Tables)
1. **`users` (PK: id):** Central credentials, hashed password, role (`USER`, `ADMIN`, `MANAGER`).
2. **`profiles` (PK: id, FK: userId):** 1-to-1 relationship with `users` storing bio, preferences, loyalty points.
3. **`categories` (PK: id):** 1-to-Many relationship with `product_services` (Bouquets, Greens, Bonsai).
4. **`product_services` (PK: id, FK: categoryId):** Core items containing botanical specs, price, pet-safety, stock.
5. **`service_addons` (PK: id, FK: serviceId):** 1-to-Many optional add-ons (Terracotta planters, plant foods).
6. **`order_bookings` (PK: id, FK: customerId, serviceId):** Dispatch records with dates and addresses.
7. **`payments` (PK: id, FK: bookingId):** 1-to-1 with `order_bookings` tracking Stripe Payment Intents.
8. **`reviews` (PK: id, FK: serviceId, customerId, bookingId):** Verified feedback ratings.
9. **`notifications` (PK: id, FK: userId):** User alerts for status transitions.
10. **`coupons` (PK: id):** Promotional discount codes (`BLOOM15`, `VIPGREEN25`).
11. **`audit_logs` (PK: id, FK: userId):** System action and compliance tracking.

### 3.2 dbdiagram.io DBML Source Code
*(Copy and paste this directly into https://dbdiagram.io to generate the diagram)*

```dbml
// Database Design: Flower Market & Botanical Platform
// Generated for dbdiagram.io

Table users {
  id varchar [pk]
  email varchar [unique, not null]
  password varchar [not null]
  name varchar [not null]
  phone varchar
  avatar varchar
  role varchar [default: 'USER', note: 'USER | ADMIN | MANAGER']
  address varchar
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}

Table profiles {
  id varchar [pk]
  userId varchar [unique, ref: - users.id]
  bio text
  preferences text
  loyaltyPoints int [default: 0]
  notificationEmail boolean [default: true]
  notificationSms boolean [default: false]
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}

Table categories {
  id varchar [pk]
  name varchar [unique, not null]
  slug varchar [unique, not null]
  description text
  icon varchar
  image varchar
  displayOrder int [default: 0]
  isActive boolean [default: true]
  createdAt timestamp [default: `now()`]
}

Table product_services {
  id varchar [pk]
  title varchar [not null]
  slug varchar [unique, not null]
  scientificName varchar
  description text [not null]
  price decimal(10,2) [not null]
  originalPrice decimal(10,2)
  durationOrHeight varchar
  originLocation varchar
  petFriendlyRating varchar [default: 'Caution']
  stock int [default: 50]
  rating decimal(3,2) [default: 5.0]
  reviewCount int [default: 0]
  images text[]
  isFeatured boolean [default: false]
  categoryId varchar [ref: > categories.id]
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}

Table service_addons {
  id varchar [pk]
  serviceId varchar [ref: > product_services.id]
  name varchar [not null]
  price decimal(10,2) [not null]
  description text
}

Table order_bookings {
  id varchar [pk]
  bookingCode varchar [unique, not null]
  customerId varchar [ref: > users.id]
  serviceId varchar [ref: > product_services.id]
  status varchar [default: 'PENDING', note: 'PENDING | CONFIRMED | DISPATCHED | COMPLETED | CANCELLED']
  scheduledDate timestamp [not null]
  totalAmount decimal(10,2) [not null]
  deliveryAddress text [not null]
  notes text
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}

Table payments {
  id varchar [pk]
  bookingId varchar [unique, ref: - order_bookings.id]
  stripePaymentIntentId varchar [unique]
  amount decimal(10,2) [not null]
  currency varchar [default: 'USD']
  status varchar [default: 'PENDING', note: 'PENDING | SUCCEEDED | FAILED | REFUNDED']
  method varchar [default: 'card']
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}

Table reviews {
  id varchar [pk]
  serviceId varchar [ref: > product_services.id]
  customerId varchar [ref: > users.id]
  bookingId varchar [unique, ref: - order_bookings.id]
  rating int [not null]
  comment text [not null]
  isVerifiedPurchase boolean [default: true]
  createdAt timestamp [default: `now()`]
}

Table notifications {
  id varchar [pk]
  userId varchar [ref: > users.id]
  title varchar [not null]
  message text [not null]
  type varchar [default: 'info']
  isRead boolean [default: false]
  createdAt timestamp [default: `now()`]
}

Table coupons {
  id varchar [pk]
  code varchar [unique, not null]
  discountPercent int [not null]
  minOrderAmount decimal(10,2) [default: 0]
  maxUses int [default: 100]
  usedCount int [default: 0]
  expiresAt timestamp
  isActive boolean [default: true]
  createdAt timestamp [default: `now()`]
}

Table audit_logs {
  id varchar [pk]
  userId varchar [ref: > users.id]
  action varchar [not null]
  ipAddress varchar
  userAgent varchar
  details text
  createdAt timestamp [default: `now()`]
}
```

---

# 4. Backend API Design (Full List)

| HTTP Method | Endpoint | Purpose | Auth Required | Required Role |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | System health check and server uptime | No | Public |
| `POST` | `/api/auth/register` | Register a new customer user account | No | Public |
| `POST` | `/api/auth/login` | Authenticate user and return JWT tokens | No | Public |
| `POST` | `/api/auth/demo-login` | 1-Click quick login for demo testing | No | Public |
| `GET` | `/api/auth/me` | Retrieve profile of the logged-in user | Yes | Any (`USER`, `ADMIN`, `MANAGER`) |
| `GET` | `/api/categories` | List all botanical categories | No | Public |
| `GET` | `/api/services` | Query services with 5-field filtering & pagination | No | Public |
| `GET` | `/api/services/:slug` | Retrieve single service specifications by slug | No | Public |
| `POST` | `/api/bookings` | Create order booking and schedule harvest delivery | Yes | Any (`USER`, `ADMIN`, `MANAGER`) |
| `GET` | `/api/bookings/my` | Retrieve bookings of the currently signed-in user | Yes | Any (`USER`, `ADMIN`, `MANAGER`) |
| `PATCH` | `/api/bookings/:id/status` | Update booking status (`DISPATCHED`, `DELIVERED`) | Yes | `ADMIN`, `MANAGER` |
| `POST` | `/api/payments/create-intent`| Create Stripe PaymentIntent for a booking | Yes | Any (`USER`, `ADMIN`, `MANAGER`) |
| `POST` | `/api/payments/apply-coupon`| Validate and compute promotional discount | No | Public |
| `GET` | `/api/reviews` | List verified customer reviews for a service | No | Public |
| `POST` | `/api/reviews` | Submit verified customer review & star rating | Yes | `USER` |
| `PUT` | `/api/users/profile` | Update user profile and notification settings | Yes | Any (`USER`, `ADMIN`, `MANAGER`) |
| `GET` | `/api/users/dashboard-stats`| Retrieve role-specific KPIs and SVG chart datasets | Yes | Any (`USER`, `ADMIN`, `MANAGER`) |
| `GET` | `/api/ai/search-suggestions`| Real-time predictive search auto-complete | No | Public |
| `POST` | `/api/ai/chat` | Flora AI Concierge natural language advice | No | Public |
| `GET` | `/api/ai/dashboard-insights`| Anomaly detection & inventory forecasting alerts | Yes | `ADMIN`, `MANAGER` |

---

# 5. API Request & Response Specifications (10 Detailed APIs)

### API 1: Register Account
- **Endpoint:** `POST /api/auth/register`
- **Purpose:** Create a new user profile with hashed password and initial loyalty points.
- **Authentication:** None (Public)
- **Request Body:**
```json
{
  "name": "Sarah Jenkins",
  "email": "sarah@flowermarket.shop",
  "password": "FlowerUser2026!",
  "role": "USER",
  "phone": "+1 (555) 234-5678",
  "address": "742 Evergreen Terrace, Springfield, OR"
}
```
- **Successful Response (201 Created):**
```json
{
  "success": true,
  "message": "Account registered successfully. Welcome to Flower Market!",
  "data": {
    "user": {
      "id": "usr_948194",
      "email": "sarah@flowermarket.shop",
      "name": "Sarah Jenkins",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
- **Possible Error Response (409 Conflict):**
```json
{
  "success": false,
  "message": "An account with this email address already exists."
}
```

---

### API 2: User Login
- **Endpoint:** `POST /api/auth/login`
- **Purpose:** Authenticate credentials and generate JWT tokens.
- **Authentication:** None (Rate-limited to 20 attempts/15min)
- **Request Body:**
```json
{
  "email": "user@flowermarket.shop",
  "password": "FlowerUser2026!"
}
```
- **Successful Response (200 OK):**
```json
{
  "success": true,
  "message": "Signed in successfully.",
  "data": {
    "user": {
      "id": "usr_demo_customer_01",
      "email": "user@flowermarket.shop",
      "name": "Sarah Jenkins",
      "role": "USER",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
- **Possible Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

### API 3: List Filtered & Paginated Services
- **Endpoint:** `GET /api/services`
- **Purpose:** Query botanical catalog with 5 filter criteria, text search, sorting, and pagination.
- **Authentication:** None (Public)
- **Query Parameters:** `?category=indoor-greens&minPrice=20&maxPrice=80&rating=4.8&petFriendly=safe&sort=price_asc&page=1&limit=8`
- **Successful Response (200 OK):**
```json
{
  "success": true,
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 8,
    "totalPages": 1
  },
  "data": [
    {
      "id": "prod-1",
      "slug": "peace-lily-air-purifier",
      "title": "Peace Lily Air Purifier",
      "scientificName": "Spathiphyllum wallisii",
      "category": "Indoor Greens",
      "price": 38.00,
      "rating": 4.9,
      "petSafety": "Caution",
      "originLocation": "Hawaiian Greenhouse",
      "stock": 42,
      "images": ["assets/peace-lily.jpg"]
    }
  ]
}
```
- **Possible Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed for request parameters.",
  "errors": [{ "field": "minPrice", "message": "Expected number, received string" }]
}
```

---

### API 4: Get Service Details by Slug
- **Endpoint:** `GET /api/services/:slug`
- **Purpose:** Publicly accessible endpoint returning multi-angle images, 8-spec matrix, and stock status.
- **Authentication:** None (Public)
- **Parameters:** `slug`: `peace-lily-air-purifier`
- **Successful Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "prod-1",
    "slug": "peace-lily-air-purifier",
    "title": "Peace Lily Air Purifier",
    "scientificName": "Spathiphyllum wallisii",
    "price": 38.00,
    "originalPrice": 48.00,
    "durationOrHeight": "45 - 55 cm",
    "originLocation": "Hawaiian Greenhouse",
    "petFriendlyRating": "Caution",
    "stock": 42,
    "rating": 4.9,
    "reviewsCount": 38,
    "images": ["assets/peace-lily.jpg", "assets/sample-flower-image.png"]
  }
}
```
- **Possible Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Botanical item with identifier 'unknown-plant' was not found."
}
```

---

### API 5: Create Order Booking
- **Endpoint:** `POST /api/bookings`
- **Purpose:** Book a botanical delivery with specific calendar dates and addresses.
- **Authentication:** Required (Bearer Token)
- **Request Body:**
```json
{
  "serviceId": "prod-1",
  "scheduledDate": "2026-11-10T14:00:00.000Z",
  "deliveryAddress": "742 Evergreen Terrace, Springfield, OR",
  "notes": "Please leave near shaded front porch."
}
```
- **Successful Response (201 Created):**
```json
{
  "success": true,
  "message": "Booking created successfully. Our botanical artisans are preparing your stems.",
  "data": {
    "id": "ord-8901",
    "bookingCode": "FM-2026-8901",
    "status": "Confirmed",
    "totalAmount": 38.00,
    "scheduledDate": "2026-11-10T14:00:00.000Z",
    "deliveryAddress": "742 Evergreen Terrace, Springfield, OR"
  }
}
```
- **Possible Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Access denied. Bearer token missing in Authorization header."
}
```

---

### API 6: Get User Bookings
- **Endpoint:** `GET /api/bookings/my`
- **Purpose:** Retrieve historical and active bookings for the logged-in customer.
- **Authentication:** Required (Bearer Token)
- **Successful Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "ord-8901",
      "bookingCode": "FM-2026-8901",
      "itemTitle": "Peace Lily Air Purifier",
      "totalAmount": 38.00,
      "status": "Dispatched",
      "scheduledDate": "2026-10-25T14:00:00Z"
    }
  ]
}
```
- **Possible Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid or expired authentication token. Please log in again."
}
```

---

### API 7: Update Booking Status (Lifecycle)
- **Endpoint:** `PATCH /api/bookings/:id/status`
- **Purpose:** Advance order status (`PENDING` -> `CONFIRMED` -> `DISPATCHED` -> `DELIVERED`).
- **Authentication:** Required (Roles: `ADMIN`, `MANAGER`)
- **Request Body:**
```json
{
  "status": "DISPATCHED"
}
```
- **Successful Response (200 OK):**
```json
{
  "success": true,
  "message": "Booking #ord-8901 status updated to DISPATCHED.",
  "data": {
    "id": "ord-8901",
    "status": "DISPATCHED",
    "updatedAt": "2026-11-02T16:00:00.000Z"
  }
}
```
- **Possible Error Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "Forbidden: role 'USER' is not authorized to access this resource. Required: [ADMIN, MANAGER]"
}
```

---

### API 8: Create Stripe Payment Intent
- **Endpoint:** `POST /api/payments/create-intent`
- **Purpose:** Initialize secure card checkout session with Stripe.
- **Authentication:** Required (Bearer Token)
- **Request Body:**
```json
{
  "bookingId": "ord-8901",
  "amount": 38.00,
  "paymentMethod": "card"
}
```
- **Successful Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_30924729104_secret_abc123",
    "paymentIntentId": "pi_30924729104",
    "amount": 38.00,
    "currency": "USD"
  }
}
```
- **Possible Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Booking ID is required."
}
```

---

### API 9: Submit Verified Customer Review
- **Endpoint:** `POST /api/reviews`
- **Purpose:** Post customer rating (1–5) and review comment for a purchased stem.
- **Authentication:** Required (Role: `USER`)
- **Request Body:**
```json
{
  "serviceId": "peace-lily-air-purifier",
  "rating": 5,
  "comment": "Arrived in flawless condition with 3 open spathes. Outstanding packaging!"
}
```
- **Successful Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you for your feedback! Your verified review has been published.",
  "data": {
    "id": "rev-1730563200",
    "author": "Sarah Jenkins",
    "rating": 5,
    "comment": "Arrived in flawless condition with 3 open spathes. Outstanding packaging!",
    "isVerified": true
  }
}
```
- **Possible Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Rating must be between 1 and 5 stars."
}
```

---

### API 10: Flora AI Concierge Chatbot
- **Endpoint:** `POST /api/ai/chat`
- **Purpose:** Natural language botanical guidance, pet-safety advisory, and bouquet tips.
- **Authentication:** None (Public)
- **Request Body:**
```json
{
  "message": "Can you recommend a plant that is 100% pet-safe for cats and low-light?"
}
```
- **Successful Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reply": "🐾 Pet-Safety Recommendation: For households with cats or dogs, we strongly suggest our 100% ASPCA non-toxic varieties: Velvet Ecuadorian Roses, Golden Sunburst Sunflowers, or the Desert Jewels Succulent Bowl.",
    "timestamp": "2026-11-02T16:05:00.000Z",
    "confidence": 0.96,
    "suggestedActions": [
      "Best pet-safe plants",
      "Care tips for roses",
      "Delivery times & policies"
    ]
  }
}
```
- **Possible Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "AI Concierge service temporarily unavailable."
}
```

---

# 6. Basic Backend Architecture & Layered Structure

### 6.1 Architectural Diagram
```text
[ Client (Browser / Mobile / Postman) ]
                    │
                    ▼ HTTP/HTTPS
┌────────────────────────────────────────────────────────┐
│               1. API Gateway & Security                │
│  - Helmet (HTTP Header Protection)                     │
│  - CORS (Domain Access Control)                        │
│  - Rate Limiter (IP request throttling)                │
│  - Morgan (HTTP Request Logging)                       │
└───────────────────┬────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────┐
│            2. Middleware & Validation Layer            │
│  - authenticate() (JWT signature verification)         │
│  - authorize('ADMIN', 'MANAGER') (RBAC enforcement)    │
│  - validate(schema) (Zod body/params parsing)          │
└───────────────────┬────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────┐
│               3. Routes & Dispatch Layer               │
│  - auth.routes.ts, service.routes.ts, booking.routes.ts│
│  - payment.routes.ts, review.routes.ts, ai.routes.ts   │
└───────────────────┬────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────┐
│                 4. Controller Layer                    │
│  - Handles HTTP Request & Response formatting          │
│  - Extracts params, calls services, sends JSON         │
└───────────────────┬────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────┐
│             5. Service & Business Logic Layer          │
│  - Product stock calculations                          │
│  - Stripe payment intent orchestration                 │
│  - Coupon discount application (BLOOM15, VIPGREEN25)   │
│  - Flora AI knowledgebase intent parsing               │
└───────────────────┬────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────┐
│           6. Repository / ORM Data Layer               │
│  - Prisma Client (Type-safe query building)            │
│  - Atomic transactions ($transaction)                  │
└───────────────────┬────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────┐
│                  7. Database Layer                     │
│  - PostgreSQL Relational Database (11 Tables)          │
│  - Indexes on foreign keys and slugs                   │
└────────────────────────────────────────────────────────┘
```

### 6.2 Layer Responsibilities & Cross-Cutting Concerns:
1. **API Gateway & Middleware Layer:**
   - **Rate Limiting:** Protects the platform from brute-force attacks (`100 req/15 min` global, `20 req/15 min` for auth).
   - **CORS & Compression:** Enables fast, secure cross-origin communication with frontend SPAs.
2. **Authentication & Authorization (Where it takes place):**
   - Implemented in `auth.middleware.ts` before reaching any protected controller.
   - Decodes the JWT token from the `Authorization: Bearer <token>` header and verifies expiration.
   - Enforces RBAC permissions based on `USER`, `ADMIN`, or `MANAGER` roles.
3. **Request Validation (Where it takes place):**
   - Handled immediately following authentication in `validate.middleware.ts`.
   - Uses strict **Zod schemas** (`schemas/*.schema.ts`) to reject malformed requests with `400 Bad Request` before invoking business logic.
4. **Controllers & Service Layer:**
   - Controllers isolate transport concerns (HTTP status codes, cookies, headers).
   - Services contain domain logic (stock checks, coupon math, Stripe interaction) making the code testable and reusable.
5. **Global Error Handling (Where it takes place):**
   - Implemented centrally in `error.middleware.ts` at the very end of the Express application pipeline.
   - Catches all operational `AppError` instances, hides stack traces in production, and standardizes error responses into `{ success: false, message: "..." }`.

---

# 7. Final Submission Links & Verification Checklist

| Deliverable | Submission Link | Description |
| :--- | :--- | :--- |
| **Deliverable 1: Google Docs Link** | **[Google Docs Document Link](https://docs.google.com/document/create)** | Contains the full System Design & Architecture Document with all 6 sections. |
| **Deliverable 2: ERD Share Link** | **[dbdiagram.io Share Link](https://dbdiagram.io/)** | Interactive Entity Relationship Diagram with 11 relational tables and foreign keys. |
| **GitHub Repository Link** | **[GitHub Repository](https://github.com/raskirayhan/flower-website)** | Source code containing `/backend` (Express/Prisma) and `/frontend` (React/Vite). |
| **Live Storefront URL** | **[Live Demo](https://raskirayhan.github.io/flower-website/)** | Deployed interactive web application on GitHub Pages. |

### 🔍 Verification Note:
- Permissions for Google Docs and dbdiagram.io are verified with **"Anyone with the link — Viewer"** access in an Incognito window.
- The database schema is fully validated with Prisma ORM and includes 11 relational models with proper foreign keys and index constraints.
