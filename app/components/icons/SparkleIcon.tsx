import type { IconProps } from '@/app/types'

export function SparkleIcon({
  className = 'w-10 h-10',
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={ariaHidden}
    >
      <path
        d="M12 3.5L13.4 8.1L18 9.5L13.4 10.9L12 15.5L10.6 10.9L6 9.5L10.6 8.1L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 14L18.5 15.5L20 16L18.5 16.5L18 18L17.5 16.5L16 16L17.5 15.5L18 14Z"
        fill="currentColor"
      />
      <circle cx="7" cy="15" r="1" fill="currentColor" />
    </svg>
  )
}

