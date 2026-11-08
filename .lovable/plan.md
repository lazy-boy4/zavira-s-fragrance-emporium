# Phase 1 — Store Configuration Foundation

## Goal
Create a reusable, Next.js-portable source of truth for the store’s editable settings. In this phase, settings are saved only in the current browser; secure shared/cloud saving waits for real authentication during the Next.js migration.

## Subtasks

1. **Define the canonical configuration contract**
   - Add a TypeScript model and Zod validation for brand identity, contact/social details, announcement bar, header navigation, homepage sections and their order/visibility, footer link groups, informational/legal page content, and commerce/localization settings.
   - Include Bangladesh localization, BDT, COD, local payment options, delivery zones/carriers, and configurable delivery/tax fields. Rates and contact details without confirmed business values remain unset rather than being invented.
   - Keep the contract framework-neutral so the same shape can be used by the future Next.js app and its server-side data layer.

2. **Create safe, realistic defaults**
   - Use only verified existing brand/site content and requirements. Keep Zavira identity and the existing luxury design direction; set Bangladesh/BDT and COD as required.
   - Avoid placeholder US contact details and guessed shipping, VAT, or product prices. Represent unknown values as empty or unconfigured.

3. **Add browser-only settings storage**
   - Implement a small settings store using a versioned localStorage key, Zod validation on reads, defaults when stored data is absent or invalid, and a reset-to-defaults action.
   - Keep browser APIs out of module initialization so the contract remains safe to import in a future server-rendered Next.js app.
   - Synchronize changes across tabs in the same browser; do not imply cross-device or multi-user persistence.

4. **Expose the store to the current app**
   - Add a React provider/hook and mount it at the app root, exposing the current config, update/save, and reset operations.
   - Do not yet refactor the storefront or build the full customization controls; those belong to later phases that will consume this foundation.

5. **Document the migration boundary**
   - Add the structural decision to the root `AGENTS.md` and update only the relevant Next.js migration notes: the config is portable, browser storage is temporary, and Agent B should replace it with authenticated server-side persistence.
   - Defer the final full migration-plan refresh until all requested UI/UX work is complete, as previously requested.

6. **Verify the foundation**
   - Add a small runnable test for the config’s required Bangladesh/BDT/COD defaults and malformed stored-data fallback.
   - Run that test and the project’s normal preview/build verification; confirm existing routes still render and no settings are lost when data is invalid.

## Out of scope for Phase 1

- Real sign-in, role enforcement, or cloud/database persistence.
- Admin editing screens for every setting.
- Refactoring public pages, checkout calculations, or every hardcoded text/image to consume the new config.
- Final migration-plan completion before the remaining UI/UX phases are finished.

## Technical approach

Use the project’s existing React, TypeScript, Zod, and browser storage. Keep defaults, validation, and storage access in focused modules, with no new dependency. No database migration is planned in this phase because the chosen persistence is browser-only and real authentication is deferred.
