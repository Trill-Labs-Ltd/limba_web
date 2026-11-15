import { cache } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Header, Footer } from '@/app/components/layout'
import { DownloadButtons } from '@/app/components/ui'
import { TAILWIND_CLASSES } from '@/app/lib/constants'
import {
  buildOneLinkUrl,
  sharedRoutineDescription,
  sharedRoutineTitle,
  summarise,
  toPlayable,
  type PlayableStretch,
} from '@/app/lib/sharedRoutine'
import { fetchSharedRoutine } from '@/app/lib/sharedRoutineApi'
import { SharedRoutineExperience } from './SharedRoutineExperience'

// Every view must hit the backend: it checks expiry, counts the view and signs
// fresh video URLs for the player.
export const dynamic = 'force-dynamic'

const SITE_URL = 'https://getlimba.com'

interface SharedRoutinePageProps {
  params: { code: string }
}

interface LoadedRoutine {
  senderName: string | null
  senderId: string | null
  stretches: PlayableStretch[]
}

/**
 * One backend call per request, shared by generateMetadata and the page (React
 * cache() dedupes within a single render), so a visit counts as one view. The
 * backend's public endpoint (not the Supabase RPC) is used because it also
 * returns stretch names, steps and signed videos for the browser player.
 */
const getSharedRoutine = cache(async (code: string): Promise<LoadedRoutine | null> => {
  const routine = await fetchSharedRoutine(code)
  if (!routine) return null
  const stretches = toPlayable(routine.stretches)
  if (stretches.length === 0) return null
  return { senderName: routine.sender_name, senderId: routine.sender_id, stretches }
})

export async function generateMetadata({
  params,
}: SharedRoutinePageProps): Promise<Metadata> {
  const routine = await getSharedRoutine(params.code)
  if (!routine) notFound()

  const title = sharedRoutineTitle(routine.senderName)
  const description = sharedRoutineDescription(summarise(routine.stretches))
  const url = `${SITE_URL}/r/${params.code}`

  // The OG/Twitter image comes from ./opengraph-image.tsx (file convention),
  // which is static so link previews don't call the backend again.
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
 * this page is never shown. Everyone else sees a preview of the routine and can
 * do it right here in the browser ("Start routine"), open it in the app, or
 * install. The OneLink carries the code through install (deferred deep link) so
 * the routine is waiting when the app first opens.
 */
export default async function SharedRoutinePage({
  params,
}: SharedRoutinePageProps) {
  const routine = await getSharedRoutine(params.code)
  if (!routine) notFound()

  const { stretchCount, totalMinutes } = summarise(routine.stretches)
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
            {sharedRoutineTitle(routine.senderName)}
          </h1>
          <div className="mb-10 inline-flex items-center gap-3 rounded-full bg-teal-50 px-5 py-2 text-lg font-medium text-teal-800">
            <span>
              {stretchCount} {stretchCount === 1 ? 'stretch' : 'stretches'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{totalMinutes} min</span>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Follow along right here in your browser, no download needed. Got
            Limba? Open it in the app instead.
          </p>
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <SharedRoutineExperience
              code={params.code}
              senderUserId={routine.senderId}
              stretches={routine.stretches}
              oneLink={oneLink}
            />
            <a
              href={`limba://r/${params.code}`}
              className={`${TAILWIND_CLASSES.button.base} ${TAILWIND_CLASSES.button.secondary} ${TAILWIND_CLASSES.button.sizes.md} inline-block`}
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
