# Component Migration Plan

## Overview
This plan outlines the migration of remaining legacy React components to Next.js 16. The focus is on adapting to the App Router architecture, implementing Server Components where possible, and adhering to strict Vercel best practices.

## Guidelines Reference
- **No Waterfalls**: Use `Promise.all` or `Suspense` boundaries.
- **Next.js Native**: Replace `<img>` with `<Image>`, `<a>` with `<Link>`.
- **Imports**: No barrel files. Import directly from component paths.
- **Directives**: Explicitly mark Client Components with `"use client"`.

## Migration Status

### ✅ Completed
- UI Library (`shadcn/ui`)
- Layout Components (`Header`, `Footer`)
- Home Page Components (`Hero`, `FeaturedProducts`, `BrandStory`, `Newsletter`)
- Global Providers (`Toaster`, `Sonner`)

### ⏳ Pending Migration

#### Phase 1: Admin Dashboard (High Priority)
The admin dashboard is complex and requires careful migration of stateful logic.
- [ ] `components/admin/AdminLayout.tsx` -> `app/admin/layout.tsx`
- [ ] `components/admin/AdminSidebar.tsx`
- [ ] `components/admin/AdminHeader.tsx`
- [ ] `components/admin/AnalyticsChartSkeleton.tsx`
- [ ] `components/admin/ImageUploader.tsx` (Critical for product management)
- [ ] `pages/admin/*` -> `app/admin/*` (convert pages to Server Components where possible)

#### Phase 2: Core Shop Pages
- [ ] `pages/Shop.tsx` -> `app/shop/page.tsx` (Server Component for initial fetch)
- [ ] `pages/ProductDetail.tsx` -> `app/product/[slug]/page.tsx`
- [ ] `pages/Collections.tsx` -> `app/collections/page.tsx`

#### Phase 3: Checkout & User Flow
- [ ] `contexts/CartContext.tsx` -> `providers/CartProvider.tsx`
- [ ] `pages/Cart.tsx` -> `app/cart/page.tsx`
- [ ] `pages/Checkout*.tsx` -> `app/checkout/*`
- [ ] `pages/Auth.tsx` -> `app/(auth)/*`
- [ ] `pages/Profile.tsx` -> `app/account/profile/page.tsx`

#### Phase 4: Content Pages
- [ ] `pages/About.tsx`, `Contact.tsx`, etc. -> `app/(content)/*`

## Migration Checklist (Per Component)
1.  **Copy**: Move file to `src/app/...` or `src/components/...`.
2.  **Directives**: Add `"use client"` if using hooks/state.
3.  **Routing**: Replace `useNavigate`/`Link` (react-router) with `useRouter`/`Link` (next/navigation).
4.  **Images**: Replace `<img>` with `next/image`.
5.  **Optimization**: Check for waterfalls; use `Suspense` if data fetching is involved.
6.  **Validation**: Run `coderabbit` to verify changes.

## Execution Order
1.  **Admin Layout & Sidebar** (Foundation for Admin)
2.  **Admin Dashboard & Analytics**
3.  **Product Management** (requires ImageUploader)
4.  **Shop & Product Detail** (Customer facing)
5.  **Checkout Flow**
