'use client'

import { formatMuscle, type PlayableStretch } from '@/app/lib/sharedRoutine'
import { ArrowsLeftRightIcon, PersonIcon } from './appIcons'
import { useAppScale } from './appScale'
import styles from './player.module.css'

/**
 * "Swap sides" screen between the two sides of a stretch, ported from
 * limba_mobile src/components/routine/SwapSidesPrompt.tsx (same sizes, through
 * the app's scale helpers).
 */

const TEAL = '#008080'
const GREY = '#666666'

export function SwapScreen({
  stretch,
  remaining,
}: {
  stretch: PlayableStretch
  remaining: number
}) {
  const { s, vs, ms } = useAppScale()
  const muscles = stretch.targetMuscles
    .map(formatMuscle)
    .filter(Boolean)
    .join(', ')

  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <div
        className={`flex flex-col items-center ${styles.slideIn}`}
        style={{
          width: `calc(100% - ${s(48)}px)`,
          paddingTop: vs(40),
          paddingBottom: vs(40),
          paddingLeft: s(24),
          paddingRight: s(24),
        }}
      >
        <div
          className={`flex items-center justify-center rounded-full bg-white/40 ${styles.rock}`}
          style={{ width: s(100), height: s(100), marginBottom: vs(24) }}
        >
          <ArrowsLeftRightIcon size={s(64)} style={{ color: TEAL }} />
        </div>

        <h2
          className="text-center font-bold"
          style={{
            fontSize: ms(32),
            letterSpacing: 3,
            marginBottom: vs(8),
            color: TEAL,
          }}
        >
          SWAP SIDES
        </h2>
        <p
          className="text-center font-semibold text-black"
          style={{ fontSize: ms(20), marginBottom: vs(24) }}
        >
          {stretch.name}
        </p>

        {muscles && (
          <div
            className="flex items-center justify-center"
            style={{ marginTop: vs(6), marginBottom: vs(14) }}
          >
            <span
              className="flex items-center bg-white/60 font-semibold text-black"
              style={{
                gap: s(8),
                paddingTop: vs(8),
                paddingBottom: vs(8),
                paddingLeft: s(12),
                paddingRight: s(12),
                borderRadius: s(20),
                fontSize: ms(14),
              }}
            >
              <PersonIcon size={s(18)} style={{ color: TEAL }} />
              {muscles}
            </span>
          </div>
        )}

        <p
          className="text-center"
          style={{
            fontSize: ms(16),
            lineHeight: `${ms(24)}px`,
            marginBottom: vs(32),
            color: GREY,
          }}
        >
          Great job on the left side!
          <br />
          Now switch to your right side.
        </p>

        <div
          className="flex flex-col items-center"
          style={{ marginBottom: vs(20) }}
        >
          <span
            className="font-semibold"
            style={{ fontSize: ms(16), marginBottom: vs(6), color: GREY }}
          >
            Starting in
          </span>
          <span
            key={remaining}
            className={`font-bold ${styles.springIn}`}
            style={{ fontSize: ms(42), letterSpacing: 2, color: TEAL }}
          >
            {Math.max(remaining, 0)}
          </span>
        </div>

        <p
          className="text-center italic opacity-70"
          style={{ fontSize: ms(14), color: GREY }}
        >
          Take a moment to adjust your position
        </p>
      </div>
    </div>
  )
}
