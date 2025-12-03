import type { ButtonProps } from '@/app/types'
import { TAILWIND_CLASSES } from '@/app/lib/constants'

export function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
  className = '',
  ariaLabel,
  type = 'button',
}: ButtonProps) {
  const baseClasses = TAILWIND_CLASSES.button.base
  const variantClasses =
    variant === 'primary'
      ? TAILWIND_CLASSES.button.primary
      : TAILWIND_CLASSES.button.secondary
  const sizeClasses = TAILWIND_CLASSES.button.sizes[size]

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

