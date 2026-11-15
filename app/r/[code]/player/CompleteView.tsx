'use client'

import { useEffect, useState } from 'react'
import type { RoutineSummary } from '@/app/lib/sharedRoutine'
import { APP_STORE_URL, DownloadButtons, PLAY_STORE_URL } from '@/app/components/ui/DownloadButtons'
import { CheckCircleIcon, PersonSimpleTaiChiDuotoneIcon } from './appIcons'
import styles from './player.module.css'

/**
 * End of the routine, ported from limba_mobile app/(app)/routine-complete.tsx
 * as a guest sees it: the celebration background, "Completed" pill, the Limba
 * cat celebrating, the Stretches / Duration card, the glowing button and the
 * store badges under it.
 * "Download Limba" goes through OneLink, so after install the app opens on
 * this shared routine (deferred deep link).
 *
 * The app's cat is a Rive animation over a Lottie confetti loop; the web draws
 * the same cat with CSS (pop-in, glow, ripple, sparkles, confetti) so it needs
 * no animation runtime.
 */

interface CompleteViewProps {
  summary: RoutineSummary
  oneLink: string | null
}

/** Store link for this device when OneLink isn't configured. */
function deviceStoreUrl(): string {
  if (typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)) return PLAY_STORE_URL
  return APP_STORE_URL
}

/** The app's complete-screen duration: "45s", "6m", "6m 20s". */
function formatCompleteDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds))
  const mins = Math.floor(s / 60)
  const secs = s % 60
  if (mins === 0) return `${secs}s`
  if (secs === 0) return `${mins}m`
  return `${mins}m ${secs}s`
}

const CONFETTI_COLOURS = ['#14B8A6', '#F59E0B', '#F472B6', '#60A5FA', '#A78BFA', '#34D399', '#FB923C']

export function CompleteView({ summary, oneLink }: CompleteViewProps) {
  // Resolved after mount so the server and client render the same href.
  const [storeUrl, setStoreUrl] = useState(APP_STORE_URL)
  useEffect(() => setStoreUrl(deviceStoreUrl()), [])
  const downloadHref = oneLink ?? storeUrl

  return (
    <div className="relative flex h-full flex-col bg-[#EFFEF9]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/player/routine-complete-bg.webp" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <Confetti />

      <div className={`relative z-10 flex min-h-0 flex-1 flex-col px-6 pt-[env(safe-area-inset-top)] ${styles.enter}`}>
        <div className="flex flex-1 flex-col items-center overflow-y-auto pb-[calc(20px+env(safe-area-inset-bottom))] pt-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mb-2 flex flex-col items-center">
            <span className="mb-3 flex items-center gap-1.5 rounded-[18px] bg-white/70 px-3 py-1.5">
              <CheckCircleIcon size={17} className="text-[#087F6B]" />
              <span className="text-[11px] font-bold tracking-[1px] text-[#087F6B]">COMPLETED</span>
            </span>
            <h2 className="mb-1 text-center text-[28px] font-bold tracking-[-1px] text-black">Routine Complete!</h2>
            <p className="px-5 text-center text-[15px] font-medium leading-5 text-[#666666] opacity-80">
              Nice work. Limba builds routines like this around your body, every day.
            </p>
          </div>

          <CelebratingCat />

          <div className="mb-4 flex w-full items-center justify-evenly rounded-[20px] border border-[rgba(8,127,107,0.12)] bg-[#E9F8F3] px-1.5 py-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            <Stat
              icon={<PersonSimpleTaiChiDuotoneIcon size={24} className="text-[#008080]" />}
              iconBackground="#E0F2F1"
              value={String(summary.stretchCount)}
              label="Stretches"
            />
            <span className="h-[30px] w-px bg-black/5" />
            <Stat
              // eslint-disable-next-line @next/next/no-img-element
              icon={<img src="/player/clock.webp" alt="" className="h-6 w-6 object-contain" />}
              iconBackground="#FFF8E1"
              value={formatCompleteDuration(summary.totalSeconds)}
              label="Duration"
            />
          </div>

          {/* The CTA sits right under the summary, with the store badges below it. */}
          <a
            href={downloadHref}
            className={`mt-2 flex h-14 w-full shrink-0 items-center justify-center rounded-[28px] bg-[#008080] text-lg font-bold tracking-[0.5px] text-white ${styles.glow}`}
          >
            Download Limba
          </a>
          <DownloadButtons
            className="mt-5"
            justify="center"
            size="sm"
            appStoreHref={oneLink ?? undefined}
            playStoreHref={oneLink ?? undefined}
          />
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, iconBackground, value, label }: { icon: React.ReactNode; iconBackground: string; value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]" style={{ background: iconBackground }}>
        {icon}
      </span>
      <span className="min-w-0 shrink">
        <span className="block text-lg font-bold text-black">{value}</span>
        <span className="block text-[9px] font-semibold uppercase leading-[11px] text-[#666666]">{label}</span>
      </span>
    </div>
  )
}

/** The Limba cat popping in with a glow, a ripple and twinkling sparkles. */
function CelebratingCat() {
  const sparkles = [
    { left: '12%', top: '18%', delay: '0s', size: 14 },
    { left: '82%', top: '24%', delay: '0.6s', size: 12 },
    { left: '76%', top: '72%', delay: '1.2s', size: 10 },
  ]
  return (
    <div className="relative mb-[5px] flex h-[231px] w-[250px] items-center justify-center" aria-hidden="true">
      <span
        className={`absolute h-[190px] w-[190px] rounded-full ${styles.bloom}`}
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(178,223,223,0.55) 45%, rgba(178,223,223,0) 70%)' }}
      />
      <span className={`absolute h-[170px] w-[170px] rounded-full border-4 border-white/80 ${styles.ripple}`} />
      {sparkles.map((s) => (
        <svg
          key={s.left}
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          className={`absolute ${styles.twinkle}`}
          style={{ left: s.left, top: s.top, animationDelay: s.delay }}
        >
          <path d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z" fill="#F5A623" />
        </svg>
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/player/limba-cat-happy.webp" alt="" className={`relative h-[200px] w-auto ${styles.catPop}`} />
    </div>
  )
}

/** Confetti drifting down the whole screen, like the app's Lottie overlay. */
function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => {
    const left = (i * 37) % 100
    return {
      left: `${left}%`,
      colour: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
      duration: `${5 + ((i * 7) % 5)}s`,
      delay: `-${(i * 0.73) % 6}s`,
      drift: `${((i % 5) - 2) * 18}px`,
      width: i % 3 === 0 ? 6 : 8,
      height: i % 3 === 0 ? 10 : 6,
      round: i % 4 === 0,
    }
  })
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className={`absolute top-0 ${styles.confetti}`}
          style={
            {
              left: p.left,
              width: p.width,
              height: p.height,
              background: p.colour,
              borderRadius: p.round ? '9999px' : '2px',
              animationDuration: p.duration,
              animationDelay: p.delay,
              '--drift': p.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
