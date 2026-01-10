# Zavira Design Philosophy & Implementation Guide

This document provides comprehensive guidelines for Agent B (and any other agents) to maintain consistency when implementing new features or pages for the Zavira project.

---

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Component Patterns](#component-patterns)
5. [Layout Guidelines](#layout-guidelines)
6. [Creating New Pages](#creating-new-pages)
7. [Admin Panel Guidelines](#admin-panel-guidelines)
8. [Code Standards](#code-standards)
9. [Common Mistakes to Avoid](#common-mistakes-to-avoid)

---

## Brand Identity

### Core Aesthetic
- **Style**: Dark luxury, Dior-inspired elegance
- **Mood**: Sophisticated, premium, exclusive
- **Theme**: Default to dark mode (class "dark" on html element)

### Key Visual Elements
- Clean, minimal interfaces with generous whitespace
- Subtle borders and separators
- Smooth transitions and hover effects
- High contrast for readability

---

## Color System

### CRITICAL: Use Only Design Tokens

**NEVER** use direct Tailwind colors like:
- ❌ `text-white`, `text-black`
- ❌ `bg-white`, `bg-black`
- ❌ `text-gray-500`, `bg-gray-100`
- ❌ Any color like `text-blue-500`, `bg-red-600`

**ALWAYS** use semantic tokens:
- ✅ `text-foreground`, `text-muted-foreground`
- ✅ `bg-background`, `bg-card`, `bg-muted`
- ✅ `border-border`, `ring-ring`
- ✅ `text-primary`, `bg-primary`, `text-primary-foreground`

### Color Token Reference

```
Background Tokens:
- bg-background     → Main page background
- bg-card           → Card/panel backgrounds
- bg-muted          → Subtle backgrounds
- bg-accent         → Interactive hover states
- bg-primary        → Primary buttons/actions
- bg-secondary      → Secondary elements
- bg-destructive    → Error/delete states

Text Tokens:
- text-foreground           → Primary text
- text-muted-foreground     → Secondary/helper text
- text-primary-foreground   → Text on primary bg
- text-card-foreground      → Text on cards

Border Tokens:
- border-border     → Standard borders
- border-input      → Form input borders
- ring-ring         → Focus rings

Custom Zavira Tokens:
- bg-silver / text-silver   → Silver accent color
- bg-surface                → Alternative surface
```

### Chart Colors (for data visualization)
Use `--chart-1` through `--chart-5` for consistent chart colors.

---

## Typography

### Font Families

```tsx
// Display/Headings (Playfair Display)
className="font-display"

// Body text (Inter)
className="font-body" // or default, as body is default font
```

### Heading Hierarchy

```tsx
// Page titles
<h1 className="text-2xl font-display tracking-wider">Page Title</h1>

// Section titles
<h2 className="text-xl font-display">Section Title</h2>

// Card titles
<h3 className="font-display text-lg">Card Title</h3>

// Subsections
<h4 className="font-medium">Subsection</h4>
```

### Text Styles

```tsx
// Primary text
<p className="text-foreground">Main content</p>

// Secondary/helper text
<p className="text-muted-foreground">Helper text</p>

// Small text
<span className="text-sm text-muted-foreground">Small helper</span>

// Extra small
<span className="text-xs text-muted-foreground">Tiny text</span>

// Navigation links (uppercase tracking)
<span className="text-sm uppercase tracking-[0.15em]">NAV LINK</span>
```

---

## Component Patterns

### Buttons

Always use shadcn Button component with appropriate variants:

```tsx
import { Button } from "@/components/ui/button";

// Primary action
<Button className="gap-2">
  <Icon className="h-4 w-4" />
  Primary Action
</Button>

// Secondary/outline
<Button variant="outline" className="gap-2">
  <Icon className="h-4 w-4" />
  Secondary Action
</Button>

// Ghost (subtle)
<Button variant="ghost" size="icon">
  <Icon className="h-4 w-4" />
</Button>

// Destructive
<Button variant="destructive">Delete</Button>
```

### Cards

```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle className="font-display flex items-center gap-2">
      <Icon className="h-5 w-5" />
      Card Title
    </CardTitle>
    <CardDescription>
      Helper description text
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Forms

```tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<div className="space-y-2">
  <Label htmlFor="field-name">Field Label</Label>
  <Input
    id="field-name"
    type="text"
    placeholder="Placeholder text"
  />
  <p className="text-xs text-muted-foreground">
    Helper text below input
  </p>
</div>
```

### Tables

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Data</TableCell>
      <TableCell className="text-muted-foreground">Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Badges

```tsx
import { Badge } from "@/components/ui/badge";

// Default
<Badge>Label</Badge>

// Secondary
<Badge variant="secondary">Label</Badge>

// Outline
<Badge variant="outline">Label</Badge>

// Custom status colors (use outline + custom classes)
<Badge variant="outline" className="text-green-600 border-green-600/50">
  <CheckCircle className="h-3 w-3 mr-1" />
  Active
</Badge>
```

---

## Layout Guidelines

### Page Structure

```tsx
export default function PageName() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Page Title</h1>
          <p className="text-muted-foreground mt-1">
            Page description
          </p>
        </div>
        <Button className="gap-2">
          <Icon className="h-4 w-4" />
          Action
        </Button>
      </div>

      {/* Content sections */}
      <Card>
        {/* ... */}
      </Card>
    </div>
  );
}
```

### Responsive Design

Always implement mobile-first responsive design:

```tsx
// Grid layouts
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

// Flex direction
<div className="flex flex-col sm:flex-row gap-4">

// Padding/spacing
<div className="p-4 lg:p-6">

// Hide/show elements
<span className="hidden sm:inline">Full text</span>
<span className="sm:hidden">Short</span>
```

### Spacing Scale

Use consistent spacing:
- `gap-1` / `space-y-1` → 4px (tight)
- `gap-2` / `space-y-2` → 8px (compact)
- `gap-4` / `space-y-4` → 16px (standard)
- `gap-6` / `space-y-6` → 24px (sections)
- `gap-8` / `space-y-8` → 32px (major sections)

---

## Creating New Pages

### Checklist for New Pages

1. **File Location**: `src/pages/` for visitor pages, `src/pages/admin/` for admin
2. **Add Route**: Update `src/App.tsx` with new route
3. **Add Navigation**: Update sidebar/header if needed
4. **Use Existing Components**: Prefer shadcn/ui components
5. **Follow Patterns**: Match existing page structures
6. **Responsive**: Test on mobile, tablet, desktop
7. **Dark Mode**: Ensure colors work in dark theme

### Page Template

```tsx
import { useState } from "react";
import { Icon1, Icon2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

/**
 * PageName - Brief description
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * Backend Integration:
 * - GET /api/endpoint - Description
 * - POST /api/endpoint - Description
 */

export default function PageName() {
  const { toast } = useToast();
  const [state, setState] = useState();

  const handleAction = () => {
    toast({ title: "Action completed" });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Page Title</h1>
          <p className="text-muted-foreground mt-1">
            Description of what this page does
          </p>
        </div>
        <Button onClick={handleAction} className="gap-2">
          <Icon1 className="h-4 w-4" />
          Primary Action
        </Button>
      </div>

      {/* Main content */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Section Title</CardTitle>
          <CardDescription>Section description</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content here */}
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Admin Panel Guidelines

### Sidebar Navigation

When adding new admin pages:

1. Add to `navItems` array in `AdminSidebar.tsx`
2. Specify appropriate roles: `["owner"]`, `["owner", "manager"]`, or `["owner", "manager", "staff"]`
3. Use lucide-react icons consistently

```tsx
{ 
  label: "New Feature", 
  path: "/admin/new-feature", 
  icon: IconName, 
  roles: ["owner", "manager"] 
},
```

### Admin Page Layout

Admin pages are automatically wrapped in `AdminLayout` which provides:
- Fixed sidebar (collapsible)
- Top header with search and user menu
- Main content area with padding

### Role-Based Access

Three roles exist:
- **Owner**: Full access to everything
- **Manager**: Most features except billing, team, critical settings
- **Staff**: Limited to orders, basic operations

---

## Code Standards

### Imports Order

```tsx
// 1. React
import { useState, useEffect } from "react";

// 2. Third-party libraries
import { useForm } from "react-hook-form";
import { z } from "zod";

// 3. Icons
import { Icon1, Icon2, Icon3 } from "lucide-react";

// 4. UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 5. Custom components
import { CustomComponent } from "@/components/custom";

// 6. Hooks
import { useToast } from "@/hooks/use-toast";

// 7. Utils
import { cn } from "@/lib/utils";

// 8. Assets
import logoImage from "@/assets/logo.png";
```

### Component Documentation

Always include JSDoc comment at top:

```tsx
/**
 * ComponentName - What it does
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * Backend Integration:
 * - GET /api/endpoint - Description
 * - POST /api/endpoint - Description
 */
```

### TypeScript

- Define interfaces for all props and data shapes
- Use proper types, avoid `any`
- Export types if used across files

---

## Common Mistakes to Avoid

### ❌ Don't Do This

```tsx
// Direct colors
<div className="bg-white text-black">

// Hardcoded colors
<span className="text-gray-500">

// Missing responsive
<div className="grid grid-cols-3">

// Wrong font usage
<h1>Title without font-display</h1>

// Missing accessibility
<button onClick={...}>Click</button>
```

### ✅ Do This Instead

```tsx
// Semantic tokens
<div className="bg-background text-foreground">

// Proper muted colors
<span className="text-muted-foreground">

// Responsive grids
<div className="grid sm:grid-cols-2 lg:grid-cols-3">

// Proper typography
<h1 className="font-display text-2xl tracking-wider">Title</h1>

// Accessible buttons
<Button onClick={...}>Click</Button>
```

---

## Data Integration Notes

### For Agent B (Backend Developer)

When implementing backend:

1. **API Client**: Use TanStack Query for data fetching
2. **Auth**: JWT-based authentication with refresh tokens
3. **Forms**: All forms use react-hook-form + zod validation
4. **Toasts**: Use `useToast` hook for feedback
5. **Loading States**: Add skeletons during data fetch
6. **Error Handling**: Graceful error states with retry options

### Mock Data Pattern

Current mock data follows this pattern - backend should match:

```tsx
const mockData = [
  {
    id: "uuid_string",
    name: "Name",
    createdAt: "2024-01-10T10:00:00Z",
    // ...other fields
  },
];
```

---

## Remember

1. **Consistency** is more important than creativity
2. **Dark mode first** - always test dark theme
3. **Mobile first** - responsive from the start
4. **Use existing components** - don't reinvent
5. **Follow patterns** - look at similar pages
6. **Document changes** - update memory bank files

---

*This document should be referenced before implementing any new features.*
*Last updated by Agent A: 2024-01-10*
