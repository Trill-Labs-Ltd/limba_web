'use client'

import Image from 'next/image'
import { Badge, Button, DownloadButtons } from '@/app/components/ui'
import { heroContent } from '@/app/lib/data'

function PhoneMockup({
  src,
  alt,
  widthClassName,
  priority = false,
}: {
  src: string
  alt: string
  widthClassName: string
  priority?: boolean
}) {
  return (
    <div
      className={`relative ${widthClassName} bg-black rounded-[2.2rem] p-1.5 sm:p-2`}
    >
      <div className="overflow-hidden rounded-[1.8rem] bg-white">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={1200}
          className="w-full h-auto"
          priority={priority}
        />
      </div>
    </div>
  )
}

export function HeroSection() {
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
            <div className="space-y-3 pt-2">
              <DownloadButtons />
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
            <div className="relative w-max max-w-full">
              {/* Gradient blob background */}
              <div 
                className="absolute -inset-6 md:-inset-10 lg:-inset-12 bg-gradient-to-br from-teal-100 via-teal-50 to-emerald-100 rounded-[3rem] md:rounded-[4rem]"
                aria-hidden="true"
              />
              
              {/* Phone container */}
              <div className="relative flex items-end justify-center gap-1 sm:gap-3 md:gap-4 lg:gap-5 py-6 px-2 sm:px-4 md:px-6">
                {/* Primary Phone - Ask Limba Screen */}
                <div className="relative z-10 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <PhoneMockup
                    src="/images/ask-limba.png"
                    alt="Ask Limba conversational screen"
                    widthClassName="w-[160px] sm:w-[240px] md:w-[280px] lg:w-[300px]"
                    priority
                  />
                </div>
                
                {/* Secondary Phone - Dashboard in matching phone shell */}
                <div className="relative z-0 -ml-2 sm:-ml-1 md:-ml-2 lg:-ml-3 mt-6 sm:mt-8 md:mt-12 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <PhoneMockup
                    src="/images/dashboard.png"
                    alt="Limba dashboard showing wellness library"
                    widthClassName="w-[140px] sm:w-[220px] md:w-[260px] lg:w-[280px]"
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

