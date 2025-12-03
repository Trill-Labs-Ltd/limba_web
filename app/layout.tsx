import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Limba - Feel better in under 5 minutes a day',
  description:
    'Personalised wellness micro-routines that fit seamlessly into your workday.',
  keywords: [
    'wellness',
    'health',
    'micro-routines',
    'desk exercises',
    'pain relief',
  ],
  authors: [{ name: 'Limba' }],
  openGraph: {
    title: 'Limba - Feel better in under 5 minutes a day',
    description:
      'Personalised wellness micro-routines that fit seamlessly into your workday.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

