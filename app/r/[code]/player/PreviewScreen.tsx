'use client'

import { useEffect, useState } from 'react'
import { formatMuscle, type PlayableStretch } from '@/app/lib/sharedRoutine'
import { stretchIconUrl } from '@/app/lib/stretchIcons'
import { ArrowsLeftRightIcon, ClockIcon, PersonArmsSpreadDuotoneIcon } from './appIcons'
import { MuscleMap } from './MuscleMap'
import styles from './player.module.css'

/**
 * "Get ready" / "Up next" screen before every stretch, ported from limba_mobile
 * src/components/routine/NextStretchPreview.tsx: stretch illustration, name,
 * duration, target muscles with the body map, and the 5 s countdown ring.
 */

const COUNTDOWN_SIZE = 110
const RING_STROKE = 5
const RING_RADIUS = (COUNTDOWN_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const INNER_SIZE = COUNTDOWN_SIZE - RING_STROKE * 4

/** The app's NextStretchPreview duration label: "30s", "1 min", "1m 30s". */
function formatPreviewDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return secs === 0 ? `${mins} min` : `${mins}m ${secs}s`
}

interface PreviewScreenProps {
  stretch: PlayableStretch
  stretchNumber: number
  totalStretches: number
  remaining: number
  total: number
  onReady: () => void
}

export function PreviewScreen({ stretch, stretchNumber, totalStretches, remaining, total, onReady }: PreviewScreenProps) {
  const iconUrl = stretchIconUrl({ id: stretch.id, name: stretch.name })
  const duration = stretch.mode === 'reps' && stretch.reps ? `${stretch.reps} reps` : formatPreviewDuration(stretch.seconds)
  const progress = totalStretches > 0 ? stretchNumber / totalStretches : 0

  // The ring drains a step each second, easing over 950 ms like the app.
  const [ring, setRing] = useState(1)
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setRing(Math.max(remaining - 1, 0) / total))
    return () => window.cancelAnimationFrame(id)
  }, [remaining, total])

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center px-6 py-8">
      <div className="mb-2.5 flex w-full items-center justify-between">
        <span className="text-[13px] font-bold tracking-[2px] text-[#008080]">
          {stretchNumber === 1 ? 'GET READY' : 'UP NEXT'}
        </span>
        <span className="rounded-2xl bg-[#B2DFDF] px-3 py-[5px] text-xs font-bold text-[#008080]">
          {stretchNumber} of {totalStretches}
        </span>
      </div>

      <div className="mb-[18px] h-1 w-full overflow-hidden rounded-sm bg-[rgba(0,128,128,0.15)]" aria-hidden="true">
        <div className="h-full rounded-sm bg-[#008080]" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="mb-4 flex h-[260px] w-full max-w-[334px] items-center justify-center overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={iconUrl} alt="" className="h-[230px] w-[230px] object-contain" />
        ) : (
          <PersonArmsSpreadDuotoneIcon size={80} className="text-[#B2DFDF]" />
        )}
      </div>

      <div className="mb-5 flex w-full flex-col items-start">
        <h2 className="mb-2.5 text-left text-[22px] font-bold leading-tight text-[#008080]">{stretch.name}</h2>
        <div className="flex flex-wrap gap-2">
          <MetaPill icon={<ClockIcon size={15} />} text={duration} />
          {stretch.bothSides && <MetaPill icon={<ArrowsLeftRightIcon size={15} />} text="Both sides" />}
        </div>
      </div>

      {stretch.targetMuscles.length > 0 && (
        <div className="mb-5 w-full">
          <p className="mb-2 text-[10px] font-bold tracking-[2px] text-[#008080] opacity-70">TARGET MUSCLES</p>
          <div className="flex items-start gap-3">
            <MuscleMap muscles={stretch.targetMuscles} />
            <div className="flex flex-1 flex-wrap gap-2">
              {stretch.targetMuscles.map((muscle) => (
                <span
                  key={muscle}
                  className="flex items-center gap-[5px] rounded-[20px] bg-[#B2DFDF] px-3 py-1.5 text-[13px] font-semibold uppercase text-[#008080]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#008080]" />
                  {formatMuscle(muscle)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tapping the countdown starts straight away (the app has no tap target here). */}
      <button
        type="button"
        onClick={onReady}
        aria-label="Start now"
        className={`relative flex shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(0,128,128,0.35)] ${remaining % 2 ? styles.pulseA : styles.pulseB}`}
        style={{ width: COUNTDOWN_SIZE, height: COUNTDOWN_SIZE }}
      >
        <svg width={COUNTDOWN_SIZE} height={COUNTDOWN_SIZE} className="absolute inset-0" aria-hidden="true">
          <circle
            cx={COUNTDOWN_SIZE / 2}
            cy={COUNTDOWN_SIZE / 2}
            r={RING_RADIUS}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={RING_STROKE}
            fill="none"
          />
          <circle
            cx={COUNTDOWN_SIZE / 2}
            cy={COUNTDOWN_SIZE / 2}
            r={RING_RADIUS}
            stroke="#FFFFFF"
            strokeWidth={RING_STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - ring)}
            transform={`rotate(-90 ${COUNTDOWN_SIZE / 2} ${COUNTDOWN_SIZE / 2})`}
            style={{ transition: 'stroke-dashoffset 950ms linear' }}
          />
        </svg>
        <span
          className="flex flex-col items-center justify-center rounded-full"
          style={{
            width: INNER_SIZE,
            height: INNER_SIZE,
            background: 'linear-gradient(135deg, #00B0B0 0%, #006666 100%)',
          }}
        >
          <span className="text-4xl font-bold leading-10 text-white">{remaining > 0 ? remaining : 'GO'}</span>
          {remaining <= 0 && <span className="mt-0.5 text-[10px] font-bold tracking-[1px] text-white opacity-90">START</span>}
        </span>
      </button>
    </div>
  )
}

function MetaPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-[5px] rounded-[20px] border border-[rgba(0,128,128,0.12)] bg-white/55 px-2.5 py-[5px] text-xs font-semibold text-[#008080]">
      {icon}
      {text}
    </span>
  )
}
