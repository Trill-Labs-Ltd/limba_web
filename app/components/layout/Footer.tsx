import Link from 'next/link'
import { Logo } from './Logo'
import { DownloadButtons } from '@/app/components/ui'
import { betaContent, footerContent } from '@/app/lib/data'

export function Footer() {
  return (
    <footer className="bg-teal-900 border-t border-teal-800 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-14">
          <span className="text-teal-300 text-lg font-semibold">
            {betaContent.badge}
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {betaContent.headline}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-teal-100 leading-relaxed max-w-3xl">
            {betaContent.description}
          </p>
          <DownloadButtons className="mt-8" />
        </div>

        <div className="border-t border-teal-800 pt-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-10 lg:gap-12">
          {/* Brand & Tagline Group */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-xs lg:max-w-sm">
            <Logo variant="light" />
            <p className="text-teal-200 text-sm text-center md:text-left leading-relaxed">
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
                  className="text-teal-200 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-teal-300/60 text-xs sm:text-sm tracking-wide">
              {footerContent.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

