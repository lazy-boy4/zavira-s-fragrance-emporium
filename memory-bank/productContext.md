# Product Context

## Project Name
Zavira's Fragrance Emporium

## Project Description
A high-end, luxury e-commerce platform for an exclusive perfume brand. The design emphasizes minimalism, elegance, and a premium user experience ("dark mode" aesthetic with gold accents).

## Core Philosophy
- **User Experience**: Seamless, SPA-like transitions (Next.js), instant feedback, and high-performance.
- **Design**: "Dark luxury" aesthetic. Minimalist but rich in texture (images, typography).
- **Architecture**: Full-stack Next.js (React Server Components) for SEO and performance, backed by Supabase for reliability.

## Key Features

### 1. Storefront
- **Home**: Brand storytelling, featured collections, sensory imagery.
- **Shop**: Filterable product grid (Category, Scent Profile, Price).
- **Product Detail**: High-res imagery, scent breakdown (Top/Heart/Base notes), "Add to Cart".
- **Collections**: curated groupings of products.

### 2. User Accounts
- **Authentication**: Email/Password login (Supabase Auth).
- **Profile**: Order history, saved addresses, wishlist.
- **Cart**: Persistent cart (database-backed for logged-in users, local storage for guests).

### 3. Checkout & Operations
- **Checkout Flow**: Multi-step (Shipping -> Payment -> Confirmation).
- **Payments**: Integration with local gateways (bKash, Nagad) and standard cards (Stripe ready).
- **Delivery**: Integration with local courier APIs (Steadfast, Pathao).

### 4. Admin Dashboard
- **Overview**: Sales analytics, order statuses, inventory alerts.
- **Management**: CRUD operations for Products, Orders, Customers, Collections.
- **Marketing**: Discount code management, Landing page content editor.

### 5. Data Integration (New Requirement)
- **Google Sheets Sync**: Real-time "Shadow Database" for operational visibility.
  - **Orders Sheet**: New rows for every placed order.
  - **Inventory Sheet**: Real-time stock level updates.
  - **Customers Sheet**: New user registrations.
  - **Goal**: Allow non-technical staff to view/manage operations via Sheets without accessing the Admin Dashboard.

## Domain Model (Simplified)

- **User**: Profile, Role (Admin/Customer).
- **Product**: Details, Pricing, Variants (Sizes), Inventory, Scent Profile.
- **Order**: Status, Payment Status, Items, Shipping Info.
- **Collection**: Grouping of products.

## Success Metrics
1.  **Performance**: Core Web Vitals (LCP, FID, CLS) in the "Green" zone.
2.  **Reliability**: 99.9% uptime (Vercel/Supabase SLA).
3.  **Operational Efficiency**: Real-time sync to Google Sheets reduces manual data entry to 0.
