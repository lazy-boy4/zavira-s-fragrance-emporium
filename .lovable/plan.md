# Extend Midnight & Bronze Redesign Site-Wide

Propagate the landing page's artistic gallery aesthetic (Midnight & Bronze palette, Cormorant Garamond × Karla type, zigzag/asymmetric composition, cinematic reveal motion) across every public-facing page. Admin panel stays untouched.

## Scope

**In scope (public pages):**
- `src/pages/Shop.tsx`, `Collections.tsx`, `ProductDetail.tsx`
- `src/pages/Story.tsx`, `Craftsmanship.tsx`, `Sustainability.tsx`, `Careers.tsx`, `Contact.tsx`, `StoreLocator.tsx`
- `src/pages/FAQ.tsx`, `ShippingReturns.tsx`, `PrivacyPolicy.tsx`, `TermsOfService.tsx`
- `src/pages/Auth.tsx`, `Cart.tsx`, `CheckoutShipping.tsx`, `CheckoutPayment.tsx`, `OrderConfirmation.tsx`, `Profile.tsx`, `NotFound.tsx`
- `src/components/layout/Header.tsx`, `Footer.tsx` (deeper pass than the landing-only retouch)
- `src/components/search/SearchDialog.tsx`

**Out of scope:**
- Anything under `src/pages/admin/**` and `src/components/admin/**`
- Data hooks, contexts, business logic, backend
- New assets (reuse existing imagery)

## Design system reuse

No new tokens. Everything already exists in `src/index.css` + `tailwind.config.ts`:
- Palette: `bg-midnight`, `bg-midnight-surface`, `text-bronze`, `text-bronze-deep`, `text-ivory`, `border-bronze/30`
- Type: `font-serif-display` (headings, italic accents), `font-sans-luxury` (body, wide-tracked eyebrows)
- Motion: `useReveal` hook + `reveal-hidden`/`reveal-shown`, `animate-reveal`, `animate-float`, `delay-100/200/300/500/700`, `vertical-rl`

Every public page wraps in `<div className="dark min-h-screen bg-midnight text-ivory">` to guarantee the palette.

## Page-by-page moves

**Header/Footer (deeper pass)**
- Header: transparent over midnight, hairline bronze bottom rule when scrolled, Karla wide-tracked nav links, bronze underline on hover/active.
- Footer: midnight-surface band, bronze section headings in Karla small-caps, italic Cormorant brand mark, hairline bronze dividers.

**Shop / Collections**
- Editorial header: eyebrow ("Volume II — Le Catalogue"), oversized italic Cormorant title with bronze accent word, hairline rule.
- Product grid → asymmetric card grid on framed plinths (hairline bronze corner rules, slow-zoom on hover, italic price in bronze).
- Filter/sort bar: minimal, underline-only controls, Karla labels.

**ProductDetail**
- Two-column asymmetric: framed floating image (animate-float) left, content right with vertical side label, staggered reveal.
- Notes/details in Karla wide-tracking, italic Cormorant price, bronze CTA with fill sweep.

**Story / Craftsmanship / Sustainability / Careers**
- Zigzag manifesto bands (image/text alternating), index numerals (`01`, `02`…) as ghosted Cormorant, italic bronze accent words, reveal on scroll.
- Pull-quote sections mirror BrandStory pattern.

**Contact / StoreLocator**
- Split layout: editorial intro left, form/map right inside hairline bronze frame. Underline-only inputs matching Newsletter.

**FAQ / ShippingReturns / PrivacyPolicy / TermsOfService**
- Editorial single-column: eyebrow + italic display title, bronze section rules, Cormorant question headings, Karla body. Legal pages get a subtle bronze index rail.

**Auth**
- Centered midnight-surface card with hairline bronze frame, italic Cormorant heading, underline inputs, bronze CTA. Two tabs styled as small-caps Karla with bronze underline for active.

**Cart / Checkout (Shipping, Payment) / OrderConfirmation**
- Dark surface panels, bronze section dividers, italic totals in Cormorant, underline inputs, bronze primary CTAs. Checkout steps as small-caps Karla with bronze index numerals.

**Profile**
- Sidebar-style nav in Karla small-caps with bronze active indicator, content in framed midnight-surface panels.

**NotFound**
- Oversized italic "404" in Cormorant with bronze glow, Karla eyebrow, single bronze CTA back home.

**SearchDialog**
- Midnight-surface panel, bronze hairline frame, Karla input, italic result titles.

## Motion budget

Same as landing: staggered `useReveal` on section entry, 6s float on hero/product images, 700ms cubic-bezier hover scales, hairline expansion on link hover. No new keyframes.

## Technical notes

- Only presentation code changes. No hooks, contexts, routes, or data logic touched.
- Only `text-*`/`bg-*` semantic token classes — no hex, no `text-white`/`bg-black`.
- Reuse existing components (Button, Input, Card) with new wrapper classes rather than forking variants.
- Verify with a Playwright pass across `/shop`, `/collections`, `/story`, `/auth`, `/cart`, `/contact`, `/faq`, and `/404` on desktop + mobile, plus a smoke check on `/admin` to confirm no regression.

## Out of scope

- Admin panel styling
- New imagery, icons, or assets
- Copywriting rewrites beyond eyebrows/section labels
- Any backend, data, or routing change
