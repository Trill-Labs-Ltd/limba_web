# Limba Web - Marketing Landing Page

A responsive marketing landing page for the Limba wellness app, built with Next.js, React, TypeScript, and TailwindCSS following industry best practices.

## Features

- 🎨 Clean, modern wellness aesthetic with soft mint/teal greens
- 📱 Fully responsive design (mobile-first)
- ⚡ Fast and optimized with Next.js 14 App Router
- 🎯 Semantic HTML with full accessibility support
- ✨ Smooth hover interactions and transitions
- 🧩 Modular component architecture
- 📦 Type-safe with TypeScript strict mode
- ♿ WCAG AA compliant accessibility

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety and developer experience
- **TailwindCSS 3** - Utility-first CSS framework
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
Limba-web/
├── app/
│   ├── components/
│   │   ├── icons/           # SVG icon components
│   │   │   ├── SparkleIcon.tsx
│   │   │   ├── ClockIcon.tsx
│   │   │   └── TrophyIcon.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Logo.tsx
│   │   ├── sections/        # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ValuePropSection.tsx
│   │   │   └── BetaLaunchSection.tsx
│   │   └── ui/              # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── FeatureCard.tsx
│   │       └── PhoneMockup.tsx
│   ├── lib/                 # Utilities and data
│   │   ├── constants.ts
│   │   └── data.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/
│   └── images/              # Static images
│       └── sparkle.svg
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Component Architecture

### Layout Components

- **Header**: Sticky navigation with logo and CTA
- **Footer**: Footer with logo, tagline, and copyright
- **Logo**: Reusable logo component

### Section Components

- **HeroSection**: Main hero with headline, CTAs, and phone mockup
- **ValuePropSection**: Feature cards showcasing app benefits
- **BetaLaunchSection**: Beta signup section with benefits list

### UI Components

- **Button**: Configurable button with variants (primary, secondary, outline)
- **Badge**: Status badges with optional icons
- **FeatureCard**: Feature display with icon, title, and description
- **PhoneMockup**: Phone mockup with two variants (hero, beta)

### Icon Components

All icons are SVG components with proper accessibility attributes:

- **SparkleIcon**: Personalization icon
- **ClockIcon**: Time-saving icon
- **TrophyIcon**: Achievement icon

## Design System

### Colors

- **Primary**: Teal (teal-500, teal-600)
- **Accent**: Mint greens
- **Neutrals**: Grays and white
- **Semantic**: Success, error states

### Typography

- **Headlines**: Bold, large sizes (4xl-6xl)
- **Body**: Medium weight, readable sizes
- **Supporting text**: Gray tones for hierarchy

### Spacing

- **Container**: Responsive padding (px-4, sm:px-6, lg:px-8)
- **Sections**: Generous vertical spacing (py-16, lg:py-24)
- **Components**: Consistent internal spacing

## Accessibility

- Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on all interactive elements
- Proper heading hierarchy (h1-h6)
- Focus-visible states on interactive elements
- Emoji with proper role and aria-label attributes
- Keyboard navigation support

## Performance

- Next.js App Router for optimal performance
- Component code splitting
- Optimized metadata for SEO
- Minimal client-side JavaScript
- Efficient CSS with Tailwind

## Code Quality

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Prettier for consistent formatting
- No linter errors or warnings
- Proper type definitions throughout

## License

Private - © 2025 Limba. All rights reserved.
