import { ImageResponse } from 'next/og'

// Static on purpose: no data fetch, so a link preview (WhatsApp, iMessage, …)
// doesn't call get_shared_routine and count another view.
export const alt = 'A stretch routine shared on Limba'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand colours from tailwind.config.ts (teal scale).
const TEAL_50 = '#f0fdfa'
const TEAL_500 = '#14b8a6'
const TEAL_700 = '#0f766e'
const TEAL_900 = '#134e4a'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: `linear-gradient(135deg, ${TEAL_50} 0%, #ffffff 60%)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 44,
            fontWeight: 700,
            color: TEAL_500,
            letterSpacing: '-0.02em',
            marginBottom: 40,
          }}
        >
          Limba
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 700,
            color: TEAL_900,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          A stretch routine was shared with you
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: TEAL_700,
            marginTop: 32,
          }}
        >
          Open it in the Limba app. Free to try.
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 16,
            background: TEAL_500,
          }}
        />
      </div>
    ),
    size
  )
}
