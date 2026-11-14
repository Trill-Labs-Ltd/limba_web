import { cache } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Header, Footer } from '@/app/components/layout'
import { DownloadButtons } from '@/app/components/ui'
import { TAILWIND_CLASSES } from '@/app/lib/constants'
import { supabase } from '@/app/lib/supabase'
import {
  buildOneLinkUrl,
  isValidShareCode,
  sharedRoutineDescription,
  sharedRoutineTitle,
  summarise,
  type SharedRoutine,
} from '@/app/lib/sharedRoutine'

// Every view must hit the RPC: it checks expiry and counts the view.
export const dynamic = 'force-dynamic'

const SITE_URL = 'https://getlimba.com'

interface SharedRoutinePageProps {
  params: { code: string }
}

/**
 * One RPC call per request, shared by generateMetadata and the page (React
 * cache() dedupes within a single render), so a visit counts as one view.
 */
const getSharedRoutine = cache(
  async (code: string): Promise<SharedRoutine | null> => {
    if (!isValidShareCode(code)) return null
    const { data, error } = await supabase.rpc('get_shared_routine', { code })
    if (error) {
      console.error('get_shared_routine failed', {
        message: error.message,
        code: error.code,
      })
      return null
    }
    const routine = data as SharedRoutine | null
    if (!routine || !Array.isArray(routine.s)) return null
    return routine
  }
)

export async function generateMetadata({
  params,
}: SharedRoutinePageProps): Promise<Metadata> {
  const routine = await getSharedRoutine(params.code)
  if (!routine) notFound()

  const title = sharedRoutineTitle(routine.n)
  const description = sharedRoutineDescription(summarise(routine.s))
  const url = `${SITE_URL}/r/${params.code}`

  // The OG/Twitter image comes from ./opengraph-image.tsx (file convention),
  // which is static so link previews don't call the RPC again.
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Limba',
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/**
 * Landing page for a shared-routine short link, https://getlimba.com/r/<code>.
 *
 * With the app installed, Universal Links / App Links open the app directly and
 * this page is never shown. Everyone else sees a preview of the routine and the
 * store buttons; the OneLink carries the code through install (deferred deep
 * link) so the routine is waiting when the app first opens.
 */
export default async function SharedRoutinePage({
  params,
}: SharedRoutinePageProps) {
  const routine = await getSharedRoutine(params.code)
  if (!routine) notFound()

  const { stretchCount, totalMinutes } = summarise(routine.s)
  const oneLink = buildOneLinkUrl(params.code)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="w-full py-20 lg:py-28">
        <div className={`${TAILWIND_CLASSES.container} max-w-2xl text-center`}>
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
          <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-6">
            {sharedRoutineTitle(routine.n)}
          </h1>
          <div className="mb-10 inline-flex items-center gap-3 rounded-full bg-teal-50 px-5 py-2 text-lg font-medium text-teal-800">
            <span>
              {stretchCount} {stretchCount === 1 ? 'stretch' : 'stretches'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{totalMinutes} min</span>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Open it in Limba to follow along. New to Limba? It&rsquo;s free to
            try, and the routine will be waiting once you&rsquo;ve installed it.
          </p>
          <div className="mb-8">
            <a
              href={`limba://r/${params.code}`}
              className={`${TAILWIND_CLASSES.button.base} ${TAILWIND_CLASSES.button.primary} ${TAILWIND_CLASSES.button.sizes.md} inline-block`}
            >
              Open in app
            </a>
          </div>
          <DownloadButtons
            justify="center"
            appStoreHref={oneLink ?? undefined}
            playStoreHref={oneLink ?? undefined}
          />
        </div>
      </section>
      <Footer />
    </main>
  )
}
