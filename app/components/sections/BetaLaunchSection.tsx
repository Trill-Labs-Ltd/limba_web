import Image from 'next/image'
import { Button } from '@/app/components/ui'
import { betaContent, betaBenefits } from '@/app/lib/data'

interface BetaLaunchSectionProps {
  onJoinWaitlist?: () => void
}

export function BetaLaunchSection({ onJoinWaitlist }: BetaLaunchSectionProps) {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Phone Mockup */}
          <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative">
              {/* Gradient blob background */}
              <div 
                className="absolute -inset-6 md:-inset-10 bg-gradient-to-br from-teal-100 via-teal-50 to-emerald-100 rounded-[2.5rem] md:rounded-[3rem]"
                aria-hidden="true"
              />
              
              {/* Phone */}
              <div className="relative animate-float py-6 px-4 drop-shadow-2xl">
                <Image
                  src="/images/analysis.png"
                  alt="Limba analysis and wellness insights"
                  width={600}
                  height={1200}
                  className="w-[220px] sm:w-[260px] md:w-[300px] h-auto"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="order-2 lg:order-2 space-y-6">
            {/* Beta Badge */}
            <div className="inline-block">
              <span className="text-teal-500 text-lg font-semibold">
                {betaContent.badge}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-teal-900 leading-tight">
              {betaContent.headline}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              {betaContent.description}
            </p>

            {/* Bullet Points */}
            <ul className="space-y-4 pt-2" role="list">
              {betaBenefits.map((benefit, idx) => (
                <li key={`benefit-${idx}`} className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-gray-700 leading-relaxed">{benefit}</p>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                variant="primary"
                onClick={onJoinWaitlist}
                ariaLabel="Join the beta waiting list"
              >
                {betaContent.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

