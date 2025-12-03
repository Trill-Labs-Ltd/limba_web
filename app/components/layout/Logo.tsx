import Image from 'next/image'
import type { LogoProps } from '@/app/types'
import { APP_NAME } from '@/app/lib/constants'

export function Logo({ className = '', showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/Logo.png"
        alt={`${APP_NAME} logo`}
        width={120}
        height={40}
        priority
        className="h-8 sm:h-10 w-auto"
      />
      {showText && (
        <span className="text-teal-800 font-semibold text-xl">{APP_NAME}</span>
      )}
    </div>
  )
}

