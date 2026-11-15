/**
 * Short beeps for the player, made with Web Audio so there are no sound files.
 * Mirrors the app's cues: a tick at 3-2-1 and "go" on countdowns, a transition
 * beep between stretches and sides, a final tick in the last 3 s of a hold,
 * and a chime at the end.
 *
 * Browsers only allow audio after a user gesture, so unlockAudio() must run in
 * the "Start routine" click. Everything is a no-op where Web Audio is missing.
 */

export type Cue = 'tick' | 'go' | 'transition' | 'final' | 'complete'

const MUTE_KEY = 'limba_player_sound_muted'

let context: AudioContext | null = null

function audioContextClass(): typeof AudioContext | null {
  if (typeof window === 'undefined') return null
  const w = window as typeof window & { webkitAudioContext?: typeof AudioContext }
  return w.AudioContext ?? w.webkitAudioContext ?? null
}

export function unlockAudio(): void {
  const Ctor = audioContextClass()
  if (!Ctor) return
  try {
    context = context ?? new Ctor()
    if (context.state === 'suspended') void context.resume()
  } catch {
    context = null
  }
}

/** One note: frequency (Hz), start offset and length (s). */
type Note = [number, number, number]

const CUES: Record<Cue, Note[]> = {
  tick: [[660, 0, 0.08]],
  go: [[990, 0, 0.18]],
  transition: [[523, 0, 0.1], [784, 0.11, 0.14]],
  final: [[880, 0, 0.06]],
  complete: [[523, 0, 0.14], [659, 0.15, 0.14], [784, 0.3, 0.28]],
}

export function playCue(cue: Cue): void {
  if (!context) return
  try {
    const now = context.currentTime
    for (const [frequency, offset, length] of CUES[cue]) {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      const start = now + offset
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + length)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(start)
      oscillator.stop(start + length + 0.02)
    }
  } catch {
    // Audio is a nicety; never break playback over it.
  }
}

export function readMuted(): boolean {
  try {
    return window.localStorage.getItem(MUTE_KEY) === '1'
  } catch {
    return false
  }
}

export function writeMuted(muted: boolean): void {
  try {
    window.localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
  } catch {
    // Private mode or blocked storage: the toggle still works for this visit.
  }
}
