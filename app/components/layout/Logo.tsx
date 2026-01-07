import Image from 'next/image'
import Link from 'next/link'
import type { LogoProps } from '@/app/types'
import { APP_NAME } from '@/app/lib/constants'

export function Logo({ className = '', showText = false }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-3 ${className} transition-opacity hover:opacity-80`}
      aria-label={`${APP_NAME} home`}
    >
      <Image
        src="/images/LIMBA@2x.png"
        alt={`${APP_NAME} logo`}
        width={320}
        height={106}
        priority
        quality={100}
        className="h-8 sm:h-9 w-auto"
      />
      {showText && (
        <span className="text-teal-800 font-semibold text-xl">{APP_NAME}</span>
      )}
    </Link>
  )
}

