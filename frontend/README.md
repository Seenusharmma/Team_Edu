# Siksha Frontend - Engineering Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Quick Start](#2-quick-start)
3. [Technology Stack](#3-technology-stack)
4. [Project Structure](#4-project-structure)
5. [Available Scripts](#5-available-scripts)
6. [Environment Variables](#6-environment-variables)

---

## 1. Project Overview

**Siksha** is an AI-powered education platform frontend built with modern web technologies.

| Property | Value |
|----------|-------|
| Project Name | Siksha Frontend |
| Version | 0.1.0 |
| Type | Private Next.js web application |
| Status | Early Development |

### Purpose

- Landing page for AI-powered education platform
- Showcase platform features with hero video
- Navigation to product features, pricing, and reviews sections
- Demo booking and sign-in functionality

---

## 2. Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **Package Manager**: npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

---

## 3. Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.2.1 | React framework with App Router |
| [React](https://react.dev/) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe JavaScript |

### Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS framework |
| PostCSS | - | CSS processing |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| [ESLint](https://eslint.org/) | 9.x | Code linting |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type checking |

---

## 4. Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── globals.css               # Global styles (Tailwind imports)
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                  # Home page route (/)
├── components/                   # React components
│   ├── common/                   # Shared components
│   │   └── Navbar.tsx          # Global navigation header
│   └── homeUI/                   # Home page components
│       └── HomePage.tsx         # Landing page component
├── lib/                          # Utility libraries
│   └── theme.ts                 # Theme configuration constants
├── public/                       # Static assets
│   ├── hero-merged.mp4          # Hero video
│   ├── laptop.png               # Laptop image
│   └── *.svg                   # SVG icons
├── package.json                  # Project configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
└── eslint.config.mjs           # ESLint configuration
```

### Directory Responsibilities

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router - defines routes and layouts |
| `components/` | Reusable React components organized by feature |
| `lib/` | Utility functions and configuration |
| `public/` | Static assets served as-is |

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Use this pattern
import Navbar from "@/components/common/Navbar";
import { theme } from "@/lib/theme";

// Instead of relative paths
import Navbar from "../../components/common/Navbar";
```

---

## 5. Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on http://localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

---

## 6. Environment Variables

Create a `.env.local` file for local environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Variable Naming Convention

- `NEXT_PUBLIC_` prefix exposes variables to the browser
- Without prefix, variables are server-side only

---

## Navigation

- **[Architecture](ARCHITECTURE.md)** - Detailed system design and patterns
- **[Contribution Guide](CONTRIBUTION.md)** - Development workflow and standards
- **[Deployment Guide](DEPLOYMENT.md)** - Deployment procedures and hosting
