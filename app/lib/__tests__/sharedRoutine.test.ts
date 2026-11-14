import {
  buildOneLinkUrl,
  isValidShareCode,
  sharedRoutineDescription,
  sharedRoutineTitle,
  summarise,
} from '../sharedRoutine'

/**
 * sharedRoutine helpers — these decide whether /r/<code> calls the RPC at all,
 * what the preview and link-preview text say, and where the store buttons go.
 */
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

describe('summarise', () => {
  it('doubles stretches done on both sides and rounds minutes up', () => {
    const summary = summarise([
      { id: 'a', d: 30 },
      { id: 'b', d: 20, x: 1 },
      { id: 'c', d: 45 },
    ])
    expect(summary).toEqual({ stretchCount: 3, totalSeconds: 115, totalMinutes: 2 })
  })

  it('gives whole minutes when the total is exact', () => {
    expect(summarise([{ id: 'a', d: 60 }, { id: 'b', d: 30, x: 1 }])).toEqual({
      stretchCount: 2,
      totalSeconds: 120,
      totalMinutes: 2,
    })
  })

  it('handles an empty routine', () => {
    expect(summarise([])).toEqual({ stretchCount: 0, totalSeconds: 0, totalMinutes: 0 })
  })

  it('ignores bad durations instead of returning NaN', () => {
    // @ts-expect-error malformed input from the RPC
    const summary = summarise([{ id: 'a', d: 'x' }, { id: 'b', d: -5 }, { id: 'c', d: 30 }])
    expect(summary).toEqual({ stretchCount: 3, totalSeconds: 30, totalMinutes: 1 })
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
