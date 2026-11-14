'use client'

import { formatDuration, formatMuscle, type PlayableStretch } from '@/app/lib/sharedRoutine'
import { TAILWIND_CLASSES } from '@/app/lib/constants'

interface CountdownProps {
  kind: 'preview' | 'swap'
  stretch: PlayableStretch
  isFirst: boolean
  remaining: number
  total: number
  paused: boolean
  onReady: () => void
}

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** "Get ready" / "Up next" before a stretch, and "Swap sides" between sides. */
export function Countdown({ kind, stretch, isFirst, remaining, total, paused, onReady }: CountdownProps) {
  const heading = kind === 'swap' ? 'Swap sides' : isFirst ? 'Get ready' : 'Up next'
  const drained = total > 0 ? 1 - remaining / total : 1
  const durationLabel =
    stretch.mode === 'reps' && stretch.reps
      ? `${stretch.reps} reps${stretch.bothSides ? ' each side' : ''}`
      : `${formatDuration(stretch.seconds)}${stretch.bothSides ? ' each side' : ''}`

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">{heading}</p>

      <div className="relative my-6 h-36 w-36" role="timer" aria-live="polite" aria-label={`Starting in ${remaining}`}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={RADIUS} className="stroke-teal-100" strokeWidth="8" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            className="stroke-teal-500 transition-[stroke-dashoffset] duration-1000 ease-linear"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * drained}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-teal-900">
          {remaining}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-teal-900">{stretch.name}</h2>
      {kind === 'swap' ? (
        <p className="mt-2 text-gray-600">Great job on the left side! Now switch to your right side.</p>
      ) : (
        <p className="mt-2 text-gray-600">{durationLabel}</p>
      )}

      {kind === 'preview' && stretch.targetMuscles.length > 0 && (
        <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Target muscles">
          {stretch.targetMuscles.map((muscle) => (
            <li key={muscle} className="rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-800">
              {formatMuscle(muscle)}
            </li>
          ))}
        </ul>
      )}

      {paused && <p className="mt-4 text-sm font-medium text-amber-600">Paused</p>}

      <button
        type="button"
        onClick={onReady}
        className={`${TAILWIND_CLASSES.button.base} ${TAILWIND_CLASSES.button.secondary} ${TAILWIND_CLASSES.button.sizes.sm} mt-8`}
      >
        Start now
      </button>
    </div>
  )
}
