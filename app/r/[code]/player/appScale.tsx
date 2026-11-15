'use client'

import { createContext, useContext, useEffect, useState } from 'react'

/**
 * The app's responsive sizing, ported from limba_mobile src/utils/responsive.ts.
 * The app designs at iPhone 14 Pro size (393 x 852 pt) and scales every size to
 * the real screen:
 *
 * - s()  (scale)          widths, horizontal spacing, icons: x width / 393
 * - vs() (verticalScale)  heights, vertical spacing:          x height / 852
 * - ms() (moderateScale)  fonts: half way between the size and s(size)
 *
 * On the web the "screen" is the player column (phone width, at most 430 px)
 * and the visible height of the browser window, so a layout that fits the
 * app's screen also fits between the browser's toolbars.
 */

export const BASE_WIDTH = 393
export const BASE_HEIGHT = 852
/** The player column never gets wider than a large phone. */
export const MAX_COLUMN_WIDTH = 430

export interface AppScale {
  /** Width-based scale, like the app's scale(). */
  s: (size: number) => number
  /** Height-based scale, like the app's verticalScale(). */
  vs: (size: number) => number
  /** Gentler scale for fonts, like the app's moderateScale(size, 0.5). */
  ms: (size: number, factor?: number) => number
  /** The visible height the vertical scale is based on. */
  height: number
}

export function makeAppScale(width: number, height: number): AppScale {
  const wf = width / BASE_WIDTH
  const hf = height / BASE_HEIGHT
  return {
    s: (size) => size * wf,
    vs: (size) => size * hf,
    ms: (size, factor = 0.5) => size + (size * wf - size) * factor,
    height,
  }
}

function measure(): AppScale {
  if (typeof window === 'undefined')
    return makeAppScale(BASE_WIDTH, BASE_HEIGHT)
  return makeAppScale(
    Math.min(window.innerWidth, MAX_COLUMN_WIDTH),
    window.innerHeight
  )
}

const AppScaleContext = createContext<AppScale>(
  makeAppScale(BASE_WIDTH, BASE_HEIGHT)
)

/** Measures the window and re-scales on resize and rotation. */
export function AppScaleProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<AppScale>(measure)
  useEffect(() => {
    const update = () => setScale(measure())
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])
  return (
    <AppScaleContext.Provider value={scale}>
      {children}
    </AppScaleContext.Provider>
  )
}

export function useAppScale(): AppScale {
  return useContext(AppScaleContext)
}
