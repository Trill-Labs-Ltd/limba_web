'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import { summarise, type PlayableStretch } from '@/app/lib/sharedRoutine'
import { canGoBack, PREVIEW_SECONDS } from './playerMachine'
import { usePlayer } from './usePlayer'
import { readMuted, writeMuted } from './cues'
import { PreviewScreen } from './PreviewScreen'
import { SwapScreen } from './SwapScreen'
import { PlayingScreen } from './PlayingScreen'
import { CompleteView } from './CompleteView'
import { AppScaleProvider, MAX_COLUMN_WIDTH } from './appScale'

// The app's typeface (Inter 400-700).
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

interface RoutinePlayerProps {
  code: string
  /** Sender's first name, for the finish screen. */
  senderName: string | null
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

/** The app's routine-player background. */
const BACKGROUND =
  'linear-gradient(180deg, #7BD3C3 0%, #C6EEE6 55%, #F0FBF8 100%)'

/**
 * Full-screen browser player for a shared routine. Plays the stretches the way
 * the app does (see playerMachine.ts) and looks like the app's player: the
 * same screens, colours, type and controls, in a phone-width column, with
 * every size scaled to the screen the way the app does (see appScale.tsx).
 */
export function RoutinePlayer({
  code,
  senderName,
  stretches,
  oneLink,
  onClose,
  onCompleted,
}: RoutinePlayerProps) {
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
  const [freshVideos, setFreshVideos] = useState<Record<string, VideoSource>>(
    {}
  )
  const refreshed = useRef(false)
  const refreshVideos = useCallback(async () => {
    if (refreshed.current) return
    refreshed.current = true
    try {
      const res = await fetch(`/api/r/${code}/videos`, {
        credentials: 'omit',
        cache: 'no-store',
      })
      if (!res.ok) return
      const data = (await res.json()) as {
        videos?: {
          id?: unknown
          videoUrl?: unknown
          videoExpiresAt?: unknown
        }[]
      }
      if (!Array.isArray(data?.videos)) return
      const next: Record<string, VideoSource> = {}
      for (const v of data.videos) {
        if (typeof v?.id !== 'string') continue
        next[v.id] = {
          url: typeof v.videoUrl === 'string' ? v.videoUrl : null,
          expiresAt:
            typeof v.videoExpiresAt === 'number' ? v.videoExpiresAt : null,
        }
      }
      setFreshVideos(next)
    } catch {
      // Keep the old URLs; the stretch shows the figure if the video can't load.
    }
  }, [code])

  const videoFor = (stretch: PlayableStretch): VideoSource =>
    freshVideos[stretch.id] ?? {
      url: stretch.videoUrl,
      expiresAt: stretch.videoExpiresAt,
    }

  useEffect(() => {
    if (state.phase !== 'preview' || !current) return
    const { url, expiresAt } = freshVideos[current.id] ?? {
      url: current.videoUrl,
      expiresAt: current.videoExpiresAt,
    }
    if (
      url &&
      expiresAt &&
      expiresAt - VIDEO_EXPIRY_MARGIN_S < Date.now() / 1000
    ) {
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

  const dialog = useRef<HTMLDivElement>(null)
  useEffect(() => dialog.current?.focus(), [])

  return (
    <div
      ref={dialog}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Routine player"
      className={`${inter.className} fixed inset-0 z-50 text-left outline-none`}
      style={{ background: BACKGROUND }}
    >
      <AppScaleProvider>
        <div
          className="relative mx-auto h-full w-full overflow-hidden"
          style={{ maxWidth: MAX_COLUMN_WIDTH, background: BACKGROUND }}
        >
          {state.phase === 'complete' && (
            <CompleteView
              summary={summarise(stretches)}
              oneLink={oneLink}
              senderName={senderName}
            />
          )}

          {current && state.phase === 'preview' && (
            <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <PreviewScreen
                key={state.index}
                stretch={current}
                stretchNumber={state.index + 1}
                totalStretches={total}
                remaining={state.remaining}
                total={PREVIEW_SECONDS}
                onReady={() => dispatch({ type: 'READY' })}
              />
            </div>
          )}

          {current && state.phase === 'swap' && (
            <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <SwapScreen stretch={current} remaining={state.remaining} />
            </div>
          )}

          {current && state.phase === 'playing' && (
            <PlayingScreen
              stretch={current}
              side={state.side}
              remaining={state.remaining}
              paused={state.paused}
              progressText={`${state.index + 1} of ${total}`}
              videoUrl={videoFor(current).url}
              muted={muted}
              canGoBack={canGoBack(state)}
              onToggleMuted={toggleMuted}
              onClose={onClose}
              onBack={() => dispatch({ type: 'BACK' })}
              onSkip={() => dispatch({ type: 'SKIP' })}
              onTogglePause={() =>
                dispatch({ type: state.paused ? 'RESUME' : 'PAUSE' })
              }
              onSwitchSides={() => dispatch({ type: 'SWITCH_SIDES' })}
              onDone={() => dispatch({ type: 'DONE' })}
              onVideoError={() => void refreshVideos()}
            />
          )}
        </div>
      </AppScaleProvider>
    </div>
  )
}
