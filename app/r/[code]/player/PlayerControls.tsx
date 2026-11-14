'use client'

import type { PlayableStretch } from '@/app/lib/sharedRoutine'
import { TAILWIND_CLASSES } from '@/app/lib/constants'
import { BackIcon, SkipIcon } from './icons'

interface PlayerControlsProps {
  stretch: PlayableStretch
  side: 1 | 2
  remaining: number
  paused: boolean
  canGoBack: boolean
  onBack: () => void
  onSkip: () => void
  onTogglePause: () => void
  onSwitchSides: () => void
  onDone: () => void
}

function clock(seconds: number): string {
  const s = Math.max(0, seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

const iconButton =
  'flex h-12 w-12 items-center justify-center rounded-full text-teal-800 hover:bg-teal-50 disabled:opacity-30 disabled:hover:bg-transparent'

/**
 * Bottom bar during a stretch: Back, then the timer (tap to pause) for a timed
 * stretch or Switch sides / Done for a reps stretch, then Skip.
 */
export function PlayerControls({
  stretch,
  side,
  remaining,
  paused,
  canGoBack,
  onBack,
  onSkip,
  onTogglePause,
  onSwitchSides,
  onDone,
}: PlayerControlsProps) {
  const lastSeconds = !paused && remaining <= 3

  return (
    <div className="flex items-center justify-between gap-3">
      <button type="button" onClick={onBack} disabled={!canGoBack} className={iconButton} aria-label="Back">
        <BackIcon />
      </button>

      {stretch.mode === 'timed' ? (
        <button
          type="button"
          onClick={onTogglePause}
          aria-label={paused ? 'Resume' : 'Pause'}
          className={`min-w-[9rem] rounded-full border-2 px-6 py-3 text-center font-semibold tabular-nums transition-colors ${
            paused
              ? 'border-amber-400 text-amber-600'
              : lastSeconds
                ? 'border-amber-400 text-teal-900'
                : 'border-teal-500 text-teal-900'
          }`}
        >
          <span className="block text-2xl" role="timer">
            {clock(remaining)}
          </span>
          <span className="block text-xs font-medium uppercase tracking-wider text-gray-500">
            {paused ? 'Paused' : 'Tap to pause'}
          </span>
        </button>
      ) : stretch.bothSides && side === 1 ? (
        <button
          type="button"
          onClick={onSwitchSides}
          className={`${TAILWIND_CLASSES.button.base} ${TAILWIND_CLASSES.button.primary} ${TAILWIND_CLASSES.button.sizes.md}`}
        >
          Switch sides
        </button>
      ) : (
        <button
          type="button"
          onClick={onDone}
          className={`${TAILWIND_CLASSES.button.base} ${TAILWIND_CLASSES.button.primary} ${TAILWIND_CLASSES.button.sizes.md}`}
        >
          Done
        </button>
      )}

      <button type="button" onClick={onSkip} className={iconButton} aria-label="Skip stretch">
        <SkipIcon />
      </button>
    </div>
  )
}
