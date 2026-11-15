'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowsLeftRightIcon, CheckIcon, PauseIcon, PlayIcon } from './appIcons'
import styles from './player.module.css'

/**
 * The player's bottom controls, ported from limba_mobile
 * src/components/routine/TimerCapsule.tsx and RepCapsule.tsx: a raised mint
 * capsule with the time (or rep count) in a soft pill and a glowing teal
 * button in a mint halo.
 */

const TEAL = '#008080'
const AMBER = '#F5A623'
const PAUSED_AMBER = '#C2711A'
const FINAL_SECONDS = 3
const STROKE = 3
const PILL_HEIGHT = 62

const CAPSULE =
  'flex items-center gap-1.5 rounded-full border border-white/90 bg-[#E4F2EC] p-[5px] shadow-[0_6px_12px_rgba(11,95,89,0.12)]'
const HALO =
  'flex h-16 items-center justify-center rounded-full border border-white/80 bg-[#C9EEE2] shadow-[0_0_12px_rgba(47,211,180,0.55)]'
const ACTION_FILL = 'linear-gradient(160deg, #1A9A92 0%, #0B5F59 100%)'
const PILL_FILL = 'linear-gradient(90deg, #DDF4EC 0%, #F9FCFB 100%)'

function formatTime(seconds: number): string {
  const s = Math.max(0, seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

interface TimerCapsuleProps {
  remaining: number
  total: number
  paused: boolean
  onToggle: () => void
}

export function TimerCapsule({ remaining, total, paused, onToggle }: TimerCapsuleProps) {
  const label = formatTime(remaining)
  const fraction = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0
  const isFinal = !paused && remaining > 0 && remaining <= FINAL_SECONDS

  // The outline is a capsule inset by half the stroke; its length drives the dash.
  const pillRef = useRef<HTMLButtonElement>(null)
  const [pillWidth, setPillWidth] = useState(0)
  useEffect(() => {
    const el = pillRef.current
    if (!el) return
    const measure = () => setPillWidth(el.getBoundingClientRect().width)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const innerWidth = Math.max(0, pillWidth - STROKE)
  const innerHeight = PILL_HEIGHT - STROKE
  const perimeter = 2 * Math.max(0, innerWidth - innerHeight) + Math.PI * innerHeight

  const beat = isFinal
    ? remaining % 2 ? styles.beatFinalA : styles.beatFinalB
    : remaining % 2 ? styles.beatA : styles.beatB

  return (
    <div className={CAPSULE}>
      <button
        ref={pillRef}
        type="button"
        onClick={onToggle}
        aria-label={`${label}, ${paused ? 'paused. Resume' : 'Pause'}`}
        className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-full active:opacity-85"
        style={{ height: PILL_HEIGHT, background: PILL_FILL }}
      >
        {/* A faint teal glow pooled in the bottom-left corner. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(55% 90% at 12% 95%, rgba(63,214,184,0.38) 0%, rgba(63,214,184,0) 100%)' }}
        />
        {pillWidth > 0 && (
          <svg width={pillWidth} height={PILL_HEIGHT} className="pointer-events-none absolute inset-0" aria-hidden="true">
            <rect
              x={STROKE / 2}
              y={STROKE / 2}
              width={innerWidth}
              height={innerHeight}
              rx={innerHeight / 2}
              stroke={TEAL}
              strokeOpacity={0.1}
              strokeWidth={STROKE}
              fill="none"
            />
            <rect
              x={STROKE / 2}
              y={STROKE / 2}
              width={innerWidth}
              height={innerHeight}
              rx={innerHeight / 2}
              stroke={isFinal ? AMBER : TEAL}
              strokeOpacity={paused ? 0.4 : 0.9}
              strokeWidth={STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${perimeter} ${perimeter}`}
              strokeDashoffset={perimeter * (1 - fraction)}
              style={{ transition: paused ? 'stroke 250ms' : 'stroke-dashoffset 950ms linear, stroke 250ms' }}
            />
          </svg>
        )}
        <span className={`relative flex flex-col items-center ${paused || remaining <= 0 ? '' : beat}`}>
          <span
            className="text-[30px] font-bold leading-[34px] tabular-nums"
            style={{ color: paused ? '#1E3B3A' : '#0F2A2A' }}
          >
            {label}
          </span>
          {paused && (
            <span className="mt-px flex items-center gap-[5px]">
              <span className="text-[10px] font-semibold tracking-[2px]" style={{ color: PAUSED_AMBER }}>
                PAUSED
              </span>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: AMBER, boxShadow: `0 0 3px ${AMBER}` }} />
            </span>
          )}
        </span>
      </button>

      <div className={`${HALO} w-16 shrink-0`}>
        <button
          type="button"
          onClick={onToggle}
          aria-label={paused ? 'Resume' : 'Pause'}
          className="flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full border border-white/20 text-white active:opacity-85"
          style={{ background: ACTION_FILL }}
        >
          {paused ? <PlayIcon size={24} className="translate-x-0.5" /> : <PauseIcon size={24} />}
        </button>
      </div>
    </div>
  )
}

interface RepCapsuleProps {
  /** Rep count shown in the pill (e.g. "10"); omit to hide the pill. */
  amount: string | null
  switchSides: boolean
  onPress: () => void
}

export function RepCapsule({ amount, switchSides, onPress }: RepCapsuleProps) {
  const actionLabel = switchSides ? 'Switch sides' : 'Done'
  const ActionIcon = switchSides ? ArrowsLeftRightIcon : CheckIcon

  return (
    <div className={CAPSULE}>
      {amount && (
        <div
          className="flex w-[78px] shrink-0 flex-col items-center justify-center rounded-full border-[1.5px] border-[rgba(0,128,128,0.18)] px-2"
          style={{ height: PILL_HEIGHT, background: PILL_FILL }}
        >
          <span className="text-[28px] font-bold leading-8 tabular-nums text-[#0F2A2A]">{amount}</span>
          <span className="-mt-px text-[9px] font-semibold tracking-[2px] text-[#008080]">REPS</span>
        </div>
      )}
      <div className={`${HALO} min-w-0 flex-1 px-[5px]`}>
        <button
          type="button"
          onClick={onPress}
          aria-label={actionLabel}
          className="flex h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 px-4 text-base font-semibold text-white active:opacity-85"
          style={{ background: ACTION_FILL }}
        >
          <ActionIcon size={18} />
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
