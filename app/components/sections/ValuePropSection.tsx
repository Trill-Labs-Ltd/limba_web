import { FeatureCard } from '@/app/components/ui'
import {
  SparkleIcon,
  ClockIcon,
  BadgeIcon,
  ChatIcon,
  MountainIcon,
} from '@/app/components/icons'
import { features } from '@/app/lib/data'

const iconMap = {
  chat: <ChatIcon className="w-7 h-7 text-teal-600" />,
  sparkle: <SparkleIcon className="w-10 h-10 text-teal-600" />,
  clock: <ClockIcon className="w-7 h-7 text-teal-600" />,
  trophy: <BadgeIcon className="w-7 h-7 text-teal-600" />,
  journeys: <MountainIcon className="w-7 h-7 text-teal-600" />,
}

export function ValuePropSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-900 mb-4">
            Wellness that fits your life
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            For people who need to feel better, not add another thing to their
            schedule.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={iconMap[feature.icon]}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

