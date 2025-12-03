import { Logo } from './Logo'
import { footerContent } from '@/app/lib/data'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Middle Text */}
          <p className="text-gray-500 text-xs sm:text-sm text-center max-w-md">
            {footerContent.tagline}
          </p>

          {/* Copyright */}
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

