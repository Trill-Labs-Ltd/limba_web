import type { IconProps } from '@/app/types'

export function ChatIcon({
  className = 'w-7 h-7',
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 10h8M8 14h5m6 7-4.35-2.23a2 2 0 00-.91-.23H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-2 3.46z"
      />
    </svg>
  )
}
