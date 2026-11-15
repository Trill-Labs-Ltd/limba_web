import { act, fireEvent, render, screen } from '@testing-library/react'
import type { PlayableStretch } from '@/app/lib/sharedRoutine'
import { RoutinePlayer } from '../RoutinePlayer'

/**
 * The browser player end to end with fake timers: countdown, timed stretch with
 * a side swap, a reps stretch, then the "Download Limba" finish that goes
 * through OneLink and reports the completion once.
 */

const ROUTINE: PlayableStretch[] = [
  {
    id: 'neck',
    name: 'Neck Stretch',
    steps: ['Sit tall', 'Tilt your head'],
    targetMuscles: ['neck'],
    seconds: 2,
    bothSides: true,
    mode: 'timed',
    reps: null,
    videoUrl: 'https://cdn.getlimba.com/neck.mp4?sig',
    videoExpiresAt: 4_000_000_000,
  },
  {
    id: 'squat',
    name: 'Squat',
    steps: [],
    targetMuscles: [],
    seconds: 30,
    bothSides: false,
    mode: 'reps',
    reps: 10,
    videoUrl: null,
    videoExpiresAt: null,
  },
]

const ONE_LINK = 'https://limba.onelink.me/abc?deep_link_value=Xk3p9Qa'

function advance(seconds: number) {
  for (let i = 0; i < seconds; i++) {
    act(() => {
      jest.advanceTimersByTime(1000)
    })
  }
}

describe('RoutinePlayer', () => {
  beforeAll(() => {
    // jsdom has no media playback.
    Object.defineProperty(HTMLMediaElement.prototype, 'play', { configurable: true, value: jest.fn().mockResolvedValue(undefined) })
    Object.defineProperty(HTMLMediaElement.prototype, 'pause', { configurable: true, value: jest.fn() })
  })

  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('plays the routine through to "Download Limba"', () => {
    const onCompleted = jest.fn()
    const onClose = jest.fn()
    render(<RoutinePlayer code="Xk3p9Qa" stretches={ROUTINE} oneLink={ONE_LINK} onClose={onClose} onCompleted={onCompleted} />)

    // Preview with a 5 s countdown.
    expect(screen.getByText('Get ready')).toBeInTheDocument()
    expect(screen.getByText('Neck Stretch')).toBeInTheDocument()
    expect(screen.getByText('2s each side')).toBeInTheDocument()
    expect(screen.getByText('Neck')).toBeInTheDocument()
    expect(screen.getByText('1 of 2')).toBeInTheDocument()

    // Left side: video, steps, timer.
    advance(5)
    expect(screen.getByText('Left side')).toBeInTheDocument()
    expect(screen.getByText('Tilt your head')).toBeInTheDocument()
    expect(screen.getByLabelText('Neck Stretch demonstration video')).toHaveAttribute('src', ROUTINE[0].videoUrl!)
    expect(screen.getByText('0:02')).toBeInTheDocument()

    // Pause stops the clock.
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
    advance(5)
    expect(screen.getByText('0:02')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Resume' }))

    // Swap sides, then the right side.
    advance(2)
    expect(screen.getByText('Swap sides')).toBeInTheDocument()
    advance(3)
    expect(screen.getByText('Right side')).toBeInTheDocument()
    advance(2)

    // Reps stretch: no timer, Done moves on.
    expect(screen.getByText('Up next')).toBeInTheDocument()
    expect(screen.getByText('2 of 2')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    expect(screen.getByText('10 reps')).toBeInTheDocument()
    advance(60)
    expect(onCompleted).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Done' }))

    // Finish.
    expect(screen.getByText('Routine complete!')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Download Limba' })).toHaveAttribute('href', ONE_LINK)
    expect(onCompleted).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('skips, goes back, and closes on Escape', () => {
    const onClose = jest.fn()
    render(<RoutinePlayer code="Xk3p9Qa" stretches={ROUTINE} oneLink={null} onClose={onClose} onCompleted={jest.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Skip stretch' }))
    expect(screen.getByText('Up next')).toBeInTheDocument()
    expect(screen.getByText('Squat')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByText('Left side')).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('falls back to the store link when OneLink is not configured', () => {
    render(<RoutinePlayer code="Xk3p9Qa" stretches={[ROUTINE[1]]} oneLink={null} onClose={jest.fn()} onCompleted={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Done' }))
    expect(screen.getByRole('link', { name: 'Download Limba' }).getAttribute('href')).toMatch(/^https:\/\/apps\.apple\.com\//)
  })

  it('remembers the mute toggle', () => {
    render(<RoutinePlayer code="Xk3p9Qa" stretches={ROUTINE} oneLink={null} onClose={jest.fn()} onCompleted={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Mute sound' }))
    expect(screen.getByRole('button', { name: 'Turn sound on' })).toHaveAttribute('aria-pressed', 'true')
    expect(window.localStorage.getItem('limba_player_sound_muted')).toBe('1')
  })
})
