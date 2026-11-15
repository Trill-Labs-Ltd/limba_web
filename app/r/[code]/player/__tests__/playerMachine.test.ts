import type { PlayableStretch } from '@/app/lib/sharedRoutine'
import {
  canGoBack,
  initPlayer,
  playerReducer,
  PREVIEW_SECONDS,
  SWAP_SECONDS,
  type PlayerEvent,
  type PlayerState,
} from '../playerMachine'

/**
 * The web player's timing rules. They mirror limba_mobile's routine-player:
 * a 5 s preview before every stretch, `seconds` per side, a 3 s swap between
 * sides, reps stretches moved on by hand, Back one level, Skip to the next.
 */

function stretch(overrides: Partial<PlayableStretch> = {}): PlayableStretch {
  return {
    id: overrides.id ?? 's',
    name: 'Stretch',
    steps: [],
    targetMuscles: [],
    seconds: 3,
    bothSides: false,
    mode: 'timed',
    reps: null,
    videoUrl: null,
    videoExpiresAt: null,
    ...overrides,
  }
}

function run(stretches: PlayableStretch[], events: PlayerEvent[], from?: PlayerState): PlayerState {
  return events.reduce((state, event) => playerReducer({ stretches }, state, event), from ?? initPlayer(stretches))
}

const ticks = (n: number): PlayerEvent[] => Array.from({ length: n }, () => ({ type: 'TICK' }) as const)

