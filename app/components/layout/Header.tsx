import { Logo } from './Logo'
import { Button } from '@/app/components/ui'

interface HeaderProps {
  onJoinWaitlist?: () => void
}

export function Header({ onJoinWaitlist }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Logo />

        {/* CTA Button */}
        <Button
          size="sm"
          onClick={onJoinWaitlist}
          ariaLabel="Join the waiting list"
          className="text-sm sm:text-base whitespace-nowrap"
        >
          <span className="hidden sm:inline">Join The Waiting List</span>
          <span className="sm:hidden">Join List</span>
        </Button>
      </nav>
    </header>
  )
}

