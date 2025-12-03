export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success'
  icon?: React.ReactNode
}

export interface LogoProps {
  className?: string
  showText?: boolean
}

export interface PhoneMockupProps {
  variant?: 'hero' | 'beta'
  className?: string
}

export interface IconProps {
  className?: string
  size?: number
  'aria-hidden'?: boolean
}

export interface Feature {
  id: string
  icon: 'sparkle' | 'clock' | 'trophy'
  title: string
  description: string
}

export interface WaitlistFormData {
  email: string
  source?: string
  referredByCode?: string
}

export interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  source?: string
}

