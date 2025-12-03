import type { PhoneMockupProps } from '@/app/types'

export function PhoneMockup({
  variant = 'hero',
  className = '',
}: PhoneMockupProps) {
  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      {/* Background with gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl transform rotate-3 opacity-20"
        aria-hidden="true"
      />

      {/* Phone Mockup */}
      <div className="relative bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl p-8 shadow-2xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Phone Status Bar */}
          {variant === 'beta' && (
            <div className="bg-gray-900 rounded-t-2xl px-4 py-1.5 flex items-center justify-between text-white text-xs">
              <span>9:51</span>
              <div className="flex items-center gap-1">
                <span aria-hidden="true">←</span>
                <span aria-hidden="true">G</span>
                <div className="flex gap-0.5" aria-hidden="true">
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
            </div>
          )}

          {variant === 'hero' && (
            <div className="bg-gray-900 rounded-t-2xl h-2" aria-hidden="true" />
          )}

          {/* App Content */}
          <div className="p-6 space-y-4">
            {/* Header */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {variant === 'hero' ? "Today's Routine" : 'Celebration'}
              </h3>
            </div>

            {/* Illustration Area */}
            {variant === 'hero' ? (
              <div className="bg-pink-50 rounded-xl p-6 flex items-center justify-center min-h-[120px]">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto bg-teal-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl" role="img" aria-label="Person meditating">
                      🧘
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Wellness routine</p>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-8 flex items-center justify-center min-h-[180px]">
                <div className="text-center space-y-3">
                  <div className="text-6xl mb-2" role="img" aria-label="Party popper">
                    🎉
                  </div>
                  <div className="w-20 h-20 mx-auto bg-teal-200 rounded-full flex items-center justify-center relative">
                    <span className="text-3xl" role="img" aria-label="Raising hands">
                      🙌
                    </span>
                    <div
                      className="absolute -top-2 -right-2 text-yellow-400 text-xl"
                      aria-hidden="true"
                    >
                      ✨
                    </div>
                    <div
                      className="absolute -bottom-2 -left-2 text-pink-400 text-xl"
                      aria-hidden="true"
                    >
                      ✨
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exercise Icons or Text Elements */}
            {variant === 'hero' ? (
              <div className="flex gap-4 justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl" role="img" aria-label="Person walking">
                      🚶
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">Walk</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl" role="img" aria-label="Person doing cartwheel">
                      🤸
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">Stretch</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-800">
                  Celebration
                </div>
                <div className="text-xs text-gray-500">Uniqueness</div>
              </div>
            )}

            {/* CTA Button */}
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-md">
              {variant === 'hero' ? 'Get Relief' : 'Get Your Session'}
            </button>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex justify-around">
            {variant === 'hero'
              ? ['🏠', '🔍', '❤️', '📅', '👤'].map((icon, idx) => (
                  <button
                    key={`nav-${idx}`}
                    className="text-gray-400 hover:text-teal-500 transition-colors"
                    aria-label={`Navigation item ${idx + 1}`}
                  >
                    <span className="text-lg" aria-hidden="true">
                      {icon}
                    </span>
                  </button>
                ))
              : ['🏠', '📅', '💬', '👤'].map((icon, idx) => (
                  <button
                    key={`nav-${idx}`}
                    className="text-gray-400 hover:text-teal-500 transition-colors"
                    aria-label={`Navigation item ${idx + 1}`}
                  >
                    <span className="text-lg" aria-hidden="true">
                      {icon}
                    </span>
                  </button>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

