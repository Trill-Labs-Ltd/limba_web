import type { Metadata } from 'next'
import Image from 'next/image'
import { Header, Footer } from '@/app/components/layout'
import { DownloadButtons } from '@/app/components/ui'
import { TAILWIND_CLASSES } from '@/app/lib/constants'

/**
 * Page copy per `?dest=`. The default covers a shared routine (`?r=`) and any
 * unrecognised value; `membership` is the fallback for the lifecycle emails'
 * "Manage membership" CTA (see limba_backend EmailService.MANAGE_URL).
 *
 * Keys must stay in sync with limba_mobile's DEEP_LINK_DESTS — the app handles a
 * dest we don't have copy for by falling back to the default, which is wrong but
 * harmless; the reverse (copy here, no route there) never reaches this page.
 */
const VARIANTS = {
  default: {
    title: 'Someone sent you a stretch routine | Limba',
    description:
      'Someone shared their stretch routine with you. Download Limba and get your own personalised routine in under 5 minutes a day.',
    heading: 'Someone sent you a stretch routine',
    body: 'Download Limba to try it, and get your own routines personalised to how your body feels, in under 5 minutes a day.',
  },
  membership: {
    title: 'Manage your membership | Limba',
    description: 'Open Limba on your phone to manage your membership.',
    heading: 'Manage your membership in the app',
    body: 'Your membership lives in the Limba app on your phone. Open it, tap More, then Manage subscription to see your plan or make any changes. If Limba isn’t on this device, you can grab it below.',
  },
} as const

type Variant = keyof typeof VARIANTS

/**
 * Narrows an arbitrary query value to a variant we have copy for.
 *
 * Uses hasOwnProperty rather than `in`: `in` walks the prototype chain, so
 * `?dest=__proto__` (or `toString`, `constructor`, …) would match and resolve to
 * an Object.prototype member, rendering a page with no heading or title.
 */
function variantFor(dest: string | string[] | undefined): Variant {
  const value = Array.isArray(dest) ? dest[0] : dest
  return value && Object.prototype.hasOwnProperty.call(VARIANTS, value)
    ? (value as Variant)
    : 'default'
}

interface StartPageProps {
  searchParams: { dest?: string | string[] }
}

export function generateMetadata({ searchParams }: StartPageProps): Metadata {
  const { title, description } = VARIANTS[variantFor(searchParams.dest)]
  return { title, description }
}

/**
 * Landing page for the deep link https://www.getlimba.com/start.
 *
 * On a device with the app installed, iOS/Android open the app directly (see
 * the .well-known verification files + the mobile app's start route) and this
 * page is never shown. Everyone else lands here — most often someone reading a
 * lifecycle email on desktop — so the copy has to answer "what now?" without the
 * app. `?dest=` says which email sent them; see VARIANTS.
 */
export default function StartPage({ searchParams }: StartPageProps) {
  const { heading, body } = VARIANTS[variantFor(searchParams.dest)]

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
            {heading}
          </h1>
          <p className="text-lg text-gray-600 mb-10">{body}</p>
          <DownloadButtons justify="center" />
        </div>
      </section>
      <Footer />
    </main>
  )
}
