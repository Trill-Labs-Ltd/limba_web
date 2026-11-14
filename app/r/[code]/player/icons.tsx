/** Small inline icons for the player (the site has no icon library). */

interface IconProps {
  className?: string
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
}

export function CloseIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function BackIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M19 20 9 12l10-8v16ZM5 19V5" />
    </svg>
  )
}

export function SkipIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m5 4 10 8-10 8V4ZM19 5v14" />
    </svg>
  )
}

export function SoundIcon({ muted, className = 'h-5 w-5' }: IconProps & { muted: boolean }) {
  return (
    <svg {...base} className={className}>
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      {muted ? <path d="m23 9-6 6M17 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
    </svg>
  )
}

/** Stand-in when a stretch has no video, like the app's generic figure. */
export function FigureIcon({ className = 'h-24 w-24' }: IconProps) {
  return (
    <svg {...base} strokeWidth={1.5} className={className}>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M4 9h16M12 9v5M12 14l-4 7M12 14l4 7" />
    </svg>
  )
}
