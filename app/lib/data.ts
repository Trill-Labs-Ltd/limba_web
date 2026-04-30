import type { Feature } from '@/app/types'

export const SOCIAL_PROOF_COUNT = '500+'

export const features: Feature[] = [
  {
    id: 'ask-limba',
    icon: 'chat',
    title: 'Ask Limba',
    description:
      'Describe how you feel in plain language and get a focused routine instantly for you particular target goals. No guesswork, just guided relief tailored to your body.',
  },
  {
    id: 'personalised',
    icon: 'sparkle',
    title: 'Personalised to You',
    description:
      "Tell us where it hurts. Limba learns your unique discomforts: tight shoulders from typing, stiff lower back from sitting and crafts routines that target exactly what you need.",
  },
  {
    id: 'quick',
    icon: 'clock',
    title: 'Under 5 Minutes',
    description:
      'No gym or equipment required. Just quick, effective micro-movements designed to fit into your day and build mobility over time.',
  },
  {
    id: 'progress',
    icon: 'trophy',
    title: 'Progress That Sticks',
    description:
      'True, loose mobility comes with consistency and Limba rewards this. Grow through milestones with Limba the cat so your routines feel rewarding and not like a chore.',
  },
]

export const heroContent = {
  badge: 'Built by Stanford & Imperial College experts',
  headline: 'Feel better in',
  highlightedText: 'under 5 minutes',
  headlineContinued: 'a day',
  description:
    'Limba learns your unique aches and pains, then delivers personalised micro-routines that fit seamlessly into your workday.',
}

export const betaContent = {
  badge: 'Now available',
  headline: "Your body deserves better than 'I'll stretch later'",
  description:
    'Experience personalised care for your body, backed by science and built by health professionals from Imperial and Stanford.',
}

export const footerContent = {
  tagline:
    'Built with ❤️ by health experts from Imperial College London & Stanford',
  copyright: '© 2025 Limba. All rights reserved.',
  legalLinks: [
    {
      label: 'Privacy Policy',
      href: '/privacy-policy',
    },
    {
      label: 'Health & Safety Guidance',
      href: '/health-safety',
    },
    {
      label: 'Terms of Use',
      href: '/terms-of-use',
    },
  ],
}

