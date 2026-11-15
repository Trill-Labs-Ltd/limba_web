import type { PlayableStretch } from '@/app/lib/sharedRoutine'

/**
 * Playback rules for the web player, mirroring limba_mobile's routine-player:
 *
 * - `preview`: 5 s "Get ready" / "Up next" countdown before every stretch, then
 *   it starts by itself (READY starts it early).
 * - `playing`: a timed stretch counts down `seconds` per side. A reps stretch
 *   has no timer; DONE (or SWITCH_SIDES on side 1) moves it on.
 * - `swap`: between the two sides of a both-sided timed stretch, a 3 s
 *   "Swap sides" countdown that continues by itself.
 * - `complete`: after the last stretch.
 *
 * BACK steps back one level (swap -> side 1, side 2 -> side 1, otherwise the
 * previous stretch) and goes straight to playing, like the app. SKIP moves to
 * the next stretch. PAUSE freezes every countdown.
 */

export const PREVIEW_SECONDS = 5
export const SWAP_SECONDS = 3

export type Phase = 'preview' | 'playing' | 'swap' | 'complete'

export interface PlayerState {
  phase: Phase
  index: number
  side: 1 | 2
  /** Seconds left in the current countdown (preview, swap, or a timed stretch). */
  remaining: number
  paused: boolean
}

export type PlayerEvent =
  | { type: 'TICK' }
  | { type: 'READY' }
  | { type: 'SWITCH_SIDES' }
  | { type: 'DONE' }
  | { type: 'BACK' }
  | { type: 'SKIP' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESTART' }

export interface PlayerContext {
  stretches: PlayableStretch[]
}

export function initPlayer(stretches: PlayableStretch[]): PlayerState {
  if (stretches.length === 0) {
    return { phase: 'complete', index: 0, side: 1, remaining: 0, paused: false }
  }
  return preview(0)
}

function preview(index: number): PlayerState {
  return { phase: 'preview', index, side: 1, remaining: PREVIEW_SECONDS, paused: false }
}

function playing(stretch: PlayableStretch, index: number, side: 1 | 2): PlayerState {
  return {
    phase: 'playing',
    index,
    side,
    remaining: stretch.mode === 'timed' ? stretch.seconds : 0,
    paused: false,
  }
}

function next(ctx: PlayerContext, state: PlayerState): PlayerState {
  const nextIndex = state.index + 1
  if (nextIndex >= ctx.stretches.length) {
    return { phase: 'complete', index: state.index, side: 1, remaining: 0, paused: false }
  }
  return preview(nextIndex)
}

/** End of side 1 of a both-sided stretch, or the end of the stretch. */
function finishSide(ctx: PlayerContext, state: PlayerState, stretch: PlayableStretch): PlayerState {
  if (stretch.bothSides && state.side === 1) {
    return stretch.mode === 'timed'
      ? { ...state, phase: 'swap', remaining: SWAP_SECONDS, paused: false }
      : playing(stretch, state.index, 2)
  }
  return next(ctx, state)
}

export function playerReducer(ctx: PlayerContext, state: PlayerState, event: PlayerEvent): PlayerState {
  if (event.type === 'RESTART') return initPlayer(ctx.stretches)
  if (state.phase === 'complete') return state

  const stretch = ctx.stretches[state.index]
  if (!stretch) return state

  switch (event.type) {
    case 'PAUSE':
      return state.paused ? state : { ...state, paused: true }

    case 'RESUME':
      return state.paused ? { ...state, paused: false } : state

    case 'TICK': {
      if (state.paused) return state
      if (state.phase === 'playing' && stretch.mode === 'reps') return state
      const remaining = state.remaining - 1
      if (remaining > 0) return { ...state, remaining }
      if (state.phase === 'preview') return playing(stretch, state.index, 1)
      if (state.phase === 'swap') return playing(stretch, state.index, 2)
      return finishSide(ctx, state, stretch)
    }

    case 'READY':
      if (state.phase === 'preview') return playing(stretch, state.index, 1)
      if (state.phase === 'swap') return playing(stretch, state.index, 2)
      return state

    case 'SWITCH_SIDES':
      if (state.phase === 'playing' && stretch.mode === 'reps' && stretch.bothSides && state.side === 1) {
        return playing(stretch, state.index, 2)
      }
      return state

    case 'DONE':
      if (state.phase === 'playing' && stretch.mode === 'reps') return finishSide(ctx, state, stretch)
      return state

    case 'SKIP':
      return next(ctx, state)

    case 'BACK': {
      if (state.phase === 'swap') return playing(stretch, state.index, 1)
      if (state.phase === 'playing' && state.side === 2) return playing(stretch, state.index, 1)
      if (state.index > 0) {
        const previous = ctx.stretches[state.index - 1]
        return playing(previous, state.index - 1, 1)
      }
      // First stretch: restart it (from the preview, there is nothing to go back to).
      return state.phase === 'playing' ? playing(stretch, 0, 1) : state
    }

    default:
      return state
  }
}

/** Whether BACK would do anything, so the button can be dimmed like the app's. */
export function canGoBack(state: PlayerState): boolean {
  // Same as the app's routine-player: nothing to go back to on the first side
  // of the first stretch.
  if (state.phase === 'complete') return false
  if (state.phase === 'swap') return true
  if (state.phase === 'playing' && state.side === 2) return true
  return state.index > 0
}
