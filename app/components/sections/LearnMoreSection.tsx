'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  SparkIcon,
  CompassIcon,
  FlameIcon,
  BackpackIcon,
  ChatIcon,
} from '@/app/components/icons'

type HowItWorksFeature = {
  title: string
  icon: ReactNode
  paragraphs: string[]
}

const howItWorksFeatures: HowItWorksFeature[] = [
  {
    title: 'Your Wellness Profile',
    icon: <SparkIcon className="w-7 h-7" />,
    paragraphs: [
      'Limba wants to get to know you. Answer a few questions about your lifestyle, where you feel stiff, and how you spend your days. We transform your answers into a personalised Wellness Profile with risk insights, tension hotspots, and a 30-day roadmap tailored to your body.',
      "You'll see how you compare to others similar to you, get a relief forecast, and understand exactly what Limba will focus on.",
    ],
  },
  {
    title: 'Personalised Daily Routines',
    icon: <CompassIcon className="w-7 h-7" />,
    paragraphs: [
      'No more generic stretching videos. Limba uses the latest AI models to generate routines uniquely tailored to your body, targeting your tight neck, achy lower back, or stiff hips based on your profile and progress.',
      'Each short routine adapts as you do. Limba learns what works for you, refining your plan over time. Short, beginner-friendly, and designed to be done anywhere.',
    ],
  },
  {
    title: 'Journeys',
    icon: <CompassIcon className="w-7 h-7" />,
    paragraphs: [
      'When something has been bothering you for a while, pick a Journey: a guided programme that builds up stage by stage for your knees, lower back, or hips. It eases you in, so you are never thrown into the deep end.',
      'Do one short routine a day, watch your progress fill in along a winding path, and earn a milestone badge when you finish. Journeys run alongside your daily routine, and both keep your streak alive.',
    ],
  },
  {
    title: 'Ask Limba',
    icon: <ChatIcon className="w-7 h-7" />,
    paragraphs: [
      'Have a specific ache or discomfort? Just ask Limba. Describe how you feel and Limba is ready to help you fix stiffness, suggest immediate relief stretches, or answer questions about your wellness journey.',
      "It's like having a personal mobility coach in your pocket, available 24/7 to guide you through your aches and pains.",
    ],
  },
  {
    title: 'The Wellness Library',
    icon: <BackpackIcon className="w-7 h-7" />,
    paragraphs: [
      'Some days, you want to choose your own adventure. Browse stretches by body area, including neck and shoulders, lower back, hips, and more.',
      'Every movement comes with smooth animations so you can see exactly how to move. Perfect for those "my shoulder is killing me right now" moments.',
    ],
  },
  {
    title: 'Connects with the health apps you already use',
    icon: <SparkIcon className="w-7 h-7" />,
    paragraphs: [
      'Limba can read your steps, sleep, and recent activity from Apple Health on iOS or Google Health Connect on Android, so each routine is calibrated to how your body actually moved today.',
      'Every completed session is logged back as a stretching workout, helping your mobility work count toward your daily activity totals.',
    ],
  },
  {
    title: 'Progress that is clear, achievable and fun',
    icon: <FlameIcon className="w-7 h-7" />,
    paragraphs: [
      'Limba helps you build consistency with streaks, milestones, achievements, and celebrations so progress feels clear, achievable, and rewarding, not like a chore.',
    ],
  },
]

const showcaseFeatures = [
  {
    ...howItWorksFeatures[0],
    imageSrc: '/images/wellness-analysis-screen.png',
    imageAlt: 'Limba wellness profile screen',
  },
  {
    ...howItWorksFeatures[1],
    imageSrc: '/images/todays-routine.png',
    imageAlt: 'Limba personalised daily routine screen',
  },
  {
    ...howItWorksFeatures[2],
    imageSrc: '/images/journey-detail.png',
    imageAlt: 'Limba Journey detail screen showing the Bulletproof Knees path map',
  },
  {
    ...howItWorksFeatures[3],
    imageSrc: '/images/ask-limba.png',
    imageAlt: 'Limba chat screen',
  },
  {
    ...howItWorksFeatures[4],
    imageSrc: '/images/wellness-library.png',
    imageAlt: 'Limba wellness library screen',
  },
]

function HowItWorksCard({ feature }: { feature: HowItWorksFeature }) {
  return (
    <div className="h-full bg-gradient-to-br from-teal-100 via-teal-50 to-emerald-100 rounded-2xl p-6 lg:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-teal-600">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-teal-900">{feature.title}</h3>
      </div>
      <div className="space-y-3">
        {feature.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-gray-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      {feature.title === 'Connects with the health apps you already use' ? (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center justify-center">
            <Image
              src="/images/apple-health.svg"
              alt="Works with Apple Health"
              width={160}
              height={46}
              className="h-10 w-auto"
            />
          </div>
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm text-sm font-semibold text-teal-900">
            Google Health Connect
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function HowItWorksPreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeFeature = showcaseFeatures[activeIndex]

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? showcaseFeatures.length - 1 : current - 1,
    )
  }

  const goToNext = () => {
    setActiveIndex((current) =>
      current === showcaseFeatures.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-b from-teal-50 to-emerald-50 px-4 py-10 sm:px-8 lg:px-14 lg:py-14">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-teal-900 mb-10 lg:mb-12">
            What does Limba include?
          </h2>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
            <div className="flex flex-col items-center">
              <div className="relative rounded-[3rem] bg-teal-950 p-2 shadow-2xl">
                <div className="overflow-hidden rounded-[2.4rem] bg-white">
                  <Image
                    src={activeFeature.imageSrc}
                    alt={activeFeature.imageAlt}
                    width={600}
                    height={1200}
                    className="w-[220px] sm:w-[260px] lg:w-[300px] h-auto"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="h-9 w-9 rounded-full border border-teal-900/20 bg-white text-teal-900 shadow-sm transition-colors hover:bg-teal-50"
                  aria-label="Show previous Limba preview"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="h-9 w-9 rounded-full border border-teal-900/20 bg-white text-teal-900 shadow-sm transition-colors hover:bg-teal-50"
                  aria-label="Show next Limba preview"
                >
                  ›
                </button>
              </div>

              <div
                className="mt-4 flex items-center justify-center gap-2"
                aria-label="App preview carousel position"
              >
                {showcaseFeatures.map((feature, index) => (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? 'w-6 bg-teal-900'
                        : 'w-2.5 bg-gray-300 hover:bg-teal-300'
                    }`}
                    aria-label={`Show ${feature.title} preview`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {showcaseFeatures.map((feature, index) => (
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  key={feature.title}
                  className={`w-full rounded-2xl border bg-white/80 p-5 text-left shadow-sm transition-all sm:p-6 ${
                    index === activeIndex
                      ? 'border-teal-900 shadow-md'
                      : 'border-white/80 hover:border-teal-200 hover:bg-white'
                  }`}
                  aria-current={index === activeIndex}
                >
                  <h3 className="text-lg font-bold text-teal-900">{feature.title}</h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-600">
                    {feature.paragraphs[0]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LearnMoreSection() {
  return (
    <section className="bg-white py-16 lg:py-24" id="learn-more">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-900 mt-3 mb-4">
            Behind the app: your journey to feeling better
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Limba is designed for real humans with real stiffness and busy schedules. 
            Here&apos;s how we help you build a movement habit that actually sticks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {howItWorksFeatures.map((feature) => (
            <HowItWorksCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
