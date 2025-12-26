# Zavira - Technical Context

## Technology Stack

### Frontend (Current)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI library |
| Vite | Latest | Build tool and dev server |
| TypeScript | Latest | Type safety |
| Tailwind CSS | Latest | Utility-first styling |
| React Router | 6.30.1 | Client-side routing |
| TanStack Query | 5.83.0 | Data fetching (ready for use) |

### UI Components

| Package | Purpose |
|---------|---------|
| shadcn/ui | Base component library |
| Radix UI | Accessible primitives |
| Lucide React | Icon library |
| class-variance-authority | Component variants |

### Backend (Planned)

| Technology | Purpose |
|------------|---------|
| Golang | Backend language |
| PostgreSQL | Primary database |
| Supabase | Backend-as-a-service option |

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

## Code Standards

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
