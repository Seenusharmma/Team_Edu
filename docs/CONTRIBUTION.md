# Contribution Guide

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Development Workflow](#2-development-workflow)
3. [Code Standards](#3-code-standards)
4. [Commit Message Convention](#4-commit-message-convention)
5. [Pull Request Guidelines](#5-pull-request-guidelines)
6. [Testing](#6-testing)

---

## 1. Getting Started

### Initial Setup

```bash
# Fork the repository (if applicable)
# Clone your fork or the main repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name
```

### Development Cycle

1. Make your changes
2. Run linting and type checking
3. Test locally
4. Commit your changes
5. Push to your branch
6. Create a pull request

---

## 2. Development Workflow

### Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<description>` | `feature/user-authentication` |
| Bug Fix | `fix/<description>` | `fix/navbar-mobile-menu` |
| Hotfix | `hotfix/<description>` | `hotfix/production-crash` |
| Documentation | `docs/<description>` | `docs/api-documentation` |

### Creating a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/add-user-dashboard

# Make changes
# ...

# Commit your changes
git add .
git commit -m "feat: add user dashboard page"

# Push to remote
git push origin feature/add-user-dashboard
```

### Sync with Main Branch

```bash
# Fetch latest main
git fetch origin main

# Merge into your feature branch
git checkout feature/your-feature
git merge origin/main

# Or rebase (cleaner history)
git rebase origin/main
```

---

## 3. Code Standards

### TypeScript Guidelines

#### Always Use Explicit Types

```typescript
// Good
function greet(name: string): string {
  return `Hello, ${name}`;
}

// Avoid
function greet(name) {
  return `Hello, ${name}`;
}
```

#### Define Interfaces for Props

```typescript
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} className={variant}>
      {label}
    </button>
  );
}
```

#### Avoid `any` Type

```typescript
// Good
const users: User[] = await fetchUsers();

// Avoid
const users: any = await fetchUsers();
```

### React Best Practices

#### Use Functional Components

```typescript
// Good
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <nav>{/* ... */}</nav>;
};

export default Navbar;

// Avoid class components
```

#### Component Organization

```typescript
// 1. Imports
import React from "react";
import { theme } from "@/lib/theme";

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
}

// 3. Component
const MyComponent = ({ title }: MyComponentProps) => {
  // Hooks first
  const [state, setState] = useState(false);

  // Then other logic
  const handleClick = () => {
    setState(true);
  };

  // JSX last
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

// 4. Export at the bottom
export default MyComponent;
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `Navbar.tsx`, `FeatureCard.tsx` |
| Utility Functions | camelCase | `useAuth.ts`, `apiClient.ts` |
| Constants | camelCase | `theme.ts`, `constants.ts` |
| Types | PascalCase | `types/user.ts`, `types/api.ts` |

### Import Order

```typescript
// 1. React and external libraries
import React from "react";
import NextImage from "next/image";

// 2. Internal imports (components)
import Navbar from "@/components/common/Navbar";

// 3. Internal imports (utilities/lib)
import { theme } from "@/lib/theme";

// 4. Types
import type { User } from "@/types/user";
```

---

## 4. Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type Categories

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(auth): add login form` |
| `fix` | Bug fix | `fix(navbar): resolve mobile menu toggle` |
| `docs` | Documentation | `docs: update README` |
| `style` | Formatting | `style: format code with prettier` |
| `refactor` | Code restructure | `refactor: extract theme utilities` |
| `test` | Tests | `test: add unit tests for Button` |
| `chore` | Maintenance | `chore: update dependencies` |

### Examples

```bash
# Feature
git commit -m "feat(homepage): add hero video section"

# Bug fix
git commit -m "fix(navbar): resolve mobile menu z-index issue"

# Documentation
git commit -m "docs: add contribution guidelines"

# Refactoring
git commit -m "refactor(theme): extract color constants"

# Multiple changes
git commit -m "feat(auth): add sign-in and sign-up forms

- Implement login form with validation
- Add sign-up flow with email verification
- Integrate with auth API endpoints"
```

---

## 5. Pull Request Guidelines

### Before Creating a PR

- [ ] Code follows project style guidelines
- [ ] TypeScript types are properly defined
- [ ] No `console.log` statements in production code
- [ ] ESLint passes without errors (`npm run lint`)
- [ ] Responsive design is tested
- [ ] Accessibility considerations are addressed

### PR Description Template

```markdown
## Summary
Brief description of changes

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Tested locally
- [ ] Responsive design verified
- [ ] No console errors

## Screenshots (if UI changes)
[Add screenshots here]
```

### PR Review Checklist

For reviewers:

- [ ] Code is readable and follows conventions
- [ ] No obvious bugs or security issues
- [ ] Tests are adequate (if applicable)
- [ ] Documentation is updated (if needed)
- [ ] No unintended side effects

---

## 6. Testing

### Running Tests

```bash
# Run linting
npm run lint

# Run type checking (built into build command)
npm run build
```

### Best Practices

1. **Test locally before pushing**
2. **Test on multiple screen sizes**
3. **Test edge cases**
4. **Check browser compatibility**

### Common Test Scenarios

| Scenario | What to Test |
|----------|-------------|
| Navigation | All links work, mobile menu toggles |
| Forms | Validation, submission, error states |
| Responsive | All breakpoints work correctly |
| Performance | Page load time, no layout shift |

---

## Navigation

- **[Quick Start](README.md)** - Project setup and basics
- **[Architecture](ARCHITECTURE.md)** - System design and patterns
- **[Deployment Guide](DEPLOYMENT.md)** - Deployment procedures
