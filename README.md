# Limba Web - Marketing Landing Page

A responsive marketing landing page for Limba, an AI-powered wellness app that delivers personalised micro-routines in under 5 minutes a day. Built with Next.js 14, React, TypeScript, and TailwindCSS.

## Features

- 🎨 Clean, modern wellness aesthetic with soft teal/mint greens
- 📱 Fully responsive design (mobile-first)
- ⚡ Optimised with Next.js 14 App Router & Image component
- 🎯 Semantic HTML with full accessibility support
- ✨ Smooth hover interactions and animations
- 🧩 Modular component architecture
- 📦 Type-safe with TypeScript strict mode
- 🎮 Interactive milestone gallery with hover/tap states
- 📧 Waitlist signup with Supabase backend
- 🔍 SEO optimised with comprehensive metadata

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **TailwindCSS 3** - Utility-first CSS
- **Supabase** - Database for waitlist signups
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for waitlist functionality)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Limba-web/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts        # Waitlist API endpoint
│   ├── components/
│   │   ├── icons/              # SVG icon components
│   │   ├── layout/             # Header, Footer, Logo
│   │   ├── sections/           # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ValuePropSection.tsx
│   │   │   ├── LearnMoreSection.tsx
│   │   │   └── BetaLaunchSection.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── PhoneMockup.tsx
│   │       └── WaitlistModal.tsx
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── data.ts
│   │   ├── supabase.ts         # Supabase client
│   │   └── supabase-admin.ts   # Supabase admin client (bypasses RLS)
│   ├── types/
│   │   └── index.ts
│   ├── globals.css
│   ├── layout.tsx              # Root layout with SEO metadata
│   └── page.tsx
├── public/
│   ├── images/                 # App screenshots & logo
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── site.webmanifest
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Page Sections

### Hero Section
- Main headline with animated phone mockups
- Primary and secondary CTAs
- Badge highlighting Stanford & Imperial College expertise

### Value Proposition Section
- Three feature cards: Personalised, Under 5 Minutes, Progress That Sticks
- Clean grid layout with icons

### Learn More Section
- In-depth feature explanations (AI Wellness Profile, Daily Routines, Library, Streaks, Celebrations)
- **Interactive Milestone Gallery** - hover/tap to explore 11 milestones from Spark to Champion
- Two-column layout with sticky milestone panel

### Beta Launch Section
- Waitlist signup CTA
- Benefits list for early adopters

## Waitlist API

The `/api/waitlist` endpoint handles email signups:

- **POST** - Add email to waitlist
- Validates email format
- Handles duplicate detection
- Uses Supabase service role key to bypass RLS

### Supabase Table Schema

```sql
CREATE TABLE waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'landing_page',
  referred_by_code TEXT,
  status TEXT DEFAULT 'waiting',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

## SEO

Comprehensive metadata including:
- Title and description optimised for AI wellness keywords
- Open Graph tags for social sharing
- Twitter card support
- Favicons for all platforms
- Web app manifest

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Proper heading hierarchy
- Focus-visible states
- Keyboard navigation support
- Emoji with proper accessibility attributes

## Licence

Private - © 2025 Limba. All rights reserved.
