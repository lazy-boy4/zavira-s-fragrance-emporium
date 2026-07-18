# Admin Redesign + Shop Filters + Checkout Polish

Three focused passes, all presentation-only. No data, routing, or auth changes.

## 1. Admin: Midnight & Bronze skin (role nav unchanged)

Keep every route, permission, and `AdminSidebar` role filter exactly as-is. Only visuals change.

- **AdminLayout**: wrap in `<div className="dark ...">` so admin inherits the same midnight tokens as the storefront. Background `bg-midnight`, text `text-ivory`.
- **AdminSidebar**: `bg-midnight-surface`, hairline `border-bronze/20` right edge, Karla wide-tracked labels (`font-sans-luxury tracking-[0.2em] text-xs uppercase`), bronze active state (bronze left rule + `text-bronze` instead of solid primary block). Logo wordmark in italic Cormorant. Collapse chevron in bronze.
- **AdminHeader**: transparent over midnight, hairline bronze bottom rule, Karla search input with underline-only styling.
- **Page chrome pass** (Dashboard, Products, Orders, Customers, Discounts, Analytics, Landing Page, Content, Shipping, Delivery, Payments, Team, Settings, Help):
  - Page titles: swap `font-display tracking-wider` → italic Cormorant with a small bronze eyebrow (e.g. `Volume — Commerce`).
  - Cards: `bg-midnight-surface border border-bronze/15`, bronze hairline dividers, italic Cormorant for KPI numbers.
  - Tables: bronze header rules, muted row separators, italic price cells.
  - Buttons: primary already maps to bronze via token; verify contrast, tune hover to bronze-deep sweep.
  - Charts (Analytics): keep existing `--chart-*` tokens — they already read well on midnight.
- **Guardrail**: no logic edits in admin pages. Only className changes and eyebrow/label text tweaks.

## 2. Shop + Collections: filters & sorting

Client-side only, operating on the existing mock arrays in `Shop.tsx` and `Collections.tsx`. Backend swap remains a one-line change later.

- **Shop filter bar** (sticky under editorial header, hairline bronze frame):
  - Collection (Noir / Elixir / Rose / Amber / All) — chip row, bronze underline for active.
  - Price range — dual slider, bronze track.
  - Fragrance family (if present in product data; otherwise skip cleanly).
  - Sort: Featured, Price ↑, Price ↓, Newest — Karla small-caps dropdown, underline-only.
  - Results count in italic Cormorant ("Twelve compositions").
  - Empty state: italic "No compositions match" + reset link.
- **Collections page**: add the same sort control (Featured / A–Z / Newest) above the 2-col grid. Filtering is less relevant here (only 4 collections), so filters are Shop-only.
- **URL sync**: reflect filters in `?collection=&sort=&min=&max=` via `useSearchParams` so the existing `/shop?collection=noir` deep links keep working.
- **State**: local `useState` + `useMemo` derived list. No context, no new hooks.

## 3. Cart + Checkout: luxury motion & loading states

Micro-polish only, using the existing `useReveal`, `animate-reveal`, `animate-float`, and hairline-expand patterns from the landing pass. No new keyframes.

- **Cart**:
  - Row entrance: staggered `useReveal` per line item.
  - Quantity change: bronze hairline pulse under the row on update.
  - Remove: fade-out + height collapse before unmount (200ms).
  - Subtotal/total: italic Cormorant, animate number tween on change (simple `useEffect` interpolation, 300ms).
  - Empty cart: italic "Your atelier is empty" with bronze CTA back to Shop.
- **CheckoutShipping / CheckoutPayment**:
  - Step indicator (01 · Shipping — 02 · Payment — 03 · Confirmation) in Karla small-caps with bronze active numeral.
  - Section reveal on mount (staggered).
  - Submit button: bronze fill-sweep on hover; on submit, swap label to `<Loader2 className="animate-spin" /> Processing` and disable — using local `isSubmitting` state around the existing navigate call. No fake delays; just wire the state so backend integration slots in.
  - Field focus: bronze underline expand (already the pattern).
- **OrderConfirmation**:
  - Hero checkmark: bronze ring, single scale-in on mount.
  - Order summary card floats in with the existing reveal pattern.

## Verification

Playwright pass, desktop + mobile viewports:
- `/admin`, `/admin/products`, `/admin/analytics`, `/admin/orders` — palette applied, sidebar readable, active state visible, role filtering unchanged (spot check by toggling `userRole` const).
- `/shop` — filter/sort works, URL updates, empty state renders when filters exclude everything.
- `/collections` — sort control works.
- `/cart` → `/checkout/shipping` → `/checkout/payment` → `/checkout/confirmation` — motion smooth, loading state appears on submit, no console errors.

## Out of scope

- Data hooks, auth, routing, backend
- New assets or copy rewrites beyond eyebrows/labels
- New animation keyframes or design tokens
- Admin business logic, role permissions, table columns
