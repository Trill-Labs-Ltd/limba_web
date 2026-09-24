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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column - Main Copy */}
          <div className="order-2 lg:order-1 relative z-10 min-w-0 space-y-6 lg:pr-4">
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
          <div className="order-1 lg:order-2 relative z-0 flex justify-center lg:justify-end min-w-0">
            {/* Large gradient background container */}
            <div className="relative w-full max-w-[42rem]">
              {/* Gradient blob background */}
              <div 
                className="absolute -inset-6 md:-inset-10 lg:-inset-y-12 lg:-inset-x-4 xl:-inset-x-8 bg-gradient-to-br from-teal-100 via-teal-50 to-emerald-100 rounded-[3rem] md:rounded-[4rem]"
                aria-hidden="true"
              />
              
              {/* Phone container — Ask Limba centered front, Wellness Library + Home flanking.
                  Widths are fractions of the column so the row cannot cover the copy. */}
              <div className="relative flex items-end justify-center py-6 px-1 sm:px-2 md:px-4">
                {/* Left — Child's Pose stretch detail (matches carousel) */}
                <div className="relative z-0 w-[31%] -mr-[3%] mt-6 sm:mt-8 md:mt-12 min-w-0 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <PhoneMockup
                    src="/images/preview-routine.png"
                    alt="Limba stretch detail screen showing Child's Pose instructions"
                    widthClassName="w-full"
                  />
                </div>

                {/* Middle / primary — Ask Limba */}
                <div className="relative z-20 w-[40%] min-w-0 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <PhoneMockup
                    src="/images/ask-limba.png"
                    alt="Ask Limba conversational screen"
                    widthClassName="w-full"
                    priority
                  />
                </div>

                {/* Right — Home dashboard */}
                <div className="relative z-10 w-[31%] -ml-[3%] mt-6 sm:mt-8 md:mt-12 min-w-0 animate-float drop-shadow-2xl transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                  <PhoneMockup
                    src="/images/dashboard.png"
                    alt="Limba home screen with today's routine and the Find your fix Journeys section"
                    widthClassName="w-full"
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

