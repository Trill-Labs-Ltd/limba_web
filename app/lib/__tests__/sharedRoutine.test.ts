import {
  buildOneLinkUrl,
  formatDuration,
  formatMuscle,
  isValidShareCode,
  sharedRoutineDescription,
  sharedRoutineTitle,
  summarise,
  toPlayable,
  type ApiSharedRoutineItem,
  type PlayableStretch,
} from '../sharedRoutine'

/**
 * sharedRoutine helpers — these decide whether /shared-routine/<code> calls the backend at
 * all, how API items become playable stretches (must match the app's mapping),
 * what the preview and link-preview text say, and where the store buttons go.
 */

function item(overrides: Partial<ApiSharedRoutineItem> = {}, stretch: Record<string, unknown> = {}): ApiSharedRoutineItem {
  return {
    d: 30,
    x: null,
    video_url: 'https://cdn.getlimba.com/v.mp4?sig',
    video_expires_at: 1_900_000_000,
    ...overrides,
    stretch: {
      id: 's1',
      name: 'Neck Stretch',
      reps: null,
      target_muscles: ['neck', 'upper_back'],
      instructions: 'Sit tall || Tilt your head ||  ',
      ...stretch,
    } as ApiSharedRoutineItem['stretch'],
  }
}

function playable(overrides: Partial<PlayableStretch> = {}): PlayableStretch {
  return {
    id: 's',
    name: 'Stretch',
    steps: [],
    targetMuscles: [],
    seconds: 30,
    bothSides: false,
    mode: 'timed',
    reps: null,
    videoUrl: null,
    videoExpiresAt: null,
    ...overrides,
  }
}
describe('isValidShareCode', () => {
  it.each(['abc1234', 'ABCDEFG', '0000000', 'aZ9bY8c'])('accepts %s', (code) => {
    expect(isValidShareCode(code)).toBe(true)
  })

  it.each([
    '',
    'abc123',
    'abc12345',
    'abc-123',
    'abc 123',
    'abc123é',
    '../etc1',
  ])('rejects %p', (code) => {
    expect(isValidShareCode(code)).toBe(false)
  })

  it('rejects non-strings', () => {
    expect(isValidShareCode(undefined)).toBe(false)
    expect(isValidShareCode(null)).toBe(false)
    expect(isValidShareCode(1234567)).toBe(false)
  })
})

describe('toPlayable', () => {
  it('maps an API item like the app does', () => {
    expect(toPlayable([item({ d: 45, x: 1 })])).toEqual([
      {
        id: 's1',
        name: 'Neck Stretch',
        steps: ['Sit tall', 'Tilt your head'],
        targetMuscles: ['neck', 'upper_back'],
        seconds: 45,
        bothSides: true,
        mode: 'timed',
        reps: null,
        videoUrl: 'https://cdn.getlimba.com/v.mp4?sig',
        videoExpiresAt: 1_900_000_000,
      },
    ])
  })

  it('plays a library stretch with reps in reps mode (the app exerciseMode rule)', () => {
    const [stretch] = toPlayable([item({}, { reps: 10 })])
    expect(stretch.mode).toBe('reps')
    expect(stretch.reps).toBe(10)
  })

  it('drops items with no stretch, no id or a bad duration', () => {
    const items = [
      item({ d: 0 }),
      item({ d: Number.NaN }),
      { ...item(), stretch: null },
      item({}, { id: '' }),
      item({ d: 20 }, { id: 'keep' }),
    ]
    expect(toPlayable(items).map((s) => s.id)).toEqual(['keep'])
  })

  it('falls back for a missing name, steps, muscles and video', () => {
    const [stretch] = toPlayable([
      item({ video_url: null, video_expires_at: null }, { name: '  ', instructions: null, target_muscles: null }),
    ])
    expect(stretch).toMatchObject({ name: 'Stretch', steps: [], targetMuscles: [], videoUrl: null, videoExpiresAt: null })
  })

  it('handles a missing list', () => {
    expect(toPlayable(undefined)).toEqual([])
    expect(toPlayable(null)).toEqual([])
  })
})

