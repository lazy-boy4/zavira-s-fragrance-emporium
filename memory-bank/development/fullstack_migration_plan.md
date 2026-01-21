# Full-Stack Next.js Migration Plan

## 1. Goal
Migrate Zavira from a distributed React+Go architecture to a unified, secure Full-Stack Next.js 16 application. This eliminates the complexity of efficient state sync and ensures payment security via server-side API routes.

## 2. Architecture

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI (Migrated from legacy)
- **State**: React Context (Cart, UI) + Supabase Auth

### Backend (Serverless)
- **Runtime**: Bun 1.3.5
- **Database**: Supabase PostgreSQL (Managed)
- **Auth**: Supabase Auth (SSR w/ Middleware)
- **API**: Next.js API Routes (`/app/api/...`)
    - Payment Processing (bKash, Nagad)
    - Webhooks
    - Admin Actions

## 3. Implementation Steps

### Step 1: Foundation (Current)
- [x] Initialize Next.js 16 with Bun.
- [x] Configure Docker.
- [x] Setup Supabase SSR Utils.

### Step 2: Component & Page Migration
- Move `frontend-legacy/src/components/ui` -> `src/components/ui`.
- Move `frontend-legacy/src/lib/utils.ts` -> `src/lib/utils.ts`.
- Port `Home.tsx` -> `app/page.tsx` (Use Server Components).
- Port `Shop.tsx` -> `app/shop/page.tsx`.

### Step 3: Security & Database
- Define SQL schema in `supabase/migrations`.
- **CRITICAL**: Apply RLS policies to `products`, `cart_items`, `orders`.
- Create `src/lib/supabase/admin.ts` for privileged server-side operations (using `SUPABASE_SERVICE_ROLE_KEY` - only on server!).

### Step 4: Payments
- Implement `POST /api/payment/create`:
    - Validate inputs (Zod).
    - Create pending order in DB.
    - Call Gateway (Mock for now).
    - Return payment URL.

### Step 5: Deployment
- Verify build with `bun run build`.
- Document Vercel env vars.

## 4. Verification
- **Auth**: User can sign up/login (Cookie-based session).
- **Cart**: Persists via RLS (synced to DB).
- **Checkout**: User is redirected to mock gateway and back.
- **Admin**: Only admin role can access endpoints.
