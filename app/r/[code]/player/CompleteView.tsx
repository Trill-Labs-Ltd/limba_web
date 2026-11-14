'use client'

import { useEffect, useState } from 'react'
import { DownloadButtons } from '@/app/components/ui'
import { APP_STORE_URL, PLAY_STORE_URL } from '@/app/components/ui/DownloadButtons'
import { TAILWIND_CLASSES } from '@/app/lib/constants'
import { formatDuration, type RoutineSummary } from '@/app/lib/sharedRoutine'

interface CompleteViewProps {
  summary: RoutineSummary
  oneLink: string | null
  onClose: () => void
}

/** Store link for this device when OneLink isn't configured. */
function deviceStoreUrl(): string {
  if (typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)) return PLAY_STORE_URL
  return APP_STORE_URL
}

/**
 * End of the routine. "Subscribe to Limba" goes through OneLink, so after
 * install the app opens on this shared routine (deferred deep link).
 */
export function CompleteView({ summary, oneLink, onClose }: CompleteViewProps) {
  // Resolved after mount so the server and client render the same href.
  const [storeUrl, setStoreUrl] = useState(APP_STORE_URL)
  useEffect(() => setStoreUrl(deviceStoreUrl()), [])
  const subscribeHref = oneLink ?? storeUrl

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <span className="rounded-full bg-teal-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">
        Completed
      </span>
      <h2 className="mt-4 text-3xl font-bold text-teal-900">Routine complete!</h2>
      <p className="mt-3 max-w-sm text-gray-600">
        Nice work. Limba builds routines like this around your body, every day.
      </p>

      <dl className="mt-8 grid w-full max-w-xs grid-cols-2 gap-4">
        <div className="rounded-2xl bg-teal-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Stretches</dt>
          <dd className="mt-1 text-2xl font-bold text-teal-900">{summary.stretchCount}</dd>
        </div>
        <div className="rounded-2xl bg-teal-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Duration</dt>
          <dd className="mt-1 text-2xl font-bold text-teal-900">{formatDuration(summary.totalSeconds)}</dd>
        </div>
      </dl>

      <a
        href={subscribeHref}
        className={`${TAILWIND_CLASSES.button.base} ${TAILWIND_CLASSES.button.primary} ${TAILWIND_CLASSES.button.sizes.lg} mt-10 inline-block`}
      >
        Subscribe to Limba
      </a>

      <div className="mt-8">
        <DownloadButtons
          justify="center"
          size="sm"
          appStoreHref={oneLink ?? undefined}
          playStoreHref={oneLink ?? undefined}
        />
      </div>

      <button type="button" onClick={onClose} className="mt-8 text-sm font-medium text-gray-500 hover:text-teal-700">
        Close
      </button>
    </div>
  )
}
