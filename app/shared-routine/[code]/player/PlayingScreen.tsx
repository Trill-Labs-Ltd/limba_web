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
import { useAppScale } from './appScale'
import { RepCapsule, TimerCapsule } from './Capsules'
import styles from './player.module.css'

/**
 * A stretch in progress, ported from limba_mobile
 * src/components/routine/StretchPlayer.tsx (same sizes, through the app's
 * scale helpers): full-bleed video hero, a mint bottom sheet with the title,
 * side and numbered instructions, and the Back | timer (or reps) | Skip bar
 * fixed at the bottom.
 */

const TEAL = '#008080'
const SHEET = '#DAEFE8'
const SOFT_NAV_ICON = '#4F7F78'
const SAFE_TOP = 'env(safe-area-inset-top)'

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
  const {
    stretch,
    side,
    remaining,
    paused,
    progressText,
    videoUrl,
    muted,
    canGoBack,
  } = props
  const { s, vs, ms, height } = useAppScale()
  const isRepMode = stretch.mode === 'reps'

  // The hero is 55% of the screen height plus the top safe area, like the app.
  const heroHeight = Math.round(height * 0.55)
  const headerBarHeight = vs(60)

  // Back to the top for each stretch and side, like the app.
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    scrollRef.current?.scrollTo?.({ top: 0 })
    setScrollY(0)
  }, [stretch.id, side])

  // As the sheet slides over the video, a bar in the sheet colour fades in behind
  // the header buttons; the "scroll up" hint fades out once the user scrolls.
  const solidAt = heroHeight - headerBarHeight
  const fadeFrom = solidAt - vs(48)
  const headerOpacity = clamp((scrollY - fadeFrom) / (solidAt - fadeFrom))
  const hintOpacity = 0.7 * (1 - clamp(scrollY / vs(80)))

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
  const headerTop = `calc(${vs(8)}px + ${SAFE_TOP})`
  const roundButton = { width: s(32), height: s(32) }

  return (
    <div className="relative flex h-full flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[90] border-b border-[rgba(0,128,128,0.15)]"
        style={{
          height: `calc(${headerBarHeight}px + ${SAFE_TOP})`,
          background: SHEET,
          opacity: headerOpacity,
        }}
      />

      <div
        className="pointer-events-none absolute z-[100] bg-white shadow-[0_2px_4px_rgba(0,128,128,0.12)]"
        style={{
          top: headerTop,
          left: s(16),
          paddingTop: vs(6),
          paddingBottom: vs(6),
          paddingLeft: s(14),
          paddingRight: s(14),
          borderRadius: s(14),
        }}
      >
        <span
          className="font-bold"
          style={{ fontSize: ms(12), letterSpacing: 1, color: TEAL }}
        >
          {progressText}
        </span>
      </div>

      <div
        className="absolute z-[100] flex"
        style={{ top: headerTop, right: s(16), gap: s(12) }}
      >
        <button
          type="button"
          onClick={props.onToggleMuted}
          aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
          aria-pressed={muted}
          className="flex items-center justify-center rounded-full bg-black/30 text-black active:opacity-70"
          style={roundButton}
        >
          {muted ? (
            <SpeakerSlashIcon size={s(18)} />
          ) : (
            <SpeakerHighIcon size={s(18)} />
          )}
        </button>
        <button
          type="button"
          onClick={props.onClose}
          aria-label="Close"
          className="flex items-center justify-center rounded-full bg-black/30 text-black active:opacity-70"
          style={roundButton}
        >
          <XIcon size={s(20)} />
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{ height: `calc(${heroHeight}px + ${SAFE_TOP})` }}
        >
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
              <PersonArmsSpreadDuotoneIcon
                size={s(64)}
                className="text-[#666666]"
              />
            </div>
          )}
        </div>

        <div
          className="relative z-10 flex-1 shadow-[0_-6px_16px_rgba(0,128,128,0.12)]"
          style={{
            background: SHEET,
            borderTopLeftRadius: s(32),
            borderTopRightRadius: s(32),
            paddingTop: vs(18),
            paddingLeft: s(24),
            paddingRight: s(24),
            paddingBottom: vs(32),
            marginTop: vs(-28),
          }}
        >
          <div
            className="mx-auto bg-[rgba(0,128,128,0.25)]"
            style={{
              width: s(44),
              height: vs(5),
              borderRadius: 3,
              marginBottom: vs(18),
            }}
          />

          <h2
            className="font-bold leading-tight"
            style={{
              fontSize: ms(26),
              letterSpacing: -0.6,
              marginBottom: vs(8) + vs(14),
              color: TEAL,
            }}
          >
            {stretch.name}
          </h2>

          {stretch.bothSides && (
            <div
              className="flex flex-wrap items-center"
              style={{ gap: s(8), marginBottom: vs(24) }}
            >
              <span
                className={`flex items-center bg-white font-semibold shadow-[0_2px_4px_rgba(0,128,128,0.1)] ${sidePop ? styles.sidePop : ''}`}
                style={{
                  gap: s(6),
                  height: s(32),
                  paddingLeft: s(12),
                  paddingRight: s(12),
                  borderRadius: s(16),
                  fontSize: ms(13),
                  color: TEAL,
                }}
              >
                {side === 1 ? (
                  <ArrowLeftIcon size={s(14)} />
                ) : (
                  <ArrowRightIcon size={s(14)} />
                )}
                {side === 1 ? 'Left side' : 'Right side'}
              </span>
            </div>
          )}

          {stretch.steps.length > 0 && (
            <div>
              <div
                className="flex flex-wrap items-center"
                style={{ gap: s(6), marginBottom: vs(20) }}
              >
                <span
                  className="font-bold uppercase opacity-70"
                  style={{ fontSize: ms(11), letterSpacing: 2, color: TEAL }}
                >
                  Instructions
                </span>
                <span
                  className="flex items-center font-medium"
                  style={{
                    gap: s(3),
                    fontSize: ms(11),
                    color: TEAL,
                    opacity: hintOpacity,
                  }}
                >
                  (scroll up
                  <ArrowUpIcon size={s(12)} />)
                </span>
              </div>
              <ol>
                {stretch.steps.map((step, i) => (
                  <li key={i} className="flex items-stretch">
                    <div
                      className="flex shrink-0 flex-col items-center self-stretch"
                      style={{ width: s(32), marginRight: s(14) }}
                    >
                      <span
                        className="z-[1] flex items-center justify-center rounded-full font-bold text-white"
                        style={{
                          width: s(32),
                          height: s(32),
                          borderWidth: s(3),
                          borderStyle: 'solid',
                          borderColor: SHEET,
                          background: TEAL,
                          fontSize: ms(12),
                        }}
                      >
                        {i + 1}
                      </span>
                      {i !== stretch.steps.length - 1 && (
                        <span
                          className="flex-1 opacity-30"
                          style={{
                            width: s(2),
                            marginTop: -s(3),
                            marginBottom: -s(3),
                            borderRadius: s(1),
                            background: TEAL,
                          }}
                        />
                      )}
                    </div>
                    <p
                      className="flex-1 font-medium text-black"
                      style={{
                        paddingTop: s(4),
                        paddingBottom: vs(22),
                        fontSize: ms(16),
                        lineHeight: `${ms(24)}px`,
                      }}
                    >
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      <div
        className="shrink-0"
        style={{
          background: SHEET,
          paddingTop: vs(8),
          paddingBottom: `calc(${vs(6)}px + env(safe-area-inset-bottom))`,
          paddingLeft: s(14),
          paddingRight: s(14),
        }}
      >
        <div
          className="flex items-center"
          style={{ gap: s(8), paddingTop: vs(6), paddingBottom: vs(6) }}
        >
          <SoftNavButton
            label="Back"
            disabled={!canGoBack}
            onClick={props.onBack}
            size={s(44)}
          >
            <SkipBackIcon size={s(20)} />
          </SoftNavButton>
          <div className="min-w-0 flex-1">
            {isRepMode ? (
              <RepCapsule
                amount={stretch.reps ? String(stretch.reps) : null}
                switchSides={showSwitchSides}
                onPress={showSwitchSides ? props.onSwitchSides : props.onDone}
              />
            ) : (
              <TimerCapsule
                remaining={remaining}
                total={stretch.seconds}
                paused={paused}
                onToggle={props.onTogglePause}
              />
            )}
          </div>
          <SoftNavButton
            label="Skip stretch"
            onClick={props.onSkip}
            size={s(44)}
          >
            <SkipForwardIcon size={s(20)} />
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
  size,
  children,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  size: number
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex shrink-0 items-center justify-center rounded-full border border-white/90 bg-[#E4F2EC] shadow-[0_3px_8px_rgba(11,95,89,0.1)] disabled:opacity-35"
      style={{ width: size, height: size, color: SOFT_NAV_ICON }}
    >
      {children}
    </button>
  )
}

function clamp(value: number): number {
  return Math.max(0, Math.min(1, value))
}
