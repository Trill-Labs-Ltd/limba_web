import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { AndroidAppBanner } from '@/app/components/ui'

export const metadata: Metadata = {
  title: 'Limba - Personalised Stretch Routines in Under 5 Minutes a Day',
  description:
    'Personalised micro-routines and structured Journeys that fit your life. Limba learns where your body is stiff — neck, lower back, hips — and delivers targeted stretches in under 5 minutes. Built with Stanford & Imperial College health experts.',
  keywords: [
    'stretching app',
    'personalised stretches',
    'micro-routines',
    'quick exercises',
    'back pain relief',
    'desk exercises',
    'office stretches',
    'posture exercises',
    'remote worker wellness',
    'mobility coach',
    'personalised fitness',
    'musculoskeletal health',
    '5 minute wellness',
    'workplace wellness',
    'guided stretch programme',
    'knee mobility programme',
    'back pain programme',
    'hip mobility',
  ],
  authors: [{ name: 'Limba' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Limba',
  },
  openGraph: {
    title: 'Limba - Personalised Stretch Routines in Under 5 Minutes a Day',
    description:
      'Personalised micro-routines and structured Journeys that fit your life. Limba learns where your body is stiff and delivers targeted stretches in under 5 minutes.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://getlimba.com',
    siteName: 'Limba',
    images: [
      {
        url: 'https://getlimba.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Limba - Stretch & Mobility App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limba - Personalised Stretch Routines in Under 5 Minutes a Day',
    description:
      'Personalised micro-routines and structured Journeys that fit your life. Limba learns where your body is stiff and delivers targeted stretches in under 5 minutes.',
    images: ['https://getlimba.com/og-image.png'],
  },
  other: {
    'apple-itunes-app': 'app-id=6756675956',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <body className="antialiased">
        <AndroidAppBanner />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
