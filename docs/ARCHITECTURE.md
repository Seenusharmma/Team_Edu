# Architecture Guide

## Table of Contents

1. [Overview](#1-overview)
2. [Routing Architecture](#2-routing-architecture)
3. [Component Architecture](#3-component-architecture)
4. [Theming System](#4-theming-system)
5. [Styling Approach](#5-styling-approach)
6. [Client vs Server Components](#6-client-vs-server-components)

---

## 1. Overview

The Siksha frontend follows the Next.js App Router architecture with a component-based design. The application is structured to be modular, scalable, and maintainable.

### Design Principles

- **Modular Components**: Reusable, self-contained UI components
- **Centralized Theming**: Consistent styling through theme constants
- **Type Safety**: Full TypeScript with strict mode enabled
- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

## 2. Routing Architecture

The project uses **Next.js App Router** (file-based routing).

### Route Structure

```
app/
├── layout.tsx    → Root layout (wraps all pages)
└── page.tsx      → "/" route (Home page)
```

### Adding New Routes

Create new files in the `app/` directory:

```typescript
// app/about/page.tsx → "/about" route
export default function About() {
  return <h1>About Us</h1>;
}

// app/dashboard/page.tsx → "/dashboard" route
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

### Route Groups

Use route groups for organization without affecting URLs:

```
app/
├── (marketing)/
│   ├── about/page.tsx     → "/about"
│   ├── pricing/page.tsx   → "/pricing"
│   └── layout.tsx         # Marketing layout
└── (app)/
    ├── dashboard/page.tsx → "/dashboard"
    └── settings/page.tsx  → "/settings"
    └── layout.tsx         # App layout
```

### Dynamic Routes

```typescript
// app/users/[id]/page.tsx → "/users/:id"
export default function UserPage({ params }: { params: { id: string } }) {
  return <h1>User: {params.id}</h1>;
}
```

---

## 3. Component Architecture

### Directory Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── common/            # Shared across entire application
│   │   ├── Navbar.tsx    # Global navigation
│   │   ├── Footer.tsx    # Global footer
│   │   ├── About.tsx     # About section component
│   │   └── FoundersTestimonials.tsx  # Testimonials component
│   └── homeUI/            # Home page specific
│       ├── HomePage.tsx  # Main home page
│       ├── About.tsx     # About section
│       ├── TrustedBySchools.tsx  # Trusted by schools section
│       └── CountUpStats.tsx      # Statistics counter section
├── lib/
│   └── theme.ts          # Centralized theme configuration
└── public/                # Static assets
    ├── about.jpg          # About section image
    ├── about1.png         # Alternative about image
    ├── hero-merged.mp4   # Hero video
    └── laptop.png         # Hero laptop image
```

### Component Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component Files | PascalCase | `Navbar.tsx`, `FeatureCard.tsx` |
| Directory Names | camelCase | `homeUI/`, `pricing/` |

### Component Structure

```typescript
// components/common/Navbar.tsx
"use client";

import { useState } from "react";
import { theme } from "@/lib/theme";

interface NavbarProps {
  // Define props here
}

const Navbar = ({ prop1, prop2 }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* Component content */}
    </nav>
  );
};

export default Navbar;
```

---

## 4. Theming System

The theme is centralized in `lib/theme.ts` for consistency across the application.

### Theme Configuration

```typescript
// lib/theme.ts
export const theme = {
  colors: {
    pageBackground: "#f6efe6",
    textPrimary: "#1c140f",
    textSecondary: "#4f4036",
    textMuted: "#7b6556",
    accent: "#9d5f37",
    accentSoft: "rgba(244, 201, 139, 0.35)",
    accentWarm: "rgba(207, 141, 99, 0.25)",
    white: "#ffffff",
    whiteSoft: "rgba(255, 255, 255, 0.95)",
    whiteOverlay: "rgba(255, 255, 255, 0.85)",
    whiteGlass: "rgba(255, 255, 255, 0.35)",
    whiteBorder: "rgba(255, 255, 255, 0.6)",
    inkSoft: "#201913",
    inkOverlay: "rgba(28, 20, 15, 0.08)",
    buttonHover: "#35271f",
    chocolate: "#2d1f1a",      // Dark chocolate background
    chocolateDark: "#1a1210",  // Darker chocolate
  },
  dark: {
    background: "#0a0f1c",
    backgroundSecondary: "#111827",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    accent: "#8b5cf6",
    // ... more dark theme colors
  },
  gradients: {
    heroBackground:
      "radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(246,239,230,0.9) 35%, rgba(228,210,189,0.88) 100%)",
  },
  shadows: {
    nav: "0 18px 50px rgba(79,54,37,0.12)",
    button: "0 16px 32px rgba(28,20,15,0.18)",
    laptop: "0 30px 80px rgba(79,54,37,0.18)",
    screen: "0 10px 35px rgba(0,0,0,0.22)",
  },
} as const;

export type AppTheme = typeof theme;
```

### Using Theme in Components

```typescript
import { theme } from "@/lib/theme";

function MyComponent() {
  return (
    <div
      style={{
        backgroundColor: theme.colors.pageBackground,
        color: theme.colors.textPrimary,
        boxShadow: theme.shadows.button,
      }}
    >
      Content
    </div>
  );
}
```

### Adding New Theme Values

1. Open `lib/theme.ts`
2. Add new values to the appropriate section (colors, gradients, shadows)
3. Use in components via `theme.colors.newValue`

---

## 5. Styling Approach

### Tailwind CSS v4

The project uses Tailwind CSS v4 with PostCSS integration.

#### Global Styles

```css
/* app/globals.css */
@import "tailwindcss";
```

#### Utility Classes

```tsx
// Responsive design
<div className="hidden md:flex">
  <button className="rounded-full px-5 py-3" />
</div>

// Hover effects
<button className="hover:-translate-y-0.5" />

// Flexbox layouts
<div className="flex items-center justify-between gap-4" />
```

### Responsive Breakpoints

| Breakpoint | Prefix | Screen Size |
|------------|--------|-------------|
| Small | `sm:` | 640px+ |
| Medium | `md:` | 768px+ |
| Large | `lg:` | 1024px+ |
| Extra Large | `xl:` | 1280px+ |

### Common Patterns

#### Glass Morphism Effect

```tsx
<div
  className="backdrop-blur-xl"
  style={{
    backgroundColor: theme.colors.whiteOverlay,
    borderColor: theme.colors.whiteBorder,
  }}
/>
```

#### Gradient Backgrounds

```tsx
<div
  style={{
    background: theme.gradients.heroBackground,
  }}
/>
```

#### Responsive Typography

```tsx
<h1 className="text-3xl sm:text-4xl lg:text-6xl">
  Title
</h1>
```

---

## 6. Client vs Server Components

### When to Use Server Components (Default)

- Static content rendering
- Data fetching from databases
- Access to backend resources
- Keeping sensitive information on server

### When to Use Client Components

Add `"use client"` directive at the top of the file:

```typescript
"use client";

import { useState } from "react";
```

Current client components:

| Component | Reason |
|-----------|--------|
| `Navbar.tsx` | Uses `useState` for mobile menu toggle |
| `Footer.tsx` | Uses `useState` for email form, GSAP animations |
| `HomePage.tsx` | Client-side video rendering |
| `About.tsx` | Client-side component |
| `FoundersTestimonials.tsx` | Uses client-side images |
| `TrustedBySchools.tsx` | Client-side component |
| `CountUpStats.tsx` | Client-side animations |

### Component Type Examples

#### Server Component (Default)

```typescript
// app/about/page.tsx
export default function About() {
  // This runs on the server
  return <h1>About Page</h1>;
}
```

#### Client Component

```typescript
// components/Counter.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## Navigation

- **[Quick Start](README.md)** - Project setup and basics
- **[Contribution Guide](CONTRIBUTION.md)** - Development workflow and standards
- **[Deployment Guide](DEPLOYMENT.md)** - Deployment procedures
