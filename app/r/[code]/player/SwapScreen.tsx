'use client'

import { formatMuscle, type PlayableStretch } from '@/app/lib/sharedRoutine'
import { ArrowsLeftRightIcon, PersonIcon } from './appIcons'
import styles from './player.module.css'

/**
 * "Swap sides" screen between the two sides of a stretch, ported from
 * limba_mobile src/components/routine/SwapSidesPrompt.tsx.
 */
export function SwapScreen({ stretch, remaining }: { stretch: PlayableStretch; remaining: number }) {
  const muscles = stretch.targetMuscles.map(formatMuscle).filter(Boolean).join(', ')

  return (
    <div className="flex min-h-full w-full items-center justify-center px-6">
      <div className={`flex w-full flex-col items-center px-6 py-10 ${styles.slideIn}`}>
        <div className={`mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white/40 ${styles.rock}`}>
          <ArrowsLeftRightIcon size={64} className="text-[#008080]" />
        </div>

        <h2 className="mb-2 text-center text-[32px] font-bold tracking-[3px] text-[#008080]">SWAP SIDES</h2>
        <p className="mb-6 text-center text-xl font-semibold text-black">{stretch.name}</p>

        {muscles && (
          <div className="mb-3.5 mt-1.5 flex items-center justify-center">
            <span className="flex items-center gap-2 rounded-[20px] bg-white/60 px-3 py-2 text-sm font-semibold text-black">
              <PersonIcon size={18} className="text-[#008080]" />
              {muscles}
            </span>
          </div>
        )}

        <p className="mb-8 text-center text-base leading-6 text-[#666666]">
          Great job on the left side!
          <br />
          Now switch to your right side.
        </p>

        <div className="mb-5 flex flex-col items-center">
          <span className="mb-1.5 text-base font-semibold text-[#666666]">Starting in</span>
          <span key={remaining} className={`text-[42px] font-bold tracking-[2px] text-[#008080] ${styles.springIn}`}>
            {Math.max(remaining, 0)}
          </span>
        </div>

        <p className="text-center text-sm italic text-[#666666] opacity-70">Take a moment to adjust your position</p>
      </div>
    </div>
  )
}
