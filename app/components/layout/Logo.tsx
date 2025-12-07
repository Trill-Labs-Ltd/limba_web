import Image from 'next/image'
import type { LogoProps } from '@/app/types'
import { APP_NAME } from '@/app/lib/constants'

export function Logo({ className = '', showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/LIMBA@2x.png"
        alt={`${APP_NAME} logo`}
        width={320}
        height={106}
        priority
        quality={100}
        className="h-10 sm:h-12 w-auto"
      />
      {showText && (
        <span className="text-teal-800 font-semibold text-xl">{APP_NAME}</span>
      )}
    </div>
  )
}

