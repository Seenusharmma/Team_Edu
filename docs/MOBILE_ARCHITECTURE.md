# Mobile App Architecture Guide

## Table of Contents

1. [Overview](#1-overview)
2. [Project Structure](#2-project-structure)
3. [Routing Architecture](#3-routing-architecture)
4. [Component Architecture](#4-component-architecture)
5. [Theming System](#5-theming-system)
6. [Styling Approach](#6-styling-approach)
7. [Animation & Gestures](#7-animation--gestures)
8. [Key Features & Updates](#8-key-features--updates)
9. [Development Commands](#9-development-commands)

---

## 1. Overview

The Siksha mobile app is a React Native application built with **Expo** and **NativeWind** (Tailwind CSS for React Native). It provides an AI-powered educational platform optimized for mobile devices.

### Tech Stack

| Technology | Purpose |
|------------|---------|
| Expo SDK 54 | React Native framework |
| React Native 0.81 | UI library |
| TypeScript | Type safety |
| NativeWind | Tailwind CSS styling |
| React Native Reanimated | Smooth animations |
| React Native Gesture Handler | Touch gestures |
| Expo Router | File-based routing |
| Expo Video | Video playback |
| Expo Linear Gradient | Gradient backgrounds |

### Design Principles

- **Modular Components**: Reusable, self-contained UI components
- **Centralized Theming**: Consistent styling through theme constants
- **Mobile-First**: Optimized for touch interactions and small screens
- **Smooth Animations**: Using Reanimated for 60fps animations
- **Gesture Support**: Pan, swipe, and tap interactions

---

## 2. Project Structure

```
siksha/
├── mobile/                          # Mobile app directory
│   ├── src/
│   │   ├── app/                    # App Router (pages & layouts)
│   │   │   ├── _layout.tsx        # Root layout with GestureHandlerRootView
│   │   │   └── (tabs)/            # Tab-based navigation group
│   │   │       ├── _layout.tsx    # Tab bar configuration
│   │   │       ├── index.tsx      # Home screen
│   │   │       ├── learn.tsx       # Learn screen
│   │   │       ├── progress.tsx    # Progress screen
│   │   │       ├── profile.tsx     # Profile screen
│   │   │       └── contact.tsx     # Contact page
│   │   ├── components/             # React components
│   │   │   ├── home/              # Home page sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── FeaturesSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── StatsSection.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   ├── TrustedSchoolsSection.tsx
│   │   │   │   ├── HowItWorksSection.tsx
│   │   │   │   ├── CTASection.tsx
│   │   │   │   └── SectionHeader.tsx
│   │   │   └── layout/            # Layout components
│   │   │       └── Footer.tsx
│   │   ├── lib/                   # Utilities & configuration
│   │   │   └── theme.ts           # Centralized theme
│   │   └── data/                  # Static data
│   │       └── home.ts             # Home page data
│   ├── assets/                    # Static assets
│   │   └── home/                  # Home page assets
│   │       ├── laptop.png
│   │       └── hero-merged.mp4
│   ├── app.json                   # Expo configuration
│   ├── package.json
│   └── tsconfig.json
├── docs/                           # Documentation
│   ├── ARCHITECTURE.md            # Frontend architecture
│   ├── MOBILE_ARCHITECTURE.md     # This file
│   ├── CONTRIBUTION.md
│   └── changes.txt
└── frontend/                      # Web frontend (Next.js)
```

### Directory Purpose

| Directory | Purpose |
|-----------|---------|
| `app/` | Expo Router - page routes and layouts |
| `app/(tabs)/` | Tab navigation screens |
| `components/home/` | Home page section components |
| `components/layout/` | Layout components (Footer) |
| `lib/` | Theme configuration and utilities |
| `data/` | Static data files |
| `assets/` | Images, videos, fonts |

---

## 3. Routing Architecture

The app uses **Expo Router** with file-based routing and tab navigation.

### Route Structure

```
app/
├── _layout.tsx                    # Root layout (GestureHandlerRootView)
└── (tabs)/                       # Tab navigation group
    ├── _layout.tsx               # Tab bar configuration
    ├── index.tsx                 # "/" → Home screen
    ├── learn.tsx                 # "/learn" → Learn screen
    ├── progress.tsx              # "/progress" → Progress screen
    ├── profile.tsx                # "/profile" → Profile screen
    └── contact.tsx               # "/contact" → Contact page
```

### Tab Navigation

The bottom tab bar is configured in `app/(tabs)/_layout.tsx`:

```tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.whiteBorder,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={focused ? theme.colors.accent : theme.colors.textMuted}
            />
          ),
        }}
      />
      {/* ... other tabs */}
    </Tabs>
  );
}
```

### Adding New Screens

Create new files in the `(tabs)` directory:

```tsx
// app/(tabs)/settings.tsx → "/settings" route
export default function Settings() {
  return <View><Text>Settings</Text></View>;
}
```

### Programmatic Navigation

```tsx
import { router } from 'expo-router';

// Navigate to contact page
router.push('/contact');

// Go back
router.back();
```

---

## 4. Component Architecture

### Component Categories

| Category | Location | Description |
|----------|----------|-------------|
| Layout | `components/layout/` | Footer - appears on all pages |
| Home Sections | `components/home/` | Home page specific sections |
| Screens | `app/(tabs)/*.tsx` | Full page screens |
| Shared | `components/shared/` | Reusable components (future) |

### Component Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component Files | PascalCase | `HeroSection.tsx` |
| Page Files | camelCase | `index.tsx`, `profile.tsx` |
| Directory Names | camelCase | `components/home/` |

### Component Structure Example

```tsx
// components/home/FeaturesSection.tsx
import { View, Text } from 'react-native';
import { theme } from '@/lib/theme';
import { features } from '@/data/home';
import { SectionHeader } from './SectionHeader';

export function FeaturesSection() {
  return (
    <View className="px-5 py-12">
      <SectionHeader
        eyebrow="Features"
        title="Supercharge Your Learning"
        description="AI-powered features"
      />
      {/* Content */}
    </View>
  );
}
```

### Key Components

#### HeroSection
- Contains the sticky navbar with logo and Contact Us button
- Video playback with laptop mockup
- Call-to-action buttons

#### FeaturesSection
- Auto-scrolling carousel with 6 second intervals
- Swipe gestures for manual navigation
- Dot pagination indicators
- Card-based UI matching TestimonialsSection

#### Navbar (in HeroSection)
- Fixed/sticky position at top
- Logo with "Siksha" branding
- Contact Us button
- Animated entrance

---

## 5. Theming System

The theme is centralized in `lib/theme.ts` for consistency.

### Theme Configuration

```tsx
// lib/theme.ts
export const theme = {
  colors: {
    pageBackground: '#f6efe6',
    textPrimary: '#1c140f',
    textSecondary: '#4f4036',
    textMuted: '#7b6556',
    accent: '#9d5f37',
    accentSoft: 'rgba(244, 201, 139, 0.35)',
    accentWarm: 'rgba(207, 141, 99, 0.25)',
    white: '#ffffff',
    whiteSoft: 'rgba(255, 255, 255, 0.95)',
    whiteGlass: 'rgba(255, 255, 255, 0.35)',
    whiteBorder: 'rgba(255, 255, 255, 0.6)',
    inkSoft: '#201913',
    chocolate: '#2d1f1a',
    chocolateDark: '#1a1210',
    cardBackground: '#f0ebe1',
    success: '#2f8f5b',
  },
  shadows: {
    nav: {
      shadowColor: '#4f3625',
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.12,
      shadowRadius: 25,
      elevation: 8,
    },
    card: {
      shadowColor: '#1c140f',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 6,
    },
    button: {
      shadowColor: '#9d5f37',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.22,
      shadowRadius: 18,
      elevation: 6,
    },
  },
} as const;
```

### Using Theme in Components

```tsx
import { theme } from '@/lib/theme';

function MyComponent() {
  return (
    <View
      className="rounded-2xl p-6"
      style={{
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.whiteBorder,
        ...theme.shadows.card,
      }}
    >
      <Text style={{ color: theme.colors.textPrimary }}>Content</Text>
    </View>
  );
}
```

---

## 6. Styling Approach

### NativeWind (Tailwind CSS)

All styling uses Tailwind CSS classes via NativeWind:

```tsx
// Basic styling
<View className="px-5 py-12" />

// Flexbox
<View className="flex-row items-center justify-between gap-4" />

// Typography
<Text className="text-xl font-bold text-white" />

// Spacing
<View className="mt-6 mb-4 mx-2" />

// Borders & Radius
<View className="rounded-2xl border border-gray-200" />
```

### Color Classes

Use theme colors with Tailwind:

```tsx
// Background colors
<View className="bg-white" style={{ backgroundColor: theme.colors.pageBackground }} />

// Text colors (use theme for custom colors)
<Text style={{ color: theme.colors.textPrimary }}>Title</Text>
<Text style={{ color: theme.colors.accent }}>Accent</Text>
```

### Shadows

```tsx
<View style={{ ...theme.shadows.card }} />
<View style={{ ...theme.shadows.button }} />
<View style={{ ...theme.shadows.nav }} />
```

---

## 7. Animation & Gestures

### React Native Reanimated

Used for smooth 60fps animations:

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';

function AnimatedComponent() {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  // Animate on mount
  useEffect(() => {
    scale.value = withSpring(1.1, { damping: 12, stiffness: 100 });
  }, []);
  
  return <Animated.View style={animatedStyle} />;
}
```

### Gesture Handler

Used for pan, swipe, and tap gestures:

```tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    translateX.value = startX + event.translationX;
  })
  .onEnd((event) => {
    // Snap to position
    translateX.value = withTiming(targetX, { duration: 400 });
  });

return (
  <GestureDetector gesture={panGesture}>
    <Animated.View style={animatedStyle} />
  </GestureDetector>
);
```

### FeaturesSection Carousel

The FeaturesSection implements a carousel with:

- **Auto-scroll**: Advances every 6 seconds
- **Manual swipe**: Pan gesture with velocity-based snapping
- **Dot indicators**: Animated pagination
- **Worklet functions**: Optimized for UI thread execution

---

## 8. Key Features & Updates

### Recent Updates

#### Sticky Navbar (HeroSection)
- Fixed position at top of screen
- Modern glassmorphism design with rounded corners
- Logo with "Siksha" branding
- Contact Us button with accent color
- Animated entrance (fade + scale)

#### FeaturesSection Carousel
- Auto-scrolling with 6 second intervals
- Manual swipe navigation (pan gesture)
- Dot pagination with active state animation
- Same card design as TestimonialsSection
- Infinite scrolling behavior

#### Bottom Tab Bar
- Premium Ionicons from @expo/vector-icons
- Active/Inactive icon states (filled vs outline)
- Shadow and border styling
- 70px height with proper padding

#### Contact Page
- Full form with name, email, subject, message fields
- Send Message button
- Get in Touch section with contact info
- Keyboard avoiding behavior

### Color Scheme

The app uses a warm, educational color palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Chocolate | `#2d1f1a` | Primary brand, navbar |
| Accent | `#9d5f37` | Buttons, highlights |
| Page Background | `#f6efe6` | Main background |
| Text Primary | `#1c140f` | Headings |
| Text Secondary | `#4f4036` | Body text |

---

## 9. Development Commands

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Type checking
npx tsc --noEmit
```

### Required Packages

| Package | Version | Purpose |
|---------|---------|---------|
| expo | ~54.0.33 | Framework |
| expo-router | ~6.0.23 | Routing |
| react-native-reanimated | ~4.1.1 | Animations |
| react-native-gesture-handler | ^2.31.0 | Gestures |
| nativewind | ^4.2.3 | Styling |
| @expo/vector-icons | ^15.1.1 | Icons |
| expo-video | ~3.0.15 | Video playback |
| expo-linear-gradient | ~15.0.8 | Gradients |

### Code Quality

Before committing:

1. Run `npx tsc --noEmit` to check TypeScript
2. Ensure all imports are correct
3. Test on both Android and iOS simulators

---

## Navigation

- **[Main README](../../README.md)** - Project overview
- **[Frontend Architecture](ARCHITECTURE.md)** - Web frontend docs
- **[Contribution Guide](CONTRIBUTION.md)** - Development workflow
- **[Changelog](changes.txt)** - Recent changes
