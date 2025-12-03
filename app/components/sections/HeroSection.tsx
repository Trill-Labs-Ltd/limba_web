import { Button, Badge, PhoneMockup } from '@/app/components/ui'
import { heroContent, SOCIAL_PROOF_COUNT } from '@/app/lib/data'

const AVATAR_LETTERS = ['A', 'B', 'C', 'D'] as const

interface HeroSectionProps {
  onJoinWaitlist?: () => void
}

export function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section className="w-full">
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
              <Button variant="secondary" ariaLabel="Learn more about Limba">
                {heroContent.ctaSecondary}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2" role="group" aria-label="User avatars">
                {AVATAR_LETTERS.map((letter, idx) => (
                  <div
                    key={`avatar-${letter}`}
                    className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-600 font-medium text-sm"
                    aria-label={`User ${idx + 1}`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {SOCIAL_PROOF_COUNT} early adopters waiting
              </span>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <PhoneMockup variant="hero" />
          </div>
        </div>
      </div>
    </section>
  )
}

