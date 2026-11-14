'use client'

import { useEffect, useRef } from 'react'

interface ShareOpenedBeaconProps {
  code: string
  senderUserId: string | null
}

/**
 * Tells /api/share-opened that a person (not a link-preview bot) opened a
 * shared-routine page. Runs once on mount; the ref stops React Strict Mode's
 * double effect in dev from sending twice. No cookies, no response handling.
 */
export function ShareOpenedBeacon({ code, senderUserId }: ShareOpenedBeaconProps) {
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current) return
    sent.current = true
    fetch('/api/share-opened', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, sender_user_id: senderUserId }),
      credentials: 'omit',
      keepalive: true,
    }).catch(() => {
      // Analytics only; never surface an error to the visitor.
    })
  }, [code, senderUserId])

  return null
}