describe('playerMachine', () => {
  it('starts on a 5 s preview of the first stretch', () => {
    expect(initPlayer([stretch()])).toEqual({ phase: 'preview', index: 0, side: 1, remaining: PREVIEW_SECONDS, paused: false })
  })

  it('an empty routine is already complete', () => {
    expect(initPlayer([]).phase).toBe('complete')
  })

  it('runs preview -> one-sided stretch -> next preview -> complete', () => {
    const routine = [stretch({ id: 'a', seconds: 3 }), stretch({ id: 'b', seconds: 2 })]

    let state = run(routine, ticks(PREVIEW_SECONDS))
    expect(state).toMatchObject({ phase: 'playing', index: 0, side: 1, remaining: 3 })

    state = run(routine, ticks(3), state)
    expect(state).toMatchObject({ phase: 'preview', index: 1, remaining: PREVIEW_SECONDS })

    state = run(routine, [...ticks(PREVIEW_SECONDS), ...ticks(2)], state)
    expect(state.phase).toBe('complete')
  })

  it('runs both sides of a timed stretch with a 3 s swap in between', () => {
    const routine = [stretch({ seconds: 4, bothSides: true })]

    let state = run(routine, [{ type: 'READY' }, ...ticks(4)])
    expect(state).toMatchObject({ phase: 'swap', side: 1, remaining: SWAP_SECONDS })

    state = run(routine, ticks(SWAP_SECONDS), state)
    expect(state).toMatchObject({ phase: 'playing', side: 2, remaining: 4 })

    state = run(routine, ticks(4), state)
    expect(state.phase).toBe('complete')
  })

  it('READY skips the preview and the swap countdowns', () => {
    const routine = [stretch({ seconds: 4, bothSides: true })]
    let state = run(routine, [{ type: 'READY' }])
    expect(state).toMatchObject({ phase: 'playing', side: 1, remaining: 4 })

    state = run(routine, [...ticks(4), { type: 'READY' }], state)
    expect(state).toMatchObject({ phase: 'playing', side: 2 })
  })

  describe('reps stretches', () => {
    const reps = stretch({ mode: 'reps', reps: 10, bothSides: true })

    it('ignore ticks while playing', () => {
      const state = run([reps], [{ type: 'READY' }, ...ticks(20)])
      expect(state).toMatchObject({ phase: 'playing', side: 1, remaining: 0 })
    })

    it('Switch sides goes straight to side 2, then Done finishes', () => {
      let state = run([reps], [{ type: 'READY' }, { type: 'SWITCH_SIDES' }])
      expect(state).toMatchObject({ phase: 'playing', side: 2 })

      state = run([reps], [{ type: 'SWITCH_SIDES' }], state)
      expect(state.side).toBe(2) // no-op on side 2

      state = run([reps], [{ type: 'DONE' }], state)
      expect(state.phase).toBe('complete')
    })

    it('Done on side 1 of a both-sided reps stretch moves to side 2', () => {
      const state = run([reps], [{ type: 'READY' }, { type: 'DONE' }])
      expect(state).toMatchObject({ phase: 'playing', side: 2 })
    })

    it('Done on a one-sided reps stretch moves to the next stretch', () => {
      const routine = [stretch({ mode: 'reps', reps: 8 }), stretch({ id: 'b' })]
      const state = run(routine, [{ type: 'READY' }, { type: 'DONE' }])
      expect(state).toMatchObject({ phase: 'preview', index: 1 })
    })
  })

  it('DONE and SWITCH_SIDES do nothing on a timed stretch', () => {
    const routine = [stretch({ seconds: 5, bothSides: true })]
    const playing = run(routine, [{ type: 'READY' }, { type: 'TICK' }])
    expect(run(routine, [{ type: 'DONE' }, { type: 'SWITCH_SIDES' }], playing)).toEqual(playing)
  })

  describe('pause', () => {
    it('freezes every countdown until resumed', () => {
      const routine = [stretch({ seconds: 5 })]
      let state = run(routine, [{ type: 'PAUSE' }, ...ticks(10)])
      expect(state).toMatchObject({ phase: 'preview', remaining: PREVIEW_SECONDS, paused: true })

      state = run(routine, [{ type: 'RESUME' }, { type: 'TICK' }], state)
      expect(state).toMatchObject({ paused: false, remaining: PREVIEW_SECONDS - 1 })
    })

    it('is cleared when moving to another stretch', () => {
      const routine = [stretch(), stretch({ id: 'b' })]
      const state = run(routine, [{ type: 'READY' }, { type: 'PAUSE' }, { type: 'SKIP' }])
      expect(state).toMatchObject({ phase: 'preview', index: 1, paused: false })
    })
  })

  describe('back', () => {
    const routine = [stretch({ id: 'a', seconds: 5 }), stretch({ id: 'b', seconds: 6, bothSides: true })]

    it('from the swap returns to side 1 with a full timer', () => {
      const swap = run(routine, [{ type: 'SKIP' }, { type: 'READY' }, ...ticks(6)])
      expect(swap.phase).toBe('swap')
      expect(run(routine, [{ type: 'BACK' }], swap)).toMatchObject({ phase: 'playing', index: 1, side: 1, remaining: 6 })
    })

    it('from side 2 returns to side 1', () => {
      const side2 = run(routine, [{ type: 'SKIP' }, { type: 'READY' }, ...ticks(6), { type: 'READY' }, { type: 'TICK' }])
      expect(side2).toMatchObject({ phase: 'playing', side: 2 })
      expect(run(routine, [{ type: 'BACK' }], side2)).toMatchObject({ phase: 'playing', side: 1, remaining: 6 })
    })

    it('from side 1 or a preview goes to the previous stretch, straight to playing', () => {
      const previewB = run(routine, [{ type: 'SKIP' }])
      expect(run(routine, [{ type: 'BACK' }], previewB)).toMatchObject({ phase: 'playing', index: 0, side: 1, remaining: 5 })

      const playingB = run(routine, [{ type: 'READY' }], previewB)
      expect(run(routine, [{ type: 'BACK' }], playingB)).toMatchObject({ phase: 'playing', index: 0 })
    })

    it('on the first stretch restarts it, and does nothing from the first preview', () => {
      const first = initPlayer(routine)
      expect(canGoBack(first)).toBe(false)
      expect(run(routine, [{ type: 'BACK' }], first)).toEqual(first)

      const playing = run(routine, [{ type: 'READY' }, ...ticks(3)])
      expect(canGoBack(playing)).toBe(true)
      expect(run(routine, [{ type: 'BACK' }], playing)).toMatchObject({ phase: 'playing', index: 0, remaining: 5 })
    })
  })

  it('SKIP on the last stretch completes, and a completed player ignores events', () => {
    const routine = [stretch()]
    const done = run(routine, [{ type: 'SKIP' }])
    expect(done.phase).toBe('complete')
    expect(canGoBack(done)).toBe(false)
    expect(run(routine, [{ type: 'BACK' }, { type: 'TICK' }, { type: 'READY' }], done)).toEqual(done)
  })

  it('RESTART goes back to the first preview', () => {
    const routine = [stretch(), stretch({ id: 'b' })]
    const state = run(routine, [{ type: 'SKIP' }, { type: 'SKIP' }, { type: 'RESTART' }])
    expect(state).toEqual(initPlayer(routine))
  })
})
