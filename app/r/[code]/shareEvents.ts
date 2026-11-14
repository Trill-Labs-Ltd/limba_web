/** Events the /r/<code> page reports to /api/share-event (Mixpanel, EU). */
export type ShareEvent = 'routine_share_link_opened' | 'routine_share_completed'

interface ShareEventPayload {
  code: string
  senderUserId: string | null
  /** Per-tab anonymous id, so an open and a completion can be joined. */
  distinctId: string | null
}

/** Fire and forget: analytics never surfaces an error to the visitor. */
export function sendShareEvent(event: ShareEvent, { code, senderUserId, distinctId }: ShareEventPayload): void {
  fetch('/api/share-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, code, sender_user_id: senderUserId, distinct_id: distinctId }),
    credentials: 'omit',
    keepalive: true,
  }).catch(() => {})
}
