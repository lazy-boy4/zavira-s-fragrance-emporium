# Zavira - Project Brief

## Overview

Zavira is a premium luxury perfume brand e-commerce platform. This document serves as the foundation for all development decisions and project scope.

## Brand Identity

- **Name**: Zavira Parfums
- **Tagline**: "Essence of the Noir" / "L'âme de la Nuit"
- **Position**: Ultra-premium, dark luxury fragrance house
- **Inspiration**: Dior.com aesthetic with dark luxury theme

## Core Requirements

### Business Goals

1. Create an e-commerce website for premium perfume sales
2. Enable customers to browse, explore, and purchase fragrances
3. Establish brand presence with immersive luxury experience
4. Support complete checkout flow with multiple payment options

### Target Audience

- Luxury fragrance enthusiasts
- Fashion-forward consumers seeking unique scents
- Gift purchasers looking for premium options
- International customers (multi-region support planned)

## Project Scope

### Phase 1: Frontend (Current)

- Complete visitor experience
### Phase 1: Full-Stack Next.js Migration (Current)

- **Architecture Strategy**: Single Next.js 16 application (App Router)
- **Backend Logic**: Secure Next.js API Routes (Serverless/Edge)
- **Database**: Supabase (PostgreSQL) with mandatory RLS
- **Authentication**: Supabase Auth (SSR)
- **Runtime**: Bun 1.3.5
- **Environment**: Dockerized Local Dev -> Vercel Production

### Phase 2: Secure Payment & Admin

- **Payment Processing**: Server-side API routes for bKash/Nagad
- **Admin**: Role-based access via Supabase RLS
- **Security**: Strict environment variable handling

## Key Features

### Must Have

- [x] Homepage with hero and featured products
- [x] Shop page with category filtering
- [x] Product detail pages
- [x] Shopping cart
- [x] Checkout flow (shipping, payment, confirmation)
- [x] Collections page
- [x] Brand story page
- [ ] Search functionality
- [ ] User authentication
- [ ] User profile management
- [ ] Footer link pages (policies, FAQ, etc.)

### Nice to Have

- Wishlist functionality
- Product reviews
- Loyalty program
- Newsletter integration
- Live chat support

## Technical Constraints

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Bun 1.3.5
- **Database**: Supabase (PostgreSQL 15+)
- **Security**: Mandated Row Level Security (RLS)
- **Sensitive Logic**: MUST run on server (API Routes)
- **Environment**: Docker for local, Vercel for production

## Success Metrics

- Clean, maintainable codebase
- Easy backend integration
- Responsive design across all devices
- Fast page load times
- Accessible UI components
