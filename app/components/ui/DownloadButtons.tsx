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

  return (
    <div
      className={`flex flex-row items-center ${justifyClass} gap-2 ${isSm ? '' : 'flex-col sm:flex-row gap-3 w-full'} ${className}`}
    >
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Limba on the App Store"
        className={`inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md ${
          isSm
            ? 'px-2.5 py-2 sm:px-3.5'
            : 'w-full sm:w-48 px-5 py-3.5'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`flex-shrink-0 ${isSm ? 'w-4 h-4' : 'w-6 h-6'}`}
          aria-hidden="true"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <span className="flex flex-col leading-tight text-left">
          <span className={`font-normal opacity-70 tracking-wide uppercase ${isSm ? 'text-[8px]' : 'text-[10px]'}`}>
            Download on the
          </span>
          <span className={`font-semibold tracking-tight ${isSm ? 'text-xs' : 'text-sm'}`}>
            App Store
          </span>
        </span>
      </a>

      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Limba on Google Play"
        className={`inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md ${
          isSm
            ? 'px-2.5 py-2 sm:px-3.5'
            : 'w-full sm:w-48 px-5 py-3.5'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`flex-shrink-0 ${isSm ? 'w-4 h-4' : 'w-6 h-6'}`}
          aria-hidden="true"
        >
          <path d="M3.18 23.76c.31.17.67.18 1.01.02L16.65 12 12.58 7.93 3.18 23.76Z" fill="#EA4335" />
          <path d="M20.56 10.27 17.5 8.56l-4.2 3.44 4.2 4.2 3.07-1.72a1.96 1.96 0 0 0 0-4.21Z" fill="#FBBC04" />
          <path d="M3.18.24A1.96 1.96 0 0 0 2 2v20c0 .74.41 1.39 1.18 1.76l13.47-11.76L3.18.24Z" fill="#4285F4" />
          <path d="M16.65 12 4.19.24c-.34-.16-.7-.15-1.01.0L16.65 12Z" fill="#34A853" />
        </svg>
        <span className="flex flex-col leading-tight text-left">
          <span className={`font-normal opacity-70 tracking-wide uppercase ${isSm ? 'text-[8px]' : 'text-[10px]'}`}>
            Get it on
          </span>
          <span className={`font-semibold tracking-tight ${isSm ? 'text-xs' : 'text-sm'}`}>
            Google Play
          </span>
        </span>
      </a>
    </div>
  )
}
