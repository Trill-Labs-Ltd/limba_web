'use client'

import Image from 'next/image'
import { Badge, DownloadButtons } from '@/app/components/ui'
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
    <section className="w-full overflow-hidden bg-gradient-to-b from-teal-100 to-teal-50">
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
              
              {/* Phone container — Ask Limba centered front, Wellness Library + Home flanking */}
              <div className="relative flex items-end justify-center gap-0 sm:gap-1 md:gap-2 py-6 px-1 sm:px-2 md:px-4">
                {/* Left — Wellness Library */}
                <div className="relative z-0 -mr-3 sm:-mr-4 md:-mr-5 mt-6 sm:mt-8 md:mt-12 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <PhoneMockup
                    src="/images/wellness-library.png"
                    alt="Limba Wellness Library screen with stretches by body area"
                    widthClassName="w-[110px] sm:w-[170px] md:w-[200px] lg:w-[220px]"
                  />
                </div>

                {/* Middle / primary — Ask Limba */}
                <div className="relative z-20 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <PhoneMockup
                    src="/images/ask-limba.png"
                    alt="Ask Limba conversational screen"
                    widthClassName="w-[140px] sm:w-[210px] md:w-[250px] lg:w-[270px]"
                    priority
                  />
                </div>

                {/* Right — Home dashboard */}
                <div className="relative z-10 -ml-3 sm:-ml-4 md:-ml-5 mt-6 sm:mt-8 md:mt-12 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <PhoneMockup
                    src="/images/dashboard.png"
                    alt="Limba home screen with today's routine and the Find your fix Journeys section"
                    widthClassName="w-[110px] sm:w-[170px] md:w-[200px] lg:w-[220px]"
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

