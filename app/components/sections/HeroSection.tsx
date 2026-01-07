'use client'

import Image from 'next/image'
import { Button, Badge } from '@/app/components/ui'
import { heroContent } from '@/app/lib/data'

interface HeroSectionProps {
  onJoinWaitlist?: () => void
}

export function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section className="w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Copy */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Badge */}
            <Badge
              icon={
                <div
                  className="w-2 h-2 rounded-full bg-teal-500"
                  aria-hidden="true"
                />
              }
            >
              {heroContent.badge}
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-teal-900 leading-tight">
              {heroContent.headline}{' '}
              <span className="text-teal-500">{heroContent.highlightedText}</span>{' '}
              {heroContent.headlineContinued}
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              {heroContent.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant="primary"
                onClick={onJoinWaitlist}
                ariaLabel="Join the waiting list"
              >
                {heroContent.ctaPrimary}
              </Button>
              <Button
                variant="secondary"
                ariaLabel="Learn more about Limba"
                onClick={() => {
                  document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {heroContent.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* Right Column - Phone Mockups with gradient background */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Large gradient background container */}
            <div className="relative">
              {/* Gradient blob background */}
              <div 
                className="absolute -inset-6 md:-inset-10 lg:-inset-12 bg-gradient-to-br from-teal-100 via-teal-50 to-emerald-100 rounded-[3rem] md:rounded-[4rem]"
                aria-hidden="true"
              />
              
              {/* Phone container */}
              <div className="relative flex items-end justify-center py-6 px-4 md:px-6">
                {/* Primary Phone - Dashboard Screen */}
                <div className="relative z-10 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <Image
                    src="/images/dashboard.png"
                    alt="Limba dashboard showing wellness library"
                    width={600}
                    height={1200}
                    className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px] h-auto"
                    priority
                  />
                </div>
                
                {/* Secondary Phone - Login (static) */}
                <div className="relative z-0 -ml-12 md:-ml-16 mt-8 md:mt-12 drop-shadow-2xl">
                  <Image
                    src="/images/login.png"
                    alt="Limba login screen"
                    width={560}
                    height={1120}
                    className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

