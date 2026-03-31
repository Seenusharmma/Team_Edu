# Architecture Guide

## Table of Contents

1. [Overview](#1-overview)
2. [Project Structure](#2-project-structure)
3. [Routing Architecture](#3-routing-architecture)
4. [Component Architecture](#4-component-architecture)
5. [Theming System](#5-theming-system)
6. [Styling Approach](#6-styling-approach)
7. [Client vs Server Components](#7-client-vs-server-components)
8. [Development Commands](#8-development-commands)

---

## 1. Overview

The Siksha frontend is an AI-powered education platform built with **Next.js 16** using the App Router architecture. The application follows a component-based design pattern with centralized theming.

### Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility-first styling |
| Next/Link | Client-side navigation |

### Design Principles

- **Modular Components**: Reusable, self-contained UI components
- **Centralized Theming**: Consistent styling through theme constants
- **Type Safety**: Full TypeScript with strict mode enabled
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Standard Navigation**: Uses Next.js Link component (no page transitions)

---

## 2. Project Structure

```
siksha/
├── docs/                    # Project documentation
│   ├── ARCHITECTURE.md      # This file
│   ├── CONTRIBUTION.md      # Contribution guidelines
│   └── changes.txt          # Changelog
├── frontend/                # Next.js application
│   ├── app/                # App Router pages
│   │   ├── layout.tsx      # Root layout (Navbar + Footer)
│   │   ├── page.tsx        # Home page
│   │   ├── globals.css     # Global styles
│   │   └── contact/        # Contact page route
│   │       └── page.tsx    # Contact page
│   ├── components/          # React components
│   │   ├── home/           # Home page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── About.tsx
│   │   │   ├── CountUpStats.tsx
│   │   │   └── TrustedBySchools.tsx
│   │   └── layout/         # Layout components
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── lib/                # Utilities
│   │   └── theme.ts        # Centralized theme configuration
│   ├── public/             # Static assets
│   │   ├── hero-merged.mp4
│   │   └── laptop.png
│   ├── package.json
│   └── tsconfig.json
└── README.md                # Main project README
```

### Directory Purpose

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router - page routes and layouts |
| `components/` | Reusable React components |
| `components/home/` | Components specific to the home page |
| `components/layout/` | Layout components (Navbar, Footer) |
| `lib/` | Utility functions and configuration |
| `public/` | Static assets (images, videos) |
| `docs/` | Project documentation |

---

## 3. Routing Architecture

The project uses **Next.js App Router** with file-based routing.

### Route Structure

```
app/
├── layout.tsx          # Root layout → "/" + all pages
├── page.tsx            # "/" → Home page
└── contact/
    └── page.tsx        # "/contact" → Contact page
```

### Adding New Routes

Create new directories and pages in the `app/` directory:

```typescript
// app/about/page.tsx → "/about" route
export default function About() {
  return <h1>About Us</h1>;
}

// app/pricing/page.tsx → "/pricing" route
export default function Pricing() {
  return <h1>Pricing</h1>;
}
```

### Navigation

All internal links use Next.js `<Link />` component:

```typescript
import Link from "next/link";

<Link href="/" className="...">Home</Link>
<Link href="/contact" className="...">Contact Us</Link>
```

---

## 4. Component Architecture

### Component Categories

| Category | Location | Description |
|----------|----------|-------------|
| Layout | `components/layout/` | Navbar, Footer - appear on all pages |
| Home | `components/home/` | Home page specific sections |
| Pages | `app/*/page.tsx` | Full page components |

### Component Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component Files | PascalCase | `Navbar.tsx`, `HomePage.tsx` |
| Directory Names | PascalCase | `components/home/`, `app/contact/` |
| Page Files | PascalCase | `page.tsx` |

### Component Structure Example

```typescript
// components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { theme } from "@/lib/theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav>
        <Link href="/">Logo</Link>
        {/* Navigation items */}
      </nav>
    </header>
  );
};

export default Navbar;
```

### Root Layout Structure

All pages are wrapped with Navbar and Footer via the root layout:

```typescript
// app/layout.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="flex min-h-full flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

---

## 5. Theming System

The theme is centralized in `lib/theme.ts` for consistency across the application.

### Theme Configuration

```typescript
// lib/theme.ts
export const theme = {
  colors: {
    pageBackground: "#f6efe6",
    textPrimary: "#1c140f",
    textSecondary: "#4f4036",
    accent: "#9d5f37",
    white: "#ffffff",
    whiteSoft: "rgba(255, 255, 255, 0.95)",
    whiteBorder: "rgba(255, 255, 255, 0.6)",
    // ... more colors
  },
  shadows: {
    nav: "0 18px 50px rgba(79,54,37,0.12)",
    button: "0 16px 32px rgba(28,20,15,0.18)",
    laptop: "0 30px 80px rgba(79,54,37,0.18)",
  },
} as const;
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
2. Add new values to the appropriate section (colors, shadows)
3. Use in components via `theme.colors.newValue` or `theme.shadows.newValue`

---

## 6. Styling Approach

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
<button className="hover:-translate-y-1" />

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

---

## 7. Client vs Server Components

### When to Use Server Components (Default)

- Static content rendering
- Data fetching from databases
- Keeping sensitive information on server

### When to Use Client Components

Add `"use client"` directive at the top of the file:

```typescript
"use client";

import { useState } from "react";
```

### Current Client Components

| Component | Reason |
|-----------|--------|
| `Navbar.tsx` | Uses `useState` for mobile menu toggle |
| `Footer.tsx` | Uses `useState` for email subscription form |
| `HomePage.tsx` | Contains video element with client-side interactivity |
| `About.tsx` | Client-side animations |
| `CountUpStats.tsx` | Uses `useState` for counter animation |
| `TrustedBySchools.tsx` | Client-side component |
| `contact/page.tsx` | Uses `useState` for form handling |

---

## 8. Development Commands

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Code Quality

Before committing or creating a PR, ensure:

1. `npm run lint` passes without errors
2. `npm run build` completes successfully
3. All TypeScript types are correct

---

## Navigation

- **[Main README](../README.md)** - Project overview and setup
- **[Contribution Guide](CONTRIBUTION.md)** - Development workflow and standards
- **[Changelog](changes.txt)** - Recent changes and updates
