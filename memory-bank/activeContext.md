# Zavira - Active Context

## Current Status: Ready for Deployment 🚀

The **Frontend Migration** is complete. The codebase is clean, structured for Next.js 16, and ready to be pushed to GitHub.
The **Backend Architecture** is defined, but requires a live Supabase project to activate.

## Agent Identification

- **Agent A** (Current): Full-stack Developer (Next.js/Supabase)
- **Agent B** (Next): Deployment & Integration Specialist

## Active Roadmap

1.  **Repository Setup (Immediate)**:
    - [x] Cleanup legacy files.
    - [x] Configure build scripts.
    - [ ] **Action**: Push to GitHub (User Task).

2.  **Infrastructure Setup**:
    - [ ] **Vercel**: Import repo and deploy.
    - [ ] **Supabase**: Create project, apply migrations (`supabase/migrations`), get API keys.
    - [ ] **Google Cloud**: Enable Sheets API, get Service Account credentials (for Sync feature).

3.  **Integration (Post-Deployment)**:
    - [ ] **Connect DB**: Add `NEXT_PUBLIC_SUPABASE_URL` & `ANON_KEY` to Vercel env vars.
    - [ ] **Hydrate App**: Replace mock data files (`src/data/*.ts`) with Supabase API calls.
    - [ ] **Implement Sheets Sync**: Create `src/lib/sheets.ts` service and connect to Order webhook.

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v3
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel
- **External Integration**: Google Sheets API (v4)

## Recent Changes
- Migrated all utility pages (Terms, Privacy, etc.).
- Cleaned up `@frontend-legacy` and `frontend` folders.
- Defined Google Sheets Sync as a core requirement.

## Notes for Next Session
- The local development server (`bun dev`) runs successfully but cannot connect to local Supabase due to environment restrictions.
- **Verification**: The build command (`bun run build`) passes, ensuring the codebase is production-ready.
