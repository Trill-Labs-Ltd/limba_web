import Image from 'next/image'
import {
  SparkIcon,
  CompassIcon,
  FlameIcon,
  BackpackIcon,
  BadgeIcon,
} from '@/app/components/icons'

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
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* AI Wellness Profile */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <SparkIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">
                Your AI Wellness Profile
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
             Limba wants to get to know you. Answer a few questions about 
              your lifestyle, where you feel stiff, and how you spend your days. We
              transforms your answers into a personalised Wellness Profile - complete with 
              risk insights, tension hotspots, and a 30-day roadmap tailored to your body.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You&apos;ll see how you compare to others your age, get a relief forecast, 
              and understand exactly what Limba will focus on.
            </p>
          </div>

          {/* Personalised Daily Routines */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <CompassIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">
                AI-Crafted Daily Routines
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              No more generic stretching videos. Limba uses the latest AI models to generate 
              routines uniquely tailored to your body — targeting your tight neck, achy lower 
              back, or stiff hips based on your profile and progress.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each 5–10 minute session adapts as you do. The AI learns what works for you, 
              refining your plan over time. Short, beginner-friendly, and designed to be 
              done anywhere — next to your desk, in your kitchen, or even in a hotel room.
            </p>
          </div>

          {/* Wellness Library */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <BackpackIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">
                The Wellness Library
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Some days, you want to choose your own adventure. Browse our library of 
              stretches by body area — neck &amp; shoulders, lower back, hips, and more. 
              Search by stretch name.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every movement comes with smooth animations so you can see exactly how to move. 
              Perfect for those &quot;my shoulder is killing me right now&quot; moments.
            </p>
          </div>

          {/* Smart Streaks */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <FlameIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">
                Streaks That Support, Not Shame
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your streak counter shows consecutive days of movement — a gentle flame 
              that grows as you show up. When you&apos;re at risk of breaking your streak, 
              Limba sends a warm nudge to keep you going.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We frame notifications as &quot;future-you support&quot; — because consistency 
              should feel encouraging, not exhausting.
            </p>
          </div>

          {/* Milestones */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <BadgeIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">
                Milestones &amp; Achievements
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Turn a daunting goal like &quot;get flexible&quot; into small, winnable quests. 
              Unlock badges as you progress. From your first session to 90 days of consistency. Try and beat them all.
            </p>
            
            {/* Milestone Preview Image */}
            <div className="rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/images/milestone.png"
                alt="Seed Planted milestone - Complete your first session"
                width={600}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Celebrations */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <SparkIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">
                We Celebrate With You
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Every milestone you hit is met with genuine 
              celebration. Because showing up — especially on hard days, deserves 
              recognition.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Limba doesn&apos;t just track your progress; it cheers you on.
            </p>
          </div>

          {/* Limba the Cat - Full Width */}
          <div className="md:col-span-2 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm">
                <Image
                  src="/images/limba-mascot-asset.png"
                  alt="Limba mascot"
                  width={48}
                  height={48}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-teal-900">
                Meet Limba the Cat
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Limba isn&apos;t just an app! It&apos;s a companion. Limba the cat
                  lives in the app and reflects how you&apos;re doing. When you show up 
                  for your routines, Limba thrives: bright-eyed, playful, and full of energy.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Skip a few days? Limba gets a little sleepy. It&apos;s not guilt — it&apos;s 
                  a gentle, visual reminder that your body (and your cat) feels better when 
                  you move. Taking care of Limba means taking care of yourself.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  There&apos;s something satisfying about seeing your companion happy. 
                  It&apos;s the little boost that makes you want to come back. Not because 
                  you have to, but because it feels good.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-6 drop-shadow-2xl text-center space-y-3 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                  <Image
                    src="/images/limba-mascot-asset.png"
                    alt="Happy Limba mascot"
                    width={200}
                    height={200}
                    className="w-32 h-32 mx-auto object-contain"
                  />
                  <p className="text-sm font-medium text-teal-900">Happy Limba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
