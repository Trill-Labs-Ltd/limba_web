import type { BadgeProps } from '@/app/types'

export function Badge({ children, variant = 'default', icon }: BadgeProps) {
  const baseClasses =
    'inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full'
  const variantClasses =
    variant === 'success'
      ? 'bg-teal-100 text-teal-700'
      : 'bg-gray-100 text-gray-700'

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {icon}
      {children}
    </div>
  )
}

