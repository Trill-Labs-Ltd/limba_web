import Image from 'next/image'
import type { PhoneMockupProps } from '@/app/types'

export function PhoneMockup({
  variant = 'hero',
  className = '',
  imageSrc,
  imageAlt = 'App screenshot',
}: PhoneMockupProps) {
  return (
    <div 
      className={`relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm group cursor-pointer ${className}`}
    >
      {/* Background with gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl transform rotate-3 opacity-20 transition-all duration-500 group-hover:rotate-6 group-hover:opacity-30"
        aria-hidden="true"
      />

      {/* Phone Mockup with hover animation */}
      <div 
        className="relative bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl p-4 sm:p-6 shadow-2xl transition-all duration-500 ease-out
          animate-float
          hover:shadow-[0_25px_60px_-12px_rgba(20,184,166,0.4)]
          hover:-translate-y-2
          active:scale-[0.98] active:shadow-xl"
      >
        {/* iPhone Frame */}
        <div className="bg-gray-900 rounded-[2rem] p-2 shadow-inner">
          {/* iPhone Notch */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" aria-hidden="true" />
          </div>
          
          {/* Screen Content */}
          <div className="bg-white rounded-[1.5rem] overflow-hidden">
            {imageSrc ? (
              <div className="relative aspect-[9/19.5]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 512px"
                  priority
                />
              </div>
            ) : (
              /* Empty State with Question Mark */
              <div className="p-6 flex items-center justify-center aspect-[9/19.5]">
                <div className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl sm:text-6xl text-gray-400">?</span>
                  </div>
                  <p className="text-sm text-gray-500">Coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-24 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

