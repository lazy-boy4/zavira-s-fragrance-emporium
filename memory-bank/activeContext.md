# Zavira - Active Context

## Current Status: Frontend Complete ✅

The frontend is fully implemented and ready for backend integration by Agent B.

## Agent Identification

- **Agent A** (Current): Frontend developer - React/Vite implementation
- **Agent B** (Next): Backend developer - Go/PostgreSQL/Supabase integration

## What Was Built (Agent A)

### Complete Feature List

1. **Storefront Pages**: Homepage, Shop, Product Detail, Collections, Story
2. **Checkout Flow**: Cart, Shipping, Payment, Confirmation
3. **User Features**: Auth, Profile, Search, Wishlist UI
4. **Footer Pages**: Privacy, Terms, Shipping, FAQ, Contact, Stores, Craftsmanship, Sustainability, Careers
5. **Admin Dashboard**: Complete Shopify-style admin panel with all modules

### Admin Panel Features

- Dashboard with stats, charts, quick actions
- Product management with unlimited variants
- Collection management
- Order management with timeline
- Customer management with tags
- Discount management (percentage, fixed, free shipping)
- Team management with roles
- Landing Page Editor with image upload
- Delivery Tracking (Steadfast, Pathao)
- Payment Settings (bKash, Nagad, Rocket, Upay, Uddokta Pay, COD)
- Shipping Settings (Bangladesh zones)
- Help Center
- Store Settings

## For Agent B: Getting Started

### Priority 1: Backend Setup

1. Read `backendInstructions.md` for complete database schema and API specs
2. Set up Supabase project with PostgreSQL
3. Implement authentication (email/password, roles)
4. Create database tables per schema

### Priority 2: Core Integrations

1. Product CRUD operations
2. Order management
3. Customer management
4. Image upload to Supabase Storage

### Priority 3: Bangladesh-Specific

1. Payment gateways (bKash, Nagad APIs)
2. Delivery partners (Steadfast, Pathao APIs)
3. Google Sheets real-time sync (see `dataIntegrationGuide.md`)

### Priority 4: Optional Migration

1. If migrating to Next.js, see `migrationInstructions.md`
2. Use Bun as runtime
3. Implement SSR for product pages

## Key Files to Review

| File | Purpose |
|------|---------|
| `designPhilosophy.md` | Color palette, typography, component patterns |
| `backendInstructions.md` | Database schema, API specs, auth system |
| `migrationInstructions.md` | Next.js migration guide |
| `dataIntegrationGuide.md` | Google Sheets integration |
| `systemPatterns.md` | Code architecture and patterns |
| `techContext.md` | Technology stack details |

## Design System Summary

### Colors (HSL format in index.css)

- **Background**: Dark charcoal (`--background`)
- **Foreground**: Light silver (`--foreground`)
- **Primary**: Gold accent (`--primary`)
- **Muted**: Soft gray (`--muted`)

### Typography

- **Display Font**: Cinzel (headings)
- **Body Font**: Montserrat (content)

### Component Patterns

- Use shadcn/ui components
- Create variants, don't override styles
- Use semantic tokens (never direct colors)
- Mobile-first responsive design

## Current Technical Stack

```
Frontend:
├── React 18 + TypeScript
├── Vite (build tool)
├── Tailwind CSS + shadcn/ui
├── React Router DOM (routing)
├── React Hook Form + Zod (forms)
├── TanStack Query (data fetching - ready for API)
└── Recharts (analytics charts)

Backend (To Be Implemented):
├── Supabase (auth, database, storage)
├── PostgreSQL (database)
├── Edge Functions (server logic)
└── External APIs (bKash, Steadfast, etc.)
```

## Testing Checklist for Agent B

After backend integration, verify:

- [ ] User can register and login
- [ ] Products load from database
- [ ] Cart persists across sessions
- [ ] Checkout flow completes with payment
- [ ] Orders appear in admin dashboard
- [ ] Admin can create/edit products
- [ ] Images upload to storage
- [ ] Discount codes apply correctly
- [ ] Data syncs to Google Sheets

## Notes

1. All forms have Zod validation - just connect to API
2. Admin routes at `/admin/*` need role-based protection
3. Cart context exists but uses mock data
4. Toast notifications are set up for user feedback
5. Loading skeletons implemented in analytics

## Contact

For questions about the frontend implementation, refer to:
- This memory bank for architecture decisions
- Component files for implementation details
- designPhilosophy.md for styling questions
