import { Logo } from './Logo'
import { DownloadButtons } from '@/app/components/ui'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Logo />
        <DownloadButtons justify="end" size="sm" />
      </nav>
    </header>
  )
}
