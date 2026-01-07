import Link from 'next/link'
import { Logo } from './Logo'
import { footerContent } from '@/app/lib/data'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 lg:gap-12">
          {/* Brand & Tagline Group */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-xs lg:max-w-sm">
            <Logo />
            <p className="text-gray-500 text-sm text-center md:text-left leading-relaxed">
              {footerContent.tagline}
            </p>
          </div>

          {/* Legal Links & Copyright Group */}
          <div className="flex flex-col items-center md:items-end gap-6">
            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3" aria-label="Legal navigation">
              {footerContent.legalLinks?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-teal-600 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-gray-400 text-xs sm:text-sm tracking-wide">
              {footerContent.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

