# Zavira - System Patterns

## Architecture Overview

The Zavira frontend follows a component-based architecture using React with clear separation of concerns.

```
┌─────────────────────────────────────────────────────┐
│                     App.tsx                          │
│              (Router Configuration)                  │
├─────────────────────────────────────────────────────┤
│                     Pages                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  Index  │ │  Shop   │ │ Product │ │  Cart   │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────────────────┤
│                    Layouts                           │
│        ┌─────────────────────────────┐              │
│        │  Header  │  Main  │  Footer │              │
│        └─────────────────────────────┘              │
├─────────────────────────────────────────────────────┤
│                   Components                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │   UI    │ │  Home   │ │ Layout  │ │ Search  │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/
│   ├── home/           # Homepage-specific components
│   ├── layout/         # Header, Footer, Navigation
│   ├── search/         # Search functionality
│   └── ui/             # Reusable UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Route-level page components
└── types/              # TypeScript type definitions
```

## Design Patterns

### Component Composition

Components are built using composition patterns with shadcn/ui as the base:

```tsx
// Pattern: Compound component with variants
<Button variant="luxury" size="lg">
  Shop Now
</Button>
```

### Layout Pattern

All pages follow a consistent layout structure:

```tsx
const Page = () => (
  <div className="min-h-screen dark">
    <Header />
    <main className="pt-20">{/* Page content */}</main>
    <Footer />
  </div>
);
```

### Data Flow (Current - Static)

Currently using static data arrays. Designed for easy API integration:

```tsx
// Current: Static data
const products = [
  { id: 1, name: "Zavira Primal", price: 125 },
];

// Future: API integration point
const { data: products } = useQuery(['products'], fetchProducts);
```

## Styling Patterns

### Design Tokens

All colors use HSL CSS variables from the design system:

```css
/* DO: Use semantic tokens */
className="bg-background text-foreground"
className="border-border text-muted-foreground"

/* DON'T: Use direct colors */
className="bg-black text-white" /* NEVER */
```

### Component Variants

Button variants follow a consistent pattern:

- `luxury`: Primary dark/light fill
- `luxury-outline`: Border-only variant
- `ghost`: Transparent with hover
- `nav`: Navigation-specific styling

## Key Technical Decisions

### Routing

Using React Router v6 with declarative routes in App.tsx:

```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/product/:slug" element={<ProductDetail />} />
</Routes>
```

### State Management

- Local state (useState) for UI interactions
- Props drilling for simple data flow
- Ready for context/Zustand if complexity grows

### Forms

Using controlled components with React Hook Form ready:

```tsx
const [formData, setFormData] = useState({...});
// Can easily migrate to useForm from react-hook-form
```

## Integration Points

### Backend API (Future)

Endpoints to implement:

```
GET    /api/products           # List all products
GET    /api/products/:slug     # Get product details
GET    /api/collections        # List collections
POST   /api/cart               # Create cart
PUT    /api/cart/:id           # Update cart
POST   /api/orders             # Create order
POST   /api/auth/login         # User login
POST   /api/auth/register      # User registration
GET    /api/user/profile       # Get user profile
```

### Authentication (Planned)

Will use JWT-based auth with:

- Login/signup forms
- Protected routes
- Token storage
- Session management
