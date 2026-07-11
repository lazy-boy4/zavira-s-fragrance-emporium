# Zavira Landing Page — Artistic Gallery Motion Redesign

Rebuild the public landing page (`/`) with the chosen direction. Keep dark luxury essence, add artistic zigzag composition, sculptural framing, and cinematic reveal motion. Palette, fonts, and layout are locked from the visual picks.

## Locked design tokens

- Palette: `#08080d` (background), `#12121c` (surface), `#5a3a24` (bronze deep), `#b8864a` (bronze accent), plus off-white for foreground text.
- Typography: Cormorant Garamond (display, italic emphasis), Karla (body, wide-tracked eyebrows).
- Layout: alternating zigzag bands, oversized italic headlines, hairline bronze frames, vertical side-labels, index numerals.
- Motion: slow cubic-bezier reveals (`fadeInUp` + blur), 6s float on framed images, staggered delays, hover underline/scale on links and image plinths.

## Scope

Only the public-facing landing page and its sections. Admin, cart, checkout, product pages untouched. Header/Footer keep structure but adopt the new type/palette tokens so they don't clash.

## Files to change

1. `src/index.css`
   - Add Cormorant Garamond + Karla to the Google Fonts import (keep existing fonts for admin/rest of site working; Playfair/Inter stay for admin).
   - Add new dark-luxury tokens on `.dark`: `--bronze`, `--bronze-deep`, `--midnight`, `--midnight-surface`, refined `--foreground`/`--muted-foreground` for the landing tone.
   - Add keyframes: `fadeInUp` (with blur), `float`, `drawLine`, `slowZoom`. Add `.animate-reveal`, `.animate-float`, `.delay-1/2/3/4` utilities.

2. `tailwind.config.ts`
   - Register `bronze` / `bronze-deep` / `midnight` color tokens (HSL bound to CSS vars).
   - Add font families `serif-display: Cormorant Garamond` and `sans-luxury: Karla` (kept alongside existing `display`/`body` so admin is unaffected).

3. `src/components/home/Hero.tsx` — rebuild
   - Asymmetric 12-col grid: framed floating product image left (with `-top/-left` bronze corner rule and offset `#12121c` backdrop card), content right.
   - Eyebrow "Volume I — L'Atelier" in Karla wide tracking bronze-deep.
   - Headline "ZAVIRA" + italic bronze "Cinétique" in Cormorant, staggered `animate-reveal`.
   - Body paragraph, primary CTA button with bronze fill sweep on hover, meta grid (Notes / Vibe).
   - Vertical side label "Essence of Midnight" rotated 90° at right edge (lg+).
   - Image slot uses existing `heroPerfume` asset via `<img>` inside the framed container with `animate-float`.

4. `src/components/home/FeaturedProducts.tsx` — restyle as zigzag gallery
   - Convert current grid into 3 alternating full-bleed bands (image left / right / left).
   - Each band: index numeral `01` / `02` / `03` in oversized ghosted Cormorant, italic bronze accent word in title, hairline bronze rule that expands on hover of the CTA link, slow-zoom image on hover.

5. `src/components/home/BrandStory.tsx` — restyle
   - Centered manifesto pull-quote in italic Cormorant, thin vertical bronze gradient line above, small-caps signature below (`— The Zavira Manifesto`), reveal on scroll.

6. `src/components/home/Newsletter.tsx` — restyle
   - Dark surface band with hairline bronze frame, italic Cormorant heading, Karla body, input with underline-only bronze border, CTA matching hero style.

7. `src/components/layout/Header.tsx` — light retouch only
   - Swap nav link tracking + color to match new palette; add subtle bottom-fade separator; keep component structure.

8. `src/components/layout/Footer.tsx` — light retouch only
   - Adopt new tokens (bronze accents on headings, Karla eyebrows). No structural change.

9. `src/pages/Index.tsx`
   - No structural change; ensures section order is Hero → FeaturedProducts (zigzag) → BrandStory → Newsletter. Confirm `dark` class stays.

## Motion budget (intensity 4/5)

- Hero: staggered reveal on load (eyebrow → headline → body → CTA/meta) with 0.2s stepped delays, blur-to-clear.
- Image plinths: 6s ease-in-out floating drift; hover scales 1→1.03 with 700ms cubic-bezier.
- Zigzag sections: `IntersectionObserver` (via one small hook `useReveal`) toggles `.animate-reveal` when the band enters viewport — avoids replaying on scroll-back and gives cinematic feel.
- Link chevrons: 12px→20px hairline expansion on hover.
- No bouncy easing anywhere.

## Verification

- `bun run build` (via harness) — clean typecheck.
- Playwright: navigate `/`, screenshot desktop (1280) and mobile (390), confirm hero framed image, zigzag alternation, italic bronze accents, staggered reveal completed.
- Confirm no admin pages broke by loading `/admin` and checking header/nav still render.

## Out of scope

- No changes to admin panel, product catalog logic, cart, or backend hooks.
- No new assets generated; reuse existing `heroPerfume` and product images. If additional imagery is required later, that's a follow-up.
