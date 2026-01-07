import type { Metadata } from 'next'
import { Header, Footer } from '@/app/components/layout'
import { HealthSafetyContent } from '@/app/components/sections'
import { TAILWIND_CLASSES } from '@/app/lib/constants'

export const metadata: Metadata = {
  title: 'Health & Safety Guidance | Limba',
  description:
    'Health and Safety Guidance for Limba - Important information about safe use of the app, contraindications, and when to seek medical assistance.',
}

export default function HealthSafetyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="w-full py-16 lg:py-24">
        <div className={`${TAILWIND_CLASSES.container} max-w-4xl`}>
          <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-8 lg:p-12">
            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-4">
              Health & Safety Guidance
            </h1>

            {/* Metadata */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
              <p>Last updated: 28 December 2025</p>
              <p>Version 1.1</p>
            </div>

            {/* Content */}
            <HealthSafetyContent />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

