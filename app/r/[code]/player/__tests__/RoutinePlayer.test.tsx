import { act, fireEvent, render, screen } from '@testing-library/react'
import type { PlayableStretch } from '@/app/lib/sharedRoutine'
import { RoutinePlayer } from '../RoutinePlayer'

/**
 * The browser player end to end with fake timers, using the app's screens:
 * "GET READY" preview, a timed stretch with the swap-sides screen, a reps
 * stretch, then the "Download Limba" finish that goes through OneLink and
 * reports the completion once.
 */

const ROUTINE: PlayableStretch[] = [
  {
    // Hamstring Scoops: its library id has an illustration in the app.
    id: 'cd0ecfae-50a5-4eee-9990-873106a21047',
    name: 'Hamstring Scoops',
    steps: ['Sit tall', 'Tilt your head'],
    targetMuscles: ['hamstrings'],
    seconds: 2,
    bothSides: true,
    mode: 'timed',
    reps: null,
    videoUrl: 'https://cdn.getlimba.com/scoops.mp4?sig',
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
  afterEach(() => {
    jest.useRealTimers()
    window.localStorage.clear()
  })

  it('plays the routine through to "Download Limba"', () => {
    const onCompleted = jest.fn()
    render(<RoutinePlayer code="Xk3p9Qa" stretches={ROUTINE} oneLink={ONE_LINK} onClose={jest.fn()} onCompleted={onCompleted} />)

    // Preview: illustration, duration, both sides, target muscles, 5 s countdown.
    expect(screen.getByText('GET READY')).toBeInTheDocument()
    expect(screen.getByText('1 of 2')).toBeInTheDocument()
    expect(screen.getByText('Hamstring Scoops')).toBeInTheDocument()
    expect(screen.getByText('2s')).toBeInTheDocument()
    expect(screen.getByText('Both sides')).toBeInTheDocument()
    expect(screen.getByText('TARGET MUSCLES')).toBeInTheDocument()
    expect(screen.getByText('Hamstrings')).toBeInTheDocument()
    expect(document.querySelector('img[src="/stretch-icons/hamstring_scoops.webp"]')).not.toBeNull()
    expect(document.querySelector('img[src="/muscle-map/female/back/hamstrings.png"]')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Start now' })).toHaveTextContent('5')

    // Left side: video, side pill, numbered instructions, timer.
    advance(5)
    expect(screen.getByText('Left side')).toBeInTheDocument()
    expect(screen.getByText('Tilt your head')).toBeInTheDocument()
    expect(screen.getByLabelText('Hamstring Scoops demonstration video')).toHaveAttribute('src', ROUTINE[0].videoUrl!)
    expect(screen.getByText('0:02')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled()

    // Pause stops the clock and shows PAUSED.
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
    expect(screen.getByText('PAUSED')).toBeInTheDocument()
    advance(5)
    expect(screen.getByText('0:02')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Resume' }))

    // Swap sides screen, then the right side.
    advance(2)
    expect(screen.getByText('SWAP SIDES')).toBeInTheDocument()
    expect(screen.getByText('Starting in')).toBeInTheDocument()
    advance(3)
    expect(screen.getByText('Right side')).toBeInTheDocument()
    advance(2)

    // Reps stretch: no timer, the rep count, Done moves on.
    expect(screen.getByText('UP NEXT')).toBeInTheDocument()
    expect(screen.getByText('2 of 2')).toBeInTheDocument()
    expect(screen.getByText('10 reps')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('REPS')).toBeInTheDocument()
    advance(60)
    expect(onCompleted).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Done' }))

    // Finish.
    expect(screen.getByText('COMPLETED')).toBeInTheDocument()
    expect(screen.getByText('Routine Complete!')).toBeInTheDocument()
    expect(screen.getByText('34s')).toBeInTheDocument() // 2s x 2 sides + 30s
    expect(screen.getByRole('link', { name: 'Download Limba' })).toHaveAttribute('href', ONE_LINK)
    expect(onCompleted).toHaveBeenCalledTimes(1)
  })

  it('skips, goes back, and closes from the X and on Escape', () => {
    const onClose = jest.fn()
    render(<RoutinePlayer code="Xk3p9Qa" stretches={ROUTINE} oneLink={null} onClose={onClose} onCompleted={jest.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Skip stretch' }))
    expect(screen.getByText('UP NEXT')).toBeInTheDocument()
    expect(screen.getByText('Squat')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByText('Left side')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('shows Switch sides on the first side of a both-sided reps stretch', () => {
    const reps: PlayableStretch = { ...ROUTINE[1], bothSides: true }
    render(<RoutinePlayer code="Xk3p9Qa" stretches={[reps]} oneLink={null} onClose={jest.fn()} onCompleted={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Switch sides' }))
    expect(screen.getByText('Right side')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument()
  })

  it('falls back to the store link when OneLink is not configured', () => {
    render(<RoutinePlayer code="Xk3p9Qa" stretches={[ROUTINE[1]]} oneLink={null} onClose={jest.fn()} onCompleted={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Done' }))
    expect(screen.getByRole('link', { name: 'Download Limba' }).getAttribute('href')).toMatch(/^https:\/\/apps\.apple\.com\//)
  })

  it('remembers the mute toggle', () => {
    render(<RoutinePlayer code="Xk3p9Qa" stretches={ROUTINE} oneLink={null} onClose={jest.fn()} onCompleted={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Start now' }))
    fireEvent.click(screen.getByRole('button', { name: 'Mute sounds' }))
    expect(screen.getByRole('button', { name: 'Unmute sounds' })).toHaveAttribute('aria-pressed', 'true')
    expect(window.localStorage.getItem('limba_player_sound_muted')).toBe('1')
  })
})
