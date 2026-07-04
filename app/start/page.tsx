import type { Metadata } from 'next'
import { Header, Footer } from '@/app/components/layout'
import { DownloadButtons } from '@/app/components/ui'
import { TAILWIND_CLASSES } from '@/app/lib/constants'

export const metadata: Metadata = {
  title: 'Start your wellness journey | Limba',
  description:
    'Someone shared their stretch routine with you. Download Limba and get your own personalised routine in under 5 minutes a day.',
}

/**
 * Landing page for the shared deep link https://www.getlimba.com/start.
 *
 * On a device with the app installed, iOS/Android open the app directly (see
 * the .well-known verification files + the mobile app's start route) and this
 * page is never shown. Everyone else lands here and can grab the app.
 */
export default function StartPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="w-full py-20 lg:py-28">
        <div className={`${TAILWIND_CLASSES.container} max-w-2xl text-center`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-4">
            Start your wellness journey
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Someone just shared their stretch routine with you. Download Limba to
            get your own routine — personalised to how your body feels, in
            under 5 minutes a day.
          </p>
          <DownloadButtons justify="center" />
        </div>
      </section>
      <Footer />
    </main>
  )
}
