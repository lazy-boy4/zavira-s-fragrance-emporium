# Migration & Development Instructions

This document provides comprehensive instructions for migrating the Zavira frontend to Next.js and developing the backend.

---

## Part 1: Next.js Migration Instructions

### Overview
The current frontend is built with React + Vite + TypeScript. Migration to Next.js 14+ (App Router) with Bun is recommended.

### Pre-Migration Checklist
- [ ] Install Bun: `curl -fsSL https://bun.sh/install | bash`
- [ ] Create new Next.js project: `bunx create-next-app@latest zavira-nextjs --typescript --tailwind --eslint --app --src-dir`

### Step-by-Step Migration

#### 1. Project Structure Mapping

```
Current (Vite)              →  Next.js (App Router)
─────────────────────────────────────────────────────
src/pages/Index.tsx         →  src/app/page.tsx
src/pages/Shop.tsx          →  src/app/shop/page.tsx
src/pages/ProductDetail.tsx →  src/app/product/[slug]/page.tsx
src/pages/admin/Dashboard.tsx → src/app/admin/page.tsx
src/pages/admin/ProductList.tsx → src/app/admin/products/page.tsx
src/components/             →  src/components/ (keep as-is)
src/contexts/               →  src/contexts/ (wrap with 'use client')
src/hooks/                  →  src/hooks/ (keep as-is)
```

#### 2. Configuration Files

**next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
}
module.exports = nextConfig
```

**Copy these files as-is:**
- `tailwind.config.ts`
- `src/index.css` → `src/app/globals.css`
- `src/components/ui/*` (all shadcn components)

#### 3. Routing Migration

| Vite Route | Next.js Route |
|------------|---------------|
| `/` | `app/page.tsx` |
| `/shop` | `app/shop/page.tsx` |
| `/product/:slug` | `app/product/[slug]/page.tsx` |
| `/cart` | `app/cart/page.tsx` |
| `/checkout/shipping` | `app/checkout/shipping/page.tsx` |
| `/checkout/payment` | `app/checkout/payment/page.tsx` |
| `/admin` | `app/admin/page.tsx` |
| `/admin/products` | `app/admin/products/page.tsx` |
| `/admin/products/new` | `app/admin/products/new/page.tsx` |
| `/admin/products/:id` | `app/admin/products/[id]/page.tsx` |
| `/admin/orders/:id` | `app/admin/orders/[id]/page.tsx` |

#### 4. Layout Migration

**Root Layout (`app/layout.tsx`):**
```tsx
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

**Admin Layout (`app/admin/layout.tsx`):**
```tsx
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
```

#### 5. Client Components

Add `'use client'` directive to these files:
- All context providers (`AuthContext.tsx`, `CartContext.tsx`)
- Components using `useState`, `useEffect`, hooks
- Components using browser APIs
- Form components with `react-hook-form`

#### 6. Server Components (New)

Convert these to Server Components for better performance:
- Product listing pages (fetch data on server)
- Static content pages (Privacy, Terms, FAQ)
- SEO-critical pages

#### 7. API Routes

Create API routes in `app/api/`:
```
app/api/
├── auth/
│   ├── login/route.ts
│   ├── register/route.ts
│   └── logout/route.ts
├── products/
│   ├── route.ts (GET all, POST create)
│   └── [id]/route.ts (GET, PUT, DELETE)
├── orders/
│   └── ...
└── admin/
    └── ...
```

#### 8. Image Migration

Replace Vite imports with Next.js Image:
```tsx
// Before (Vite)
import heroImage from '@/assets/hero-perfume.jpg'
<img src={heroImage} alt="Hero" />

// After (Next.js)
import Image from 'next/image'
<Image src="/images/hero-perfume.jpg" alt="Hero" fill />
```

Move images: `src/assets/*` → `public/images/*`

#### 9. Dependencies Update

```bash
bun add next@latest react@latest react-dom@latest
bun add @tanstack/react-query zustand
bun add -d @types/node
```

Keep these packages:
- All `@radix-ui/*` packages
- `tailwindcss`, `tailwind-merge`, `tailwindcss-animate`
- `class-variance-authority`, `clsx`
- `react-hook-form`, `@hookform/resolvers`, `zod`
- `lucide-react`
- `recharts`
- `date-fns`

Remove:
- `vite`, `@vitejs/plugin-react`

---

## Part 2: Backend Development Instructions

### Technology Stack
- **Language**: Go 1.21+
- **Database**: PostgreSQL 15+
- **ORM**: sqlc or GORM
- **Router**: Chi or Gin
- **Auth**: JWT with refresh tokens

### Database Setup

Refer to `backendInstructions.md` for complete schema. Key tables:
- `users`, `user_roles` - Authentication & authorization
- `products`, `product_variants`, `product_images` - Product catalog
- `orders`, `order_items`, `order_events` - Order management
- `customers`, `customer_addresses` - Customer data
- `discounts` - Discount codes
- `store_settings`, `content_pages` - CMS

### API Endpoints Priority

**Phase 1 - Core (Week 1-2):**
1. Auth: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
2. Products: `/api/products`, `/api/products/:slug`
3. Collections: `/api/collections`

**Phase 2 - E-commerce (Week 3-4):**
1. Cart: `/api/cart`
2. Orders: `/api/orders`, `/api/orders/:id`
3. Checkout: `/api/checkout`

**Phase 3 - Admin (Week 5-6):**
1. Admin products CRUD
2. Admin orders management
3. Customer management
4. Analytics endpoints

### Bangladesh-Specific Integrations

#### Payment Gateways
1. **bKash** - [Developer Portal](https://developer.bka.sh)
2. **Nagad** - [Merchant API](https://nagad.com.bd/merchant)
3. **Uddokta Pay** - [API Docs](https://uddoktapay.com/api)

#### Delivery Partners
1. **Steadfast** - [API Integration](https://steadfast.com.bd/api)
2. **Pathao** - [Courier API](https://courier.pathao.com/api)
3. **RedX** - [Developer Docs](https://redx.com.bd/developer)

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/zavira

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# bKash
BKASH_APP_KEY=
BKASH_APP_SECRET=
BKASH_USERNAME=
BKASH_PASSWORD=
BKASH_BASE_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta

# Steadfast
STEADFAST_API_KEY=
STEADFAST_SECRET_KEY=

# Pathao
PATHAO_CLIENT_ID=
PATHAO_CLIENT_SECRET=
```

### Security Requirements
1. All passwords hashed with bcrypt (cost 12+)
2. JWT tokens with short expiry + refresh tokens
3. Rate limiting on auth endpoints
4. Input validation on all endpoints
5. SQL injection prevention (parameterized queries)
6. CORS configured for frontend domain only

---

## Part 3: Deployment

### Frontend (Next.js)
- **Vercel** (recommended) or **Netlify**
- Environment: `NEXT_PUBLIC_API_URL`

### Backend (Go)
- **Railway**, **Fly.io**, or **DigitalOcean App Platform**
- PostgreSQL managed instance

### Database
- **Supabase** (recommended) or **Neon**
- Enable Row Level Security

---

## Contact

For questions about this codebase, refer to:
- `memory-bank/backendInstructions.md` - Complete API spec
- `memory-bank/techContext.md` - Tech stack details
- `memory-bank/systemPatterns.md` - Architecture patterns
