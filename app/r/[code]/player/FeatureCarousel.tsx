'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppScale } from './appScale'

/**
 * A swipeable strip of real app screens on the browser finish screen, so a
 * recipient who just did a routine sees what else Limba does before they
 * download. Cards snap as you swipe and move on by themselves until the
 * visitor touches the strip (never with Reduce Motion).
 */

const TEAL = '#008080'
const AUTO_ADVANCE_MS = 3500

export interface Feature {
  image: string
  title: string
  text: string
}

export const FEATURES: Feature[] = [
  {
    image: '/player/features/todays-routine.webp',
    title: 'A new routine every day',
    text: 'Built around where you feel stiff, in under 5 minutes.',
  },
  {
    image: '/player/features/ask-limba.webp',
    title: 'Ask Limba',
    text: 'Tell Limba what feels tight and get a routine for it.',
  },
  {
    image: '/player/features/journeys.webp',
    title: 'Journeys',
    text: 'Step-by-step programmes for your knees, hips and back.',
  },
]

/**
 * Writes "Limba" as the app's LIMBA wordmark (the logo artwork), sized to the
 * capital height of the text around it, like the app's "Ask LIMBA" header.
 */
function WithWordmark({ text, fontSize }: { text: string; fontSize: number }) {
  const parts = text.split('Limba')
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/LIMBA@2x.png"
              alt="Limba"
              className="inline-block w-auto align-baseline"
              style={{ height: fontSize * 0.72 }}
            />
          )}
        </span>
      ))}
    </>
  )
}

export function FeatureCarousel({ senderName }: { senderName: string | null }) {
  const { s, vs, ms } = useAppScale()
  const stripRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [userTook, setUserTook] = useState(false)

  const step = useCallback(() => {
    const strip = stripRef.current
    const first = strip?.firstElementChild as HTMLElement | null
    if (!strip || !first) return 0
    const gap = parseFloat(getComputedStyle(strip).columnGap || '0') || 0
    return first.offsetWidth + gap
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const strip = stripRef.current
      const width = step()
      if (!strip || !width) return
      strip.scrollTo?.({ left: index * width, behavior: 'smooth' })
      setActive(index)
    },
    [step]
  )

  // Move on by itself until the visitor takes over.
  useEffect(() => {
    if (userTook) return
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const id = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % FEATURES.length
        const strip = stripRef.current
        const width = step()
        if (strip && width)
          strip.scrollTo?.({ left: next * width, behavior: 'smooth' })
        return next
      })
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [userTook, step])

  const onScroll = () => {
    const strip = stripRef.current
    const width = step()
    if (!strip || !width) return
    setActive(
      Math.max(
        0,
        Math.min(FEATURES.length - 1, Math.round(strip.scrollLeft / width))
      )
    )
  }

  const heading = senderName
    ? `${senderName} builds routines like this with Limba`
    : "There's more in the app"
  const phoneWidth = s(100)

  return (
    <section
      className="w-full"
      aria-label="What you get with Limba"
      style={{ marginBottom: vs(8) }}
    >
      <h3
        className="text-center font-bold text-black"
        style={{ fontSize: ms(17), marginBottom: vs(12), letterSpacing: -0.3 }}
      >
        <WithWordmark text={heading} fontSize={ms(17)} />
      </h3>

      <div
        ref={stripRef}
        onScroll={onScroll}
        onPointerDown={() => setUserTook(true)}
        onTouchStart={() => setUserTook(true)}
        onWheel={() => setUserTook(true)}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          columnGap: s(12),
          paddingBottom: vs(4),
          // Edge to edge: the strip runs under the screen's side padding.
          marginLeft: -s(24),
          marginRight: -s(24),
          paddingLeft: s(24),
          paddingRight: s(24),
          scrollPaddingLeft: s(24),
        }}
      >
        {FEATURES.map((feature, i) => (
          <article
            key={feature.title}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${FEATURES.length}: ${feature.title}`}
            className="flex shrink-0 snap-start items-center border border-[rgba(8,127,107,0.12)] bg-white/75 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
            style={{
              width: '86%',
              gap: s(14),
              padding: s(12),
              borderRadius: s(20),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={feature.image}
              alt={`${feature.title} in the Limba app`}
              loading="lazy"
              className="shrink-0 border border-black/5 object-cover shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
              style={{
                width: phoneWidth,
                height: phoneWidth * (783 / 360),
                borderRadius: s(14),
              }}
            />
            <div className="min-w-0">
              <p
                className="font-bold"
                style={{
                  fontSize: ms(16),
                  lineHeight: `${ms(20)}px`,
                  color: TEAL,
                  marginBottom: vs(6),
                }}
              >
                <WithWordmark text={feature.title} fontSize={ms(16)} />
              </p>
              <p
                className="font-medium text-[#666666]"
                style={{ fontSize: ms(14), lineHeight: `${ms(19)}px` }}
              >
                {feature.text}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div
        className="flex items-center justify-center"
        style={{ gap: s(6), marginTop: vs(10) }}
      >
        {FEATURES.map((feature, i) => (
          <button
            key={feature.title}
            type="button"
            aria-label={`Show ${feature.title}`}
            aria-current={i === active}
            onClick={() => {
              setUserTook(true)
              goTo(i)
            }}
            className="rounded-full transition-all"
            style={{
              width: i === active ? s(18) : s(6),
              height: s(6),
              background: i === active ? TEAL : 'rgba(0,128,128,0.25)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
