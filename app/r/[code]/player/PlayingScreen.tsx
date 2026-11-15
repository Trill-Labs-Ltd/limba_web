'use client'

import { useEffect, useRef, useState } from 'react'
import type { PlayableStretch } from '@/app/lib/sharedRoutine'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  PersonArmsSpreadDuotoneIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  XIcon,
} from './appIcons'
import { RepCapsule, TimerCapsule } from './Capsules'
import styles from './player.module.css'

/**
 * A stretch in progress, ported from limba_mobile
 * src/components/routine/StretchPlayer.tsx: full-bleed video hero, a mint
 * bottom sheet with the title, side and numbered instructions, and the
 * Back | timer (or reps) | Skip bar fixed at the bottom.
 */

const SHEET = '#DAEFE8'
const SOFT_NAV_ICON = '#4F7F78'
const HEADER_BAR_HEIGHT = 60

interface PlayingScreenProps {
  stretch: PlayableStretch
  side: 1 | 2
  remaining: number
  paused: boolean
  progressText: string
  videoUrl: string | null
  muted: boolean
  canGoBack: boolean
  onToggleMuted: () => void
  onClose: () => void
  onBack: () => void
  onSkip: () => void
  onTogglePause: () => void
  onSwitchSides: () => void
  onDone: () => void
  onVideoError: () => void
}

