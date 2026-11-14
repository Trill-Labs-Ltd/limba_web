'use client'

import { useEffect, useRef } from 'react'
import type { PlayableStretch } from '@/app/lib/sharedRoutine'
import { FigureIcon } from './icons'

interface StretchStageProps {
  stretch: PlayableStretch
  side: 1 | 2
  paused: boolean
  videoUrl: string | null
  onVideoError: () => void
}

/**
 * What's on screen during a stretch: the looping muted video (or a figure when
 * there's none), the name, which side, and the numbered steps.
 */
export function StretchStage({ stretch, side, paused, videoUrl, onVideoError }: StretchStageProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (paused) {
      video.pause()
    } else {
      // Autoplay of a muted inline video is allowed; ignore a rejected promise.
      void video.play?.()?.catch?.(() => {})
    }
  }, [paused, videoUrl])

  return (
    <div className="flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-teal-50">
        {videoUrl ? (
          <video
            key={videoUrl}
            ref={videoRef}
            src={videoUrl}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={onVideoError}
            aria-label={`${stretch.name} demonstration video`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-teal-500">
            <FigureIcon />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-bold text-teal-900">{stretch.name}</h2>
        {stretch.bothSides && (
          <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800">
            {side === 1 ? 'Left side' : 'Right side'}
          </span>
        )}
        {stretch.mode === 'reps' && stretch.reps && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
            {stretch.reps} reps
          </span>
        )}
      </div>

      {stretch.steps.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Instructions</p>
          <ol className="mt-2 space-y-2">
            {stretch.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
