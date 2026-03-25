'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.trillLabs.limba'
const DISMISSED_KEY = 'limba_android_banner_dismissed'

export function AndroidAppBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isAndroid = /android/i.test(navigator.userAgent)
    const wasDismissed = sessionStorage.getItem(DISMISSED_KEY) === 'true'
    if (isAndroid && !wasDismissed) {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="banner"
      aria-label="Get Limba on Google Play"
      className="flex items-center gap-3 bg-gray-50 border-b border-gray-200 px-3 py-2 w-full"
    >
      {/* App icon */}
      <Image
        src="/images/LIMBA@2x.png"
        alt="Limba app icon"
        width={40}
        height={40}
        className="rounded-lg flex-shrink-0 h-10 w-10 object-contain"
      />

      {/* App info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-tight truncate">
          Limba
        </p>
        <p className="text-xs text-gray-500 leading-tight truncate">
          Free · Google Play
        </p>
      </div>

      {/* Install CTA */}
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
        aria-label="Install Limba on Google Play"
      >
        Install
      </a>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-1 -mr-1 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    </div>
  )
}
