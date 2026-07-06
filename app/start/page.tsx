import type { Metadata } from 'next'
import Image from 'next/image'
import { Header, Footer } from '@/app/components/layout'
import { DownloadButtons } from '@/app/components/ui'
import { TAILWIND_CLASSES } from '@/app/lib/constants'

export const metadata: Metadata = {
  title: 'Someone sent you a stretch routine | Limba',
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
          {/* App-icon tile so the page reads as "get this app" at a glance */}
          <div className="flex justify-center mb-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-[22.5%] border border-gray-200 bg-white shadow-lg">
              <Image
                src="/images/LIMBA@2x.png"
                alt="Limba app icon"
                width={160}
                height={53}
                priority
                className="h-auto w-16"
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-4">
            Someone sent you a stretch routine
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Download Limba to try it, and get your own routines personalised to
            how your body feels, in under 5 minutes a day.
          </p>
          <DownloadButtons justify="center" />
        </div>
      </section>
      <Footer />
    </main>
  )
}