describe('summarise', () => {
  it('doubles stretches done on both sides and rounds minutes up', () => {
    const summary = summarise([
      playable({ seconds: 30 }),
      playable({ seconds: 20, bothSides: true }),
      playable({ seconds: 45 }),
    ])
    expect(summary).toEqual({ stretchCount: 3, totalSeconds: 115, totalMinutes: 2 })
  })

  it('gives whole minutes when the total is exact', () => {
    expect(summarise([playable({ seconds: 60 }), playable({ seconds: 30, bothSides: true })])).toEqual({
      stretchCount: 2,
      totalSeconds: 120,
      totalMinutes: 2,
    })
  })

  it('handles an empty routine', () => {
    expect(summarise([])).toEqual({ stretchCount: 0, totalSeconds: 0, totalMinutes: 0 })
  })

  it('ignores bad durations instead of returning NaN', () => {
    const summary = summarise([playable({ seconds: Number.NaN }), playable({ seconds: -5 }), playable({ seconds: 30 })])
    expect(summary).toEqual({ stretchCount: 3, totalSeconds: 30, totalMinutes: 1 })
  })
})

describe('formatting', () => {
  it('formats muscles for display', () => {
    expect(formatMuscle('lower_back')).toBe('Lower back')
    expect(formatMuscle('hip-flexors')).toBe('Hip flexors')
    expect(formatMuscle('NECK')).toBe('Neck')
    expect(formatMuscle('  ')).toBe('')
  })

  it('formats durations', () => {
    expect(formatDuration(45)).toBe('45s')
    expect(formatDuration(60)).toBe('1 min')
    expect(formatDuration(125)).toBe('2:05')
    expect(formatDuration(-3)).toBe('0s')
  })
})

describe('buildOneLinkUrl', () => {
  const original = process.env.NEXT_PUBLIC_ONELINK_URL

  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_ONELINK_URL
    else process.env.NEXT_PUBLIC_ONELINK_URL = original
  })

  it('returns null when the env var is unset', () => {
    delete process.env.NEXT_PUBLIC_ONELINK_URL
    expect(buildOneLinkUrl('abc1234')).toBeNull()
  })

  it('adds the attribution and deep link params', () => {
    process.env.NEXT_PUBLIC_ONELINK_URL = 'https://limba.onelink.me/AbCd/share'
    const url = new URL(buildOneLinkUrl('abc1234') as string)
    expect(url.origin + url.pathname).toBe('https://limba.onelink.me/AbCd/share')
    expect(Object.fromEntries(url.searchParams)).toEqual({
      pid: 'routine_share',
      c: 'shared_routine',
      deep_link_value: 'abc1234',
      deep_link_sub1: 'share',
    })
  })

  it('appends to a base URL that already has a query string', () => {
    process.env.NEXT_PUBLIC_ONELINK_URL = 'https://limba.onelink.me/AbCd?af_xp=social'
    const url = new URL(buildOneLinkUrl('abc1234') as string)
    expect(url.searchParams.get('af_xp')).toBe('social')
    expect(url.searchParams.get('deep_link_value')).toBe('abc1234')
  })
})

describe('copy helpers', () => {
  it('uses the sender name when there is one', () => {
    expect(sharedRoutineTitle('Sam')).toBe('Sam shared a routine with you')
  })

  it('falls back when there is no name', () => {
    expect(sharedRoutineTitle(null)).toBe('A friend shared a routine with you')
    expect(sharedRoutineTitle('   ')).toBe('A friend shared a routine with you')
  })

  it('formats the description', () => {
    expect(
      sharedRoutineDescription({ stretchCount: 5, totalSeconds: 240, totalMinutes: 4 })
    ).toBe('5 stretches · 4 min. Free to try in Limba.')
    expect(
      sharedRoutineDescription({ stretchCount: 1, totalSeconds: 30, totalMinutes: 1 })
    ).toBe('1 stretch · 1 min. Free to try in Limba.')
  })
})
