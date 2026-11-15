'use client'

import { useEffect, useState } from 'react'
import type { RoutineSummary } from '@/app/lib/sharedRoutine'
import {
  APP_STORE_URL,
  DownloadButtons,
  PLAY_STORE_URL,
} from '@/app/components/ui/DownloadButtons'
import { CheckCircleIcon, PersonSimpleTaiChiDuotoneIcon } from './appIcons'
import { useAppScale } from './appScale'
import { FeatureCarousel } from './FeatureCarousel'
import { WithWordmark } from './Wordmark'
import styles from './player.module.css'

/**
 * End of the routine, ported from limba_mobile app/(app)/routine-complete.tsx
 * as a guest sees it: the celebration background, "Completed" pill, the Limba
 * cat celebrating and the Stretches / Duration card, then a swipeable strip of
 * app features (web only), with the glowing button and the store badges
 * pinned to the bottom.
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
  /** Sender's first name, for the feature strip's heading. */
  senderName: string | null
}

/** Store link for this device when OneLink isn't configured. */
function deviceStoreUrl(): string {
  if (typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent))
    return PLAY_STORE_URL
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

const CONFETTI_COLOURS = [
  '#14B8A6',
  '#F59E0B',
  '#F472B6',
  '#60A5FA',
  '#A78BFA',
  '#34D399',
  '#FB923C',
]

