import Image from 'next/image'

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.trillLabs.limba'

const APP_STORE_URL =
  'https://apps.apple.com/us/app/limba-stretch-flexibility/id6756675956'

interface DownloadButtonsProps {
  className?: string
  justify?: 'start' | 'center' | 'end'
  size?: 'sm' | 'md'
}

export function DownloadButtons({
  className = '',
  justify = 'start',
  size = 'md',
}: DownloadButtonsProps) {
  const justifyClass =
    justify === 'center'
      ? 'justify-center'
      : justify === 'end'
        ? 'justify-end'
        : 'justify-start'

  const isSm = size === 'sm'
  const badgeHeight = isSm ? 38 : 56

  return (
    <div
      className={`flex flex-row items-center ${justifyClass} gap-3 ${isSm ? '' : 'sm:gap-4 w-full'} ${className}`}
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Limba on the App Store"
        className="inline-flex transition-all duration-200 hover:scale-[1.02] active:scale-95"
      >
        <Image
          src="/images/app-store-badge.svg"
          alt="Download on the App Store"
          width={120}
          height={40}
          className="h-auto w-auto"
          style={{ height: badgeHeight }}
        />
      </a>

      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Limba on Google Play"
        className="inline-flex transition-all duration-200 hover:scale-[1.02] active:scale-95"
      >
        <Image
          src="/images/google-play-badge.svg"
          alt="Get it on Google Play"
          width={135}
          height={40}
          className="h-auto w-auto"
          style={{ height: badgeHeight }}
        />
      </a>
    </div>
  )
}
