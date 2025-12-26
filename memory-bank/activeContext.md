# Zavira - Active Context

## Current Focus

Building complete visitor experience including:

1. Search functionality
2. Authentication pages (login/signup)
3. User profile page
4. Footer link pages (policies, FAQ, etc.)
5. Memory bank documentation

## Recent Changes

### Latest Session

- Created Memory Bank documentation structure
- Implementing search dialog component
- Building authentication pages
- Creating footer link pages

### Previous Sessions

- Built complete checkout flow (shipping, payment, confirmation)
- Created homepage with hero, featured products, newsletter
- Implemented shop page with category filtering
- Added product detail page
- Created cart page with quantity management
- Built collections and story pages

## Active Decisions

### Search Implementation

**Decision**: Use a modal/dialog for search rather than a separate page

**Reasoning**:

- Better UX for quick product discovery
- Matches luxury brand patterns (Dior, Chanel)
- Keeps user in context

### Authentication Approach

**Decision**: Create dedicated auth page with login/signup tabs

**Reasoning**:

- Clean separation of concerns
- Ready for backend integration
- Supports social auth expansion

### Form Validation

**Decision**: Use Zod schemas with react-hook-form

**Reasoning**:

- Type-safe validation
- Consistent error handling
- Easy backend sync

## Next Steps

### Immediate (This Session)

1. ~~Create search dialog component~~
2. ~~Build login/signup pages~~
3. ~~Create profile page~~
4. ~~Implement footer pages~~
5. ~~Update routing~~

### Short-term

1. Add cart state management (Context/Zustand)
2. Implement form validation with Zod
3. Add loading states and skeletons

### Medium-term

1. Backend API integration
2. Real authentication with JWT
3. Payment gateway integration
4. Order management

## Current Blockers

None currently. All development on track.

## Questions to Resolve

1. **Cart persistence**: localStorage vs API-backed?
2. **Auth provider**: Email/password only or include social?
3. **Payment options**: Stripe, bKash, or both?

## Files Being Modified

### This Session

- `src/components/search/SearchDialog.tsx` (new)
- `src/pages/Auth.tsx` (new)
- `src/pages/Profile.tsx` (new)
- `src/pages/PrivacyPolicy.tsx` (new)
- `src/pages/TermsOfService.tsx` (new)
- `src/pages/ShippingReturns.tsx` (new)
- `src/pages/FAQ.tsx` (new)
- `src/pages/Contact.tsx` (new)
- `src/pages/StoreLocator.tsx` (new)
- `src/App.tsx` (updated routes)
- `src/components/layout/Header.tsx` (search integration)

## Context for Next Developer

To continue this work:

1. Read all memory-bank files first
2. Check `progress.md` for what's complete
3. Review `systemPatterns.md` for coding standards
4. Follow existing component patterns
5. Use design tokens from `index.css`
