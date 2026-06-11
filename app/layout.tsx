import type { Metadata } from 'next'
import './globals.css'
import { AndroidAppBanner } from '@/app/components/ui'

export const metadata: Metadata = {
  title: 'Limba - AI-Powered Wellness in Under 5 Minutes a Day',
  description:
    'AI-personalised micro-routines and structured Journeys that fit your life. Limba learns your unique aches and pains, then delivers targeted exercises in under 5 minutes. Built by Stanford & Imperial College health experts.',
  keywords: [
    'AI wellness app',
    'AI personalised exercises',
    'micro-routines',
    'quick exercises',
    'back pain relief',
    'desk exercises',
    'office stretches',
    'posture exercises',
    'remote worker wellness',
    'AI health coach',
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
    title: 'Limba - AI-Powered Wellness in Under 5 Minutes a Day',
    description:
      'AI-personalised micro-routines and structured Journeys that fit your life. Limba learns your unique aches and delivers targeted exercises in under 5 minutes.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://getlimba.com',
    siteName: 'Limba',
    images: [
      {
        url: 'https://getlimba.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Limba - AI-Powered Wellness App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limba - AI-Powered Wellness in Under 5 Minutes a Day',
    description:
      'AI-personalised micro-routines and structured Journeys that fit your life. Limba learns your unique aches and delivers targeted exercises in under 5 minutes.',
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
      </body>
    </html>
  )
}
