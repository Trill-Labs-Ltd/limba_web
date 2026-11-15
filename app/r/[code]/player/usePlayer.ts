'use client'

import { useCallback, useEffect, useReducer, useRef } from 'react'
import type { PlayableStretch } from '@/app/lib/sharedRoutine'
import { initPlayer, playerReducer, type PlayerEvent, type PlayerState } from './playerMachine'
import { playCue, type Cue } from './cues'

/**
 * Runs the player machine: a 1 s tick while a countdown is running, a pause
 * when the tab is hidden (like the app pausing in the background), and the
 * sound cues on state changes.
 */
export function usePlayer(stretches: PlayableStretch[], muted: boolean) {
  const reducer = useCallback(
    (state: PlayerState, event: PlayerEvent) => playerReducer({ stretches }, state, event),
    [stretches]
  )
  const [state, dispatch] = useReducer(reducer, stretches, initPlayer)
  const current = stretches[state.index]

  const ticking =
    state.phase !== 'complete' &&
    !state.paused &&
    !(state.phase === 'playing' && current?.mode === 'reps')

  useEffect(() => {
    if (!ticking) return
    const id = window.setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => window.clearInterval(id)
  }, [ticking, state.phase, state.index, state.side])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) dispatch({ type: 'PAUSE' })
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const previous = useRef<PlayerState>(state)
  useEffect(() => {
    const before = previous.current
    previous.current = state
    if (muted || before === state) return

    const cue = cueFor(before, state, current)
    if (cue) playCue(cue)
  }, [state, muted, current])

  return { state, current, dispatch }
}

function cueFor(before: PlayerState, after: PlayerState, stretch: PlayableStretch | undefined): Cue | null {
  if (after.phase === 'complete') return before.phase === 'complete' ? null : 'complete'

  const movedOn =
    after.phase !== before.phase || after.index !== before.index || after.side !== before.side
  if (movedOn) {
    if (after.phase === 'playing' && (before.phase === 'preview' || before.phase === 'swap')) return 'go'
    if (after.phase === 'swap' || after.phase === 'preview' || after.phase === 'playing') return 'transition'
    return null
  }

  if (after.remaining >= before.remaining || after.paused) return null
  const countingDown = after.phase === 'preview' || after.phase === 'swap'
  if (countingDown && after.remaining <= 3) return 'tick'
  if (after.phase === 'playing' && stretch?.mode === 'timed' && after.remaining <= 3) return 'final'
  return null
}
