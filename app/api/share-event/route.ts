import { isBotUserAgent } from '@/app/lib/botUserAgent'
import { isValidShareCode } from '@/app/lib/sharedRoutine'

/**
 * Beacon from /r/<code>: tracks the web side of the share funnel in Mixpanel (EU):
 *   routine_share_link_opened — a person opened the page
 *   routine_share_completed   — they finished the routine in the browser player
 *
 * - Link-preview and crawler user agents are ignored, so only people count.
 * - distinct_id is the page's per-tab anonymous id (memory only, no cookies),
 *   so an open and a completion from the same tab join up. A missing or bad id
 *   gets a random one. Attribution to an install happens in the app (AppsFlyer).
 * - No-op when MIXPANEL_PROJECT_TOKEN is unset (local dev, previews).
 *
 * Always answers 204 for a well-formed request, whether or not it was tracked.
 */

const MIXPANEL_TRACK_URL = 'https://api-eu.mixpanel.com/track?ip=0'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const EVENTS = new Set(['routine_share_link_opened', 'routine_share_completed'])

const noContent = () => new Response(null, { status: 204 })

const uuidOrNull = (value: unknown): string | null =>
  typeof value === 'string' && UUID_RE.test(value) ? value : null

export async function POST(request: Request) {
  if (isBotUserAgent(request.headers.get('user-agent'))) return noContent()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(null, { status: 400 })
  }

  const { event, code, sender_user_id, distinct_id } = (body ?? {}) as {
    event?: unknown
    code?: unknown
    sender_user_id?: unknown
    distinct_id?: unknown
  }
  if (typeof event !== 'string' || !EVENTS.has(event)) return new Response(null, { status: 400 })
  if (!isValidShareCode(code)) return new Response(null, { status: 400 })

  const token = process.env.MIXPANEL_PROJECT_TOKEN
  if (!token) return noContent()


  try {
    const res = await fetch(MIXPANEL_TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/plain' },
      body: JSON.stringify([
        {
          event,
          properties: {
            token,
            distinct_id: uuidOrNull(distinct_id) ?? crypto.randomUUID(),
            code,
            platform: 'web',
            sender_user_id: uuidOrNull(sender_user_id),
          },
        },
      ]),
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error('Mixpanel track failed', res.status)
    }
  } catch (error) {
    console.error('Mixpanel track error', error)
  }

  return noContent()
}
