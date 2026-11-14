# Admin Storefront Settings Editor

## Goal
Replace the placeholder admin Settings screen with a complete editor for the existing validated `SiteConfig`. Keep settings browser-local for this phase, consistent with the approved Phase 1 boundary; do not add authentication, cloud persistence, or new backend services.

## Work
1. **Map the full configuration into clear editor sections:** brand identity/contact and logo references; SEO and appearance; announcement and header navigation; homepage hero, featured products, story, newsletter, and section order; footer and content pages; Bangladesh delivery zones, fees, thresholds, carriers, tax, COD rules, and available payment options.
2. **Build practical controls:** text and URL inputs, multiline content fields, on/off switches, numeric BDT inputs that preserve unset values as `null`, editable/reorderable list entries where the schema has arrays, and clear labels for Bangladesh-only currency/region settings. Avoid inventing delivery, COD, or tax amounts.
3. **Connect the form to `useSiteConfig`:** initialize from current settings, edit without changing saved values until submission, validate through the existing Zod schema before saving, show success/validation feedback, and provide reset-to-defaults with confirmation. Keep browser storage and cross-tab synchronization as implemented.
4. **Keep the admin route and owner-only navigation consistent** with the existing `/admin/settings` access. Avoid expanding unrelated shipping/payment mock screens in this change.
5. **Add a focused runnable check** for settings-editor transformations/validation if logic is extracted; verify nullable charges, Bangladesh/BDT/COD defaults, and save/reset behavior without asserting styling or copy.
6. **Verify** the focused check, inspect the preview at desktop and narrow widths, exercise edit → save → reload → reset, and check the latest preview build/runtime diagnostics.

## Technical notes
- Reuse the existing `SiteConfig`, `siteConfigSchema`, `useSiteConfig`, design-system inputs, switches, tabs, buttons, dialogs, and toast patterns.
- Keep the editor framework-neutral at the data boundary so Agent B can replace browser persistence with authenticated server-side persistence during the Next.js migration.
- Do not wire the editor to existing placeholder shipping/payment state or claim that browser-local edits are shared across users/devices.