export function PlayingScreen(props: PlayingScreenProps) {
  const { stretch, side, remaining, paused, progressText, videoUrl, muted, canGoBack } = props
  const isRepMode = stretch.mode === 'reps'

  // Back to the top for each stretch and side, like the app.
  const scrollRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [heroHeight, setHeroHeight] = useState(0)
  useEffect(() => {
    scrollRef.current?.scrollTo?.({ top: 0 })
    setScrollY(0)
  }, [stretch.id, side])
  useEffect(() => {
    const measure = () => setHeroHeight(heroRef.current?.getBoundingClientRect().height ?? 0)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // As the sheet slides over the video, a bar in the sheet colour fades in behind
  // the header buttons; the "scroll up" hint fades out once the user scrolls.
  const solidAt = heroHeight - HEADER_BAR_HEIGHT
  const fadeFrom = solidAt - 48
  const headerOpacity = heroHeight > 0 ? clamp((scrollY - fadeFrom) / (solidAt - fadeFrom)) : 0
  const hintOpacity = 0.7 * (1 - clamp(scrollY / 80))

  // Pause the video with the timer.
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (paused) video.pause()
    else void video.play?.()?.catch(() => {})
  }, [paused, videoUrl])

  // The side pill pops when the side changes.
  const [sidePop, setSidePop] = useState(false)
  const lastSide = useRef(side)
  useEffect(() => {
    if (lastSide.current === side) return
    lastSide.current = side
    setSidePop(true)
    const id = window.setTimeout(() => setSidePop(false), 450)
    return () => window.clearTimeout(id)
  }, [side])

  const showSwitchSides = isRepMode && stretch.bothSides && side === 1

  return (
    <div className="relative flex h-full flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[90] border-b border-[rgba(0,128,128,0.15)]"
        style={{ height: `calc(${HEADER_BAR_HEIGHT}px + env(safe-area-inset-top))`, background: SHEET, opacity: headerOpacity }}
      />

      <div
        className="pointer-events-none absolute left-4 z-[100] rounded-[14px] bg-white px-3.5 py-1.5 shadow-[0_2px_4px_rgba(0,128,128,0.12)]"
        style={{ top: 'calc(8px + env(safe-area-inset-top))' }}
      >
        <span className="text-xs font-bold tracking-[1px] text-[#008080]">{progressText}</span>
      </div>

      <div className="absolute right-4 z-[100] flex gap-3" style={{ top: 'calc(8px + env(safe-area-inset-top))' }}>
        <button
          type="button"
          onClick={props.onToggleMuted}
          aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
          aria-pressed={muted}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-black active:opacity-70"
        >
          {muted ? <SpeakerSlash /> : <SpeakerHigh />}
        </button>
        <button
          type="button"
          onClick={props.onClose}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-black active:opacity-70"
        >
          <XMark />
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div ref={heroRef} className="relative w-full shrink-0 overflow-hidden" style={{ height: 'calc(55dvh + env(safe-area-inset-top))' }}>
          {videoUrl ? (
            <video
              ref={videoRef}
              key={videoUrl}
              src={videoUrl}
              aria-label={`${stretch.name} demonstration video`}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onError={props.onVideoError}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PersonArmsSpreadDuotoneIcon size={64} className="text-[#666666]" />
            </div>
          )}
        </div>

        <div
          className="relative z-10 -mt-7 flex-1 rounded-t-[32px] px-6 pb-8 pt-[18px] shadow-[0_-6px_16px_rgba(0,128,128,0.12)]"
          style={{ background: SHEET }}
        >
          <div className="mx-auto mb-[18px] h-[5px] w-11 rounded-[3px] bg-[rgba(0,128,128,0.25)]" />

          <h2 className="mb-[22px] text-[26px] font-bold leading-tight tracking-[-0.6px] text-[#008080]">{stretch.name}</h2>

          {stretch.bothSides && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span
                className={`flex h-8 items-center gap-1.5 rounded-2xl bg-white px-3 text-[13px] font-semibold text-[#008080] shadow-[0_2px_4px_rgba(0,128,128,0.1)] ${sidePop ? styles.sidePop : ''}`}
              >
                {side === 1 ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
                {side === 1 ? 'Left side' : 'Right side'}
              </span>
            </div>
          )}

          {stretch.steps.length > 0 && (
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#008080] opacity-70">Instructions</span>
                <span className="flex items-center gap-[3px] text-[11px] font-medium text-[#008080]" style={{ opacity: hintOpacity }}>
                  (scroll up
                  <ArrowUpIcon size={12} />)
                </span>
              </div>
              <ol>
                {stretch.steps.map((step, i) => (
                  <li key={i} className="flex items-stretch">
                    <div className="mr-3.5 flex w-8 shrink-0 flex-col items-center self-stretch">
                      <span
                        className="z-[1] flex h-8 w-8 items-center justify-center rounded-full border-[3px] bg-[#008080] text-xs font-bold text-white"
                        style={{ borderColor: SHEET }}
                      >
                        {i + 1}
                      </span>
                      {i !== stretch.steps.length - 1 && <span className="-my-[3px] w-0.5 flex-1 rounded-[1px] bg-[#008080] opacity-30" />}
                    </div>
                    <p className="flex-1 pb-[22px] pt-1 text-base font-medium leading-6 text-black">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 px-3.5 pb-[calc(6px+env(safe-area-inset-bottom))] pt-2" style={{ background: SHEET }}>
        <div className="flex items-center gap-2 py-1.5">
          <SoftNavButton label="Back" disabled={!canGoBack} onClick={props.onBack}>
            <SkipBackIcon size={20} />
          </SoftNavButton>
          <div className="min-w-0 flex-1">
            {isRepMode ? (
              <RepCapsule
                amount={stretch.reps ? String(stretch.reps) : null}
                switchSides={showSwitchSides}
                onPress={showSwitchSides ? props.onSwitchSides : props.onDone}
              />
            ) : (
              <TimerCapsule remaining={remaining} total={stretch.seconds} paused={paused} onToggle={props.onTogglePause} />
            )}
          </div>
          <SoftNavButton label="Skip stretch" onClick={props.onSkip}>
            <SkipForwardIcon size={20} />
          </SoftNavButton>
        </div>
      </div>
    </div>
  )
}

function SoftNavButton({
  label,
  disabled = false,
  onClick,
  children,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/90 bg-[#E4F2EC] shadow-[0_3px_8px_rgba(11,95,89,0.1)] disabled:opacity-35"
      style={{ color: SOFT_NAV_ICON }}
    >
      {children}
    </button>
  )
}

function clamp(value: number): number {
  return Math.max(0, Math.min(1, value))
}

// The header icons at the app's sizes (18 and 20).
const SpeakerHigh = () => <SpeakerHighIcon size={18} />
const SpeakerSlash = () => <SpeakerSlashIcon size={18} />
const XMark = () => <XIcon size={20} />
