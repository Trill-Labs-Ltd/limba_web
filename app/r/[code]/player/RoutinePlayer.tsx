'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { summarise, type PlayableStretch } from '@/app/lib/sharedRoutine'
import { canGoBack, PREVIEW_SECONDS, SWAP_SECONDS } from './playerMachine'
import { usePlayer } from './usePlayer'
import { readMuted, writeMuted } from './cues'
import { Countdown } from './Countdown'
import { StretchStage } from './StretchStage'
import { PlayerControls } from './PlayerControls'
import { CompleteView } from './CompleteView'
import { CloseIcon, SoundIcon } from './icons'

interface RoutinePlayerProps {
  code: string
  stretches: PlayableStretch[]
  oneLink: string | null
  onClose: () => void
  onCompleted: () => void
}

interface VideoSource {
  url: string | null
  expiresAt: number | null
}

/** Refresh a signed video this many seconds before it expires (the app uses 120 s too). */
const VIDEO_EXPIRY_MARGIN_S = 120

/**
 * Full-screen browser player for a shared routine. Plays the stretches the way
 * the app does (see playerMachine.ts) and ends on "Subscribe to Limba".
 */
export function RoutinePlayer({ code, stretches, oneLink, onClose, onCompleted }: RoutinePlayerProps) {
  const [muted, setMuted] = useState(false)
  useEffect(() => setMuted(readMuted()), [])
  const toggleMuted = () => {
    setMuted((m) => {
      writeMuted(!m)
      return !m
    })
  }

  const { state, current, dispatch } = usePlayer(stretches, muted)
  const total = stretches.length

  // Signed video URLs last about an hour. If a tab sits open past that, fetch
  // fresh ones once (each fetch counts a view on the backend, so only once).
  const [freshVideos, setFreshVideos] = useState<Record<string, VideoSource>>({})
  const refreshed = useRef(false)
  const refreshVideos = useCallback(async () => {
    if (refreshed.current) return
    refreshed.current = true
    try {
      const res = await fetch(`/api/r/${code}/videos`, { credentials: 'omit', cache: 'no-store' })
      if (!res.ok) return
      const data = (await res.json()) as { videos?: { id?: unknown; videoUrl?: unknown; videoExpiresAt?: unknown }[] }
      if (!Array.isArray(data?.videos)) return
      const next: Record<string, VideoSource> = {}
      for (const v of data.videos) {
        if (typeof v?.id !== 'string') continue
        next[v.id] = {
          url: typeof v.videoUrl === 'string' ? v.videoUrl : null,
          expiresAt: typeof v.videoExpiresAt === 'number' ? v.videoExpiresAt : null,
        }
      }
      setFreshVideos(next)
    } catch {
      // Keep the old URLs; the stretch shows the figure if the video can't load.
    }
  }, [code])

  const videoFor = (stretch: PlayableStretch): VideoSource =>
    freshVideos[stretch.id] ?? { url: stretch.videoUrl, expiresAt: stretch.videoExpiresAt }

  useEffect(() => {
    if (state.phase !== 'preview' || !current) return
    const { url, expiresAt } = freshVideos[current.id] ?? {
      url: current.videoUrl,
      expiresAt: current.videoExpiresAt,
    }
    if (url && expiresAt && expiresAt - VIDEO_EXPIRY_MARGIN_S < Date.now() / 1000) {
      void refreshVideos()
    }
  }, [state.phase, current, freshVideos, refreshVideos])

  const completedSent = useRef(false)
  useEffect(() => {
    if (state.phase === 'complete' && !completedSent.current) {
      completedSent.current = true
      onCompleted()
    }
  }, [state.phase, onCompleted])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => closeButton.current?.focus(), [])

  const progress =
    state.phase === 'complete'
      ? 1
      : (state.index + (state.phase === 'preview' ? 0 : state.phase === 'swap' ? 0.5 : state.side === 2 ? 0.5 : 0.25)) /
        total

  return (
    <div role="dialog" aria-modal="true" aria-label="Routine player" className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="mx-auto flex min-h-full max-w-md flex-col px-4 pb-4 pt-4">
        <header className="flex items-center gap-3">
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-teal-900 hover:bg-teal-50"
            aria-label="Close player"
          >
            <CloseIcon />
          </button>
          <div className="flex-1">
            {state.phase !== 'complete' && (
              <p className="mb-1 text-center text-xs font-semibold text-gray-500">
                {state.index + 1} of {total}
              </p>
            )}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-teal-100" aria-hidden="true">
              <div className="h-full rounded-full bg-teal-500 transition-[width] duration-500" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
          <button
            type="button"
            onClick={toggleMuted}
            className="flex h-10 w-10 items-center justify-center rounded-full text-teal-900 hover:bg-teal-50"
            aria-label={muted ? 'Turn sound on' : 'Mute sound'}
            aria-pressed={muted}
          >
            <SoundIcon muted={muted} />
          </button>
        </header>

        <div className="mt-4 flex-1">
          {state.phase === 'complete' && (
            <CompleteView summary={summarise(stretches)} oneLink={oneLink} onClose={onClose} />
          )}

          {current && (state.phase === 'preview' || state.phase === 'swap') && (
            <Countdown
              kind={state.phase}
              stretch={current}
              isFirst={state.index === 0}
              remaining={state.remaining}
              total={state.phase === 'swap' ? SWAP_SECONDS : PREVIEW_SECONDS}
              paused={state.paused}
              onReady={() => dispatch({ type: 'READY' })}
            />
          )}

          {current && state.phase === 'playing' && (
            <StretchStage
              stretch={current}
              side={state.side}
              paused={state.paused}
              videoUrl={videoFor(current).url}
              onVideoError={() => void refreshVideos()}
            />
          )}
        </div>

        {current && state.phase === 'playing' && (
          <div className="sticky bottom-0 mt-4 bg-white/95 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-3 backdrop-blur">
            <PlayerControls
              stretch={current}
              side={state.side}
              remaining={state.remaining}
              paused={state.paused}
              canGoBack={canGoBack(state)}
              onBack={() => dispatch({ type: 'BACK' })}
              onSkip={() => dispatch({ type: 'SKIP' })}
              onTogglePause={() => dispatch({ type: state.paused ? 'RESUME' : 'PAUSE' })}
              onSwitchSides={() => dispatch({ type: 'SWITCH_SIDES' })}
              onDone={() => dispatch({ type: 'DONE' })}
            />
          </div>
        )}
      </div>
    </div>
  )
}
