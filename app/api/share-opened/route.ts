import { isBotUserAgent } from '@/app/lib/botUserAgent'
import { isValidShareCode } from '@/app/lib/sharedRoutine'

/**
 * Beacon from /r/<code>: tracks `routine_share_link_opened` in Mixpanel (EU).
 *
 * - Link-preview and crawler user agents are ignored, so only people count.
 * - Each event gets a random distinct_id: the web visitor is anonymous and we
 *   set no cookies. Attribution to an install happens in the app (AppsFlyer).
 * - No-op when MIXPANEL_PROJECT_TOKEN is unset (local dev, previews).
 *
 * Always answers 204 for a well-formed request, whether or not it was tracked.
 */

const MIXPANEL_TRACK_URL = 'https://api-eu.mixpanel.com/track?ip=0'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const noContent = () => new Response(null, { status: 204 })

export async function POST(request: Request) {
  if (isBotUserAgent(request.headers.get('user-agent'))) return noContent()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(null, { status: 400 })
  }

  const { code, sender_user_id } = (body ?? {}) as {
    code?: unknown
    sender_user_id?: unknown
  }
  if (!isValidShareCode(code)) return new Response(null, { status: 400 })

  const token = process.env.MIXPANEL_PROJECT_TOKEN
  if (!token) return noContent()

  const senderUserId =
    typeof sender_user_id === 'string' && UUID_RE.test(sender_user_id)
      ? sender_user_id
      : null

  try {
    const res = await fetch(MIXPANEL_TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/plain' },
      body: JSON.stringify([
        {
          event: 'routine_share_link_opened',
          properties: {
            token,
            distinct_id: crypto.randomUUID(),
            code,
            platform: 'web',
            sender_user_id: senderUserId,
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