export function CompleteView({
  summary,
  oneLink,
  senderName,
}: CompleteViewProps) {
  const { s, vs, ms } = useAppScale()
  // Resolved after mount so the server and client render the same href.
  const [storeUrl, setStoreUrl] = useState(APP_STORE_URL)
  useEffect(() => setStoreUrl(deviceStoreUrl()), [])
  const downloadHref = oneLink ?? storeUrl

  return (
    <div className="relative flex h-full flex-col bg-[#EFFEF9]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/player/routine-complete-bg.webp"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <Confetti />

      <div
        className={`relative z-10 flex min-h-0 flex-1 flex-col ${styles.enter}`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div
          className="flex flex-1 flex-col items-center overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            paddingTop: vs(10),
            paddingBottom: vs(16),
            paddingLeft: s(24),
            paddingRight: s(24),
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{ marginBottom: vs(8) }}
          >
            <span
              className="flex items-center bg-white/70"
              style={{
                gap: s(6),
                paddingLeft: s(12),
                paddingRight: s(12),
                paddingTop: vs(6),
                paddingBottom: vs(6),
                borderRadius: s(18),
                marginBottom: vs(12),
              }}
            >
              <CheckCircleIcon size={s(17)} className="text-[#087F6B]" />
              <span
                className="font-bold text-[#087F6B]"
                style={{ fontSize: ms(11), letterSpacing: 1 }}
              >
                COMPLETED
              </span>
            </span>
            <h2
              className="text-center font-bold text-black"
              style={{
                fontSize: ms(28),
                letterSpacing: -1,
                marginBottom: vs(4),
              }}
            >
              Routine Complete!
            </h2>
            <p
              className="text-center font-medium text-[#666666] opacity-80"
              style={{
                fontSize: ms(15),
                lineHeight: `${ms(20)}px`,
                paddingLeft: s(20),
                paddingRight: s(20),
              }}
            >
              <WithWordmark
                text="Nice work. Limba builds routines like this around your body, every day."
                fontSize={ms(15)}
              />
            </p>
          </div>

          <CelebratingCat />

          <div
            className="flex w-full items-center justify-evenly border border-[rgba(8,127,107,0.12)] bg-[#E9F8F3] shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
            style={{
              borderRadius: s(20),
              paddingTop: vs(14),
              paddingBottom: vs(14),
              paddingLeft: s(6),
              paddingRight: s(6),
              marginBottom: vs(16),
            }}
          >
            <Stat
              icon={
                <PersonSimpleTaiChiDuotoneIcon
                  size={s(24)}
                  className="text-[#008080]"
                />
              }
              iconBackground="#E0F2F1"
              value={String(summary.stretchCount)}
              label="Stretches"
            />
            <span className="w-px bg-black/5" style={{ height: vs(30) }} />
            <Stat
              // eslint-disable-next-line @next/next/no-img-element
              icon={
                <img
                  src="/player/clock.webp"
                  alt=""
                  className="object-contain"
                  style={{ width: s(24), height: s(24) }}
                />
              }
              iconBackground="#FFF8E1"
              value={formatCompleteDuration(summary.totalSeconds)}
              label="Duration"
            />
          </div>

          <FeatureCarousel senderName={senderName} />
        </div>

        {/* Pinned, so Download Limba stays on screen while the visitor swipes. */}
        <div
          className="shrink-0"
          style={{
            paddingTop: vs(12),
            paddingLeft: s(24),
            paddingRight: s(24),
            paddingBottom: `calc(${vs(16)}px + env(safe-area-inset-bottom))`,
            background:
              'linear-gradient(180deg, rgba(220,245,236,0) 0%, rgba(220,245,236,0.92) 28%, rgba(220,245,236,0.96) 100%)',
          }}
        >
          <a
            href={downloadHref}
            className={`flex w-full items-center justify-center bg-[#008080] font-bold text-white ${styles.glow}`}
            style={{
              height: vs(56),
              borderRadius: s(28),
              fontSize: ms(18),
              letterSpacing: 0.5,
            }}
          >
            Download Limba
          </a>
          <div style={{ marginTop: vs(12) }}>
            <DownloadButtons
              justify="center"
              size="sm"
              appStoreHref={oneLink ?? undefined}
              playStoreHref={oneLink ?? undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon,
  iconBackground,
  value,
  label,
}: {
  icon: React.ReactNode
  iconBackground: string
  value: string
  label: string
}) {
  const { s, vs, ms } = useAppScale()
  return (
    <div
      className="flex min-w-0 flex-1 items-center justify-center"
      style={{ gap: s(4) }}
    >
      <span
        className="flex shrink-0 items-center justify-center"
        style={{
          width: s(36),
          height: vs(36),
          borderRadius: s(11),
          background: iconBackground,
        }}
      >
        {icon}
      </span>
      <span className="min-w-0 shrink">
        <span
          className="block font-bold text-black"
          style={{ fontSize: ms(18) }}
        >
          {value}
        </span>
        <span
          className="block font-semibold uppercase text-[#666666]"
          style={{ fontSize: ms(9), lineHeight: `${ms(11)}px` }}
        >
          {label}
        </span>
      </span>
    </div>
  )
}

/** The Limba cat popping in with a glow, a ripple and twinkling sparkles, in the app's 250x231 hero box. */
function CelebratingCat() {
  const { s, vs } = useAppScale()
  const sparkles = [
    { left: '12%', top: '18%', delay: '0s', size: 14 },
    { left: '82%', top: '24%', delay: '0.6s', size: 12 },
    { left: '76%', top: '72%', delay: '1.2s', size: 10 },
  ]
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: s(250), height: s(231), marginBottom: vs(5) }}
      aria-hidden="true"
    >
      <span
        className={`absolute rounded-full ${styles.bloom}`}
        style={{
          width: s(190),
          height: s(190),
          background:
            'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(178,223,223,0.55) 45%, rgba(178,223,223,0) 70%)',
        }}
      />
      <span
        className={`absolute rounded-full border-white/80 ${styles.ripple}`}
        style={{ width: s(170), height: s(170), borderWidth: s(4) }}
      />
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.left}
          viewBox="0 0 24 24"
          width={s(sparkle.size)}
          height={s(sparkle.size)}
          className={`absolute ${styles.twinkle}`}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay,
          }}
        >
          <path
            d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z"
            fill="#F5A623"
          />
        </svg>
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/player/limba-cat-happy.webp"
        alt=""
        className={`relative w-auto ${styles.catPop}`}
        style={{ height: s(200) }}
      />
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
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
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
