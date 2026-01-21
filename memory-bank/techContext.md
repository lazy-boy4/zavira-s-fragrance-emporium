# Zavira - Technical Context

## Technology Stack

### Full Stack Architecture (Current)

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Core** | Next.js | 16.x | Full-stack Framework (App Router) |
| **Runtime** | Bun | 1.3.5 | Package Manager & Runtime |
| **Language** | TypeScript | Latest | Type Safety |
| **Database** | PostgreSQL | 15+ | Relational Data (via Supabase) |
| **Auth** | Supabase Auth | SSR | Authentication & Session |
| **Security** | RLS | - | Database Authorization |
| **Styling** | Tailwind CSS | v3 | Utility-first Styling (Downgraded from v4 for compat) |
| **UI** | Shadcn/UI | - | Accessible Components |

## Development Setup

### Prerequisites

- Node.js 18+
- npm or bun package manager

### Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Currently no environment variables required. Future additions:

```env
# Future API configuration
VITE_API_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Dependencies

### Core Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0"
}
```

### UI Dependencies

```json
{
  "@radix-ui/react-*": "Various components",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0",
  "lucide-react": "^0.462.0"
}
```

### Form & Validation

```json
{
  "react-hook-form": "^7.61.1",
  "@hookform/resolvers": "^3.10.0",
  "zod": "^3.25.76"
}
```

## Technical Constraints

### Platform Limitations

1. **No Next.js**: Lovable platform only supports React/Vite
2. **No Node.js backend**: Backend code runs separately
3. **Relative paths required**: No localhost URLs in code
4. **HSL colors only**: All colors must use design tokens

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox

### Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s

## Code Standards & Best Practices

### Vercel React Best Practices (MANDATORY)
1. **No Waterfalls**: Use `Promise.all` for independent fetches. Use `Suspense` for streaming.
2. **Bundle Size**: 
   - **NO Barrel Imports**: Import directly (e.g., `import Button from '@/components/Button'`).
   - **Dynamic Imports**: Use `next/dynamic` for heavy components (charts, maps).
   - **Defer**: Load third-party scripts after hydration.
3. **Server-Side**:
   - Minimize serialization at RSC boundaries.
   - Use `React.cache()` for non-fetch async tasks.
   - Use `after()` for non-blocking side effects.
4. **Client-Side**:
   - Use functional `setState` (e.g., `setCount(c => c + 1)`).
   - Use `{ passive: true }` for scroll listeners.

### Web Interface Guidelines (UX/A11y)
1. **Accessibility**: 
   - Semantic HTML (`<button>` vs `<div>`).
   - `aria-label` for icon-only buttons.
   - `:focus-visible` for keyboard focus.
2. **Forms**: 
   - Native inputs with correct `type` and `autocomplete`.
   - Inline validation errors.
   - Do NOT block paste.
3. **Performance**:
   - Explicit `width`/`height` for images.
   - `loading="lazy"` for below-fold images.
   - `content-visibility: auto` for long lists.

### File Naming

- Components: PascalCase (e.g., `ProductCard.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)
- Types: PascalCase (e.g., `Product.ts`)
- Pages: PascalCase (e.g., `Shop.tsx`)

### Import Order

```tsx
// 1. React imports
import { useState, useEffect } from "react";

// 2. Third-party imports
import { Link } from "react-router-dom";

// 3. Local components
import { Header } from "@/components/layout/Header";

// 4. Local utilities
import { cn } from "@/lib/utils";

// 5. Assets
import heroImage from "@/assets/hero.jpg";

// 6. Types
import type { Product } from "@/types";
```

### Component Structure

```tsx
// Imports
import { useState } from "react";

// Types (if component-specific)
interface Props {
  title: string;
}

// Component
const MyComponent = ({ title }: Props) => {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {};

  // Render
  return <div>{title}</div>;
};

export default MyComponent;
```

## Testing Strategy (Future)

- Unit tests: Vitest + React Testing Library
- E2E tests: Playwright
- Visual regression: Chromatic (optional)

## Build & Deployment

### Build Output

```bash
npm run build
# Output: dist/
```

### Deployment

- Lovable: Automatic preview deployments
- Production: Configurable via Lovable publish

### Assets

- Images: `src/assets/` for bundled, `public/` for static
- Fonts: Loaded via Google Fonts
