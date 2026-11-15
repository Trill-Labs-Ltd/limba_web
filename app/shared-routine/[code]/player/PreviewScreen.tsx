'use client'

import { useEffect, useState } from 'react'
import { formatMuscle, type PlayableStretch } from '@/app/lib/sharedRoutine'
import { stretchIconUrl } from '@/app/lib/stretchIcons'
import {
  ArrowsLeftRightIcon,
  ClockIcon,
  PersonArmsSpreadDuotoneIcon,
} from './appIcons'
import { useAppScale } from './appScale'
import { MuscleMap } from './MuscleMap'
import styles from './player.module.css'

/**
 * "Get ready" / "Up next" screen before every stretch, ported from limba_mobile
 * src/components/routine/NextStretchPreview.tsx (same sizes, through the app's
 * scale helpers): stretch illustration, name, duration, target muscles with the
 * body map, and the 5 s countdown ring.
 */

const TEAL = '#008080'
const TEAL_LIGHT = '#B2DFDF'

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

export function PreviewScreen({
  stretch,
  stretchNumber,
  totalStretches,
  remaining,
  total,
  onReady,
}: PreviewScreenProps) {
  const { s, vs, ms } = useAppScale()
  const iconUrl = stretchIconUrl({ id: stretch.id, name: stretch.name })
  const duration =
    stretch.mode === 'reps' && stretch.reps
      ? `${stretch.reps} reps`
      : formatPreviewDuration(stretch.seconds)
  const progress = totalStretches > 0 ? stretchNumber / totalStretches : 0

  const countdownSize = s(110)
  const ringStroke = s(5)
  const ringRadius = (countdownSize - ringStroke) / 2
  const ringCircumference = 2 * Math.PI * ringRadius
  const innerSize = countdownSize - ringStroke * 4

  // The ring drains a step each second, easing over 950 ms like the app.
  const [ring, setRing] = useState(1)
  useEffect(() => {
    const id = window.requestAnimationFrame(() =>
      setRing(Math.max(remaining - 1, 0) / total)
    )
    return () => window.cancelAnimationFrame(id)
  }, [remaining, total])

  const metaPill = {
    gap: s(5),
    paddingTop: vs(5),
    paddingBottom: vs(5),
    paddingLeft: s(10),
    paddingRight: s(10),
    borderRadius: s(20),
    fontSize: ms(12),
  }

  return (
    <div
      className="flex min-h-full w-full flex-col items-center justify-center"
      style={{ paddingLeft: s(24), paddingRight: s(24) }}
    >
      <div
        className="flex w-full items-center justify-between"
        style={{ marginBottom: vs(10) }}
      >
        <span
          className="font-bold"
          style={{ fontSize: ms(13), letterSpacing: 2, color: TEAL }}
        >
          {stretchNumber === 1 ? 'GET READY' : 'UP NEXT'}
        </span>
        <span
          className="font-bold"
          style={{
            background: TEAL_LIGHT,
            color: TEAL,
            fontSize: ms(12),
            paddingTop: vs(5),
            paddingBottom: vs(5),
            paddingLeft: s(12),
            paddingRight: s(12),
            borderRadius: s(16),
          }}
        >
          {stretchNumber} of {totalStretches}
        </span>
      </div>

      <div
        className="w-full overflow-hidden rounded-sm bg-[rgba(0,128,128,0.15)]"
        style={{ height: 4, marginBottom: vs(18) }}
        aria-hidden="true"
      >
        <div
          className="h-full rounded-sm"
          style={{ width: `${progress * 100}%`, background: TEAL }}
        />
      </div>

      <div
        className="flex shrink-0 items-center justify-center overflow-hidden border border-white/90 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
        style={{
          width: s(334),
          height: vs(260),
          borderRadius: s(24),
          marginBottom: vs(16),
        }}
      >
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt=""
            className="object-contain"
            style={{ width: s(230), height: vs(230) }}
          />
        ) : (
          <PersonArmsSpreadDuotoneIcon
            size={s(80)}
            style={{ color: TEAL_LIGHT }}
          />
        )}
      </div>

      <div
        className="flex w-full flex-col items-start"
        style={{ marginBottom: vs(20) }}
      >
        <h2
          className="text-left font-bold leading-tight"
          style={{ fontSize: s(22), marginBottom: vs(10), color: TEAL }}
        >
          {stretch.name}
        </h2>
        <div className="flex flex-wrap" style={{ gap: s(8) }}>
          <span
            className="flex items-center border border-[rgba(0,128,128,0.12)] bg-white/55 font-semibold"
            style={{ ...metaPill, color: TEAL }}
          >
            <ClockIcon size={s(15)} />
            {duration}
          </span>
          {stretch.bothSides && (
            <span
              className="flex items-center border border-[rgba(0,128,128,0.12)] bg-white/55 font-semibold"
              style={{ ...metaPill, color: TEAL }}
            >
              <ArrowsLeftRightIcon size={s(15)} />
              Both sides
            </span>
          )}
        </div>
      </div>

      {stretch.targetMuscles.length > 0 && (
        <div className="w-full" style={{ marginBottom: vs(20) }}>
          <p
            className="font-bold opacity-70"
            style={{
              fontSize: ms(10),
              letterSpacing: 2,
              marginBottom: vs(8),
              color: TEAL,
            }}
          >
            TARGET MUSCLES
          </p>
          <div className="flex items-start" style={{ gap: s(12) }}>
            <MuscleMap muscles={stretch.targetMuscles} />
            <div className="flex flex-1 flex-wrap" style={{ gap: s(8) }}>
              {stretch.targetMuscles.map((muscle) => (
                <span
                  key={muscle}
                  className="flex items-center font-semibold uppercase"
                  style={{
                    gap: s(5),
                    paddingTop: vs(6),
                    paddingBottom: vs(6),
                    paddingLeft: s(12),
                    paddingRight: s(12),
                    borderRadius: s(20),
                    fontSize: ms(13),
                    background: TEAL_LIGHT,
                    color: TEAL,
                  }}
                >
                  <span
                    className="rounded-full"
                    style={{ width: s(6), height: s(6), background: TEAL }}
                  />
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
        style={{ width: countdownSize, height: countdownSize }}
      >
        <svg
          width={countdownSize}
          height={countdownSize}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <circle
            cx={countdownSize / 2}
            cy={countdownSize / 2}
            r={ringRadius}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={ringStroke}
            fill="none"
          />
          <circle
            cx={countdownSize / 2}
            cy={countdownSize / 2}
            r={ringRadius}
            stroke="#FFFFFF"
            strokeWidth={ringStroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${ringCircumference} ${ringCircumference}`}
            strokeDashoffset={ringCircumference * (1 - ring)}
            transform={`rotate(-90 ${countdownSize / 2} ${countdownSize / 2})`}
            style={{ transition: 'stroke-dashoffset 950ms linear' }}
          />
        </svg>
        <span
          className="flex flex-col items-center justify-center rounded-full"
          style={{
            width: innerSize,
            height: innerSize,
            background: 'linear-gradient(135deg, #00B0B0 0%, #006666 100%)',
          }}
        >
          <span
            className="font-bold text-white"
            style={{ fontSize: ms(36), lineHeight: `${ms(40)}px` }}
          >
            {remaining > 0 ? remaining : 'GO'}
          </span>
          {remaining <= 0 && (
            <span
              className="font-bold text-white opacity-90"
              style={{ fontSize: ms(10), letterSpacing: 1, marginTop: 2 }}
            >
              START
            </span>
          )}
        </span>
      </button>
    </div>
  )
}
