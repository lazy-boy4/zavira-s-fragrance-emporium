# OpenCode Agent Instructions

> **CRITICAL**: You MUST read and internalize **this entire file** and the complete Memory Bank before taking ANY action on this project.

## Your Mission

You are an AI agent tasked with continuing development of the **Zavira e-commerce platform**. This is a **Full-Stack Next.js 16** application for a luxury perfume brand. Your effectiveness depends entirely on understanding the project's history, architecture decisions, and current state.

---

## Mandatory Reading Order

**Do NOT skip any files. Read them in this exact sequence:**

### Step 1: Understand the Memory Bank System
```
memory-bank/memory bank description.md
```
This explains HOW the memory bank works and why it exists. Understand the file hierarchy and update protocols.

### Step 2: Core Project Files (Read in Order)
```
1. memory-bank/projectbrief.md       → Foundation: scope, goals, constraints
2. memory-bank/productContext.md     → WHY this project exists, user needs
3. memory-bank/techContext.md        → Technology stack, dependencies, setup
4. memory-bank/systemPatterns.md     → Architecture, patterns, payment flow
5. memory-bank/activeContext.md      → CURRENT state, recent decisions, active tasks
6. memory-bank/progress.md           → What works, what's left, known issues
```

### Step 3: Development Context
```
memory-bank/development/task.md                   → Task checklist with phases
memory-bank/development/fullstack_migration_plan.md → Detailed migration plan
```

### Step 4: Specialized Guides
```
memory-bank/designPhilosophy.md      → UI/UX principles, color system, typography
memory-bank/backendInstructions.md   → API patterns, security, RLS policies
memory-bank/dataIntegrationGuide.md  → External integrations (bKash, Google Sheets)
memory-bank/migrationInstructions.md → Legacy migration procedures
```

---

## Key Project Context

### What Is Zavira?
- **Type**: Luxury perfume e-commerce platform
- **Brand**: "Essence of the Noir" - dark luxury aesthetic
- **Inspiration**: Dior.com with premium dark theme

### Critical Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js 16 Full-Stack** | Unified frontend/backend, simpler deployment, tighter Supabase integration |
| **Bun Runtime** | Performance, faster installs, modern tooling |
| **Supabase + RLS** | Database-level security, no custom auth code needed |
| **API Routes for Payments** | Sensitive operations MUST run server-side, never expose keys |
| **Drop Go Backend** | Complexity reduction - Next.js API Routes are sufficient |

### Security Mandates (NON-NEGOTIABLE)

1. **Row Level Security (RLS)** is MANDATORY on all Supabase tables
2. **Payment API keys** must NEVER appear in client code
3. Use `NEXT_PUBLIC_` prefix ONLY for browser-safe values
4. All payment flows execute via `/api/payment/*` server routes
5. Admin routes require role verification via RLS policies

---

## Current Project State

### What's Complete ✅
- Next.js 16 project structure with Bun
- Docker development environment
- Supabase client/server utilities
- Authentication middleware skeleton
- Legacy component migration (Header, Footer, UI components)
- Global Providers (QueryClient, Tooltip, Toaster)
- Facebook Pixel integration

### In Progress 🔄
- Component migration from `frontend-legacy/`
- RLS policy definitions
- Payment API route implementation

### Pending ⏳
- Full page migration to App Router
- Admin dashboard protection
- bKash/Nagad payment integration
- Steadfast delivery integration

---

## How to Continue Development

### Before Any Work
1. ✅ Read ALL memory bank files (non-negotiable)
2. ✅ Check `activeContext.md` for current priorities
3. ✅ Review `progress.md` for known issues
4. ✅ Examine `systemPatterns.md` for architecture constraints

### During Work
1. Follow existing patterns in `systemPatterns.md`
2. Use the design tokens defined in `globals.css` (never hardcode colors)
3. Keep sensitive operations server-side (API Routes/Server Actions)
4. Update `activeContext.md` when making significant decisions

### After Completing Work
1. Update `progress.md` with what was accomplished
2. Update `activeContext.md` with any new decisions or context shifts
3. If you discovered new patterns, document them in appropriate files

---

## Directory Structure Reference

```
zavira-s-fragrance-emporium/
├── src/
│   ├── app/              ← Next.js App Router (pages, layouts, API routes)
│   ├── components/       ← React components (ui/, layout/, home/, search/)
│   ├── contexts/         ← React contexts (AuthContext, CartContext)
│   ├── hooks/            ← Custom React hooks
│   └── lib/              ← Utilities (supabase/, utils.ts, validations.ts)
├── public/assets/        ← Static assets (images, logos)
├── frontend-legacy/      ← Old React+Vite code (migration source)
├── memory-bank/          ← Project documentation (YOU ARE HERE)
└── docker-compose.yml    ← Local development environment
```

---

## Commands Reference

```bash
# Development
bun install           # Install dependencies
bun run dev           # Start development server

# Docker
docker-compose up     # Start full environment
docker-compose down   # Stop services

# Build
bun run build         # Production build
```

---

## Final Reminders

> **Your memory resets between sessions.** The Memory Bank is your ONLY source of truth.

1. **READ EVERYTHING** before acting
2. **Understand WHY** decisions were made, not just what they are
3. **Security is paramount** - especially for payments
4. **Update documentation** as you work
5. **Ask questions** via the user interface if something is unclear

---

*Last Updated: 2026-01-17*
