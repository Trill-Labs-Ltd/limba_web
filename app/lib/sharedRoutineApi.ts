import { isValidShareCode, type ApiSharedRoutine } from './sharedRoutine'

/**
 * Server-side client for the backend's public shared-routine endpoint.
 *
 * Server only: the backend's CORS config does not allow getlimba.com, and each
 * call counts a view, so the browser never calls it directly. Used by the
 * /r/<code> page (once per request via React cache()) and by the video refresh
 * route.
 */

const DEFAULT_API_BASE_URL = 'https://api.getlimba.com'
const TIMEOUT_MS = 5000

export function apiBaseUrl(): string {
  return (process.env.API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '')
}

/**
 * The routine for a code, with stretch details and signed video URLs, or null
 * for a bad, unknown or expired code, a backend error or a timeout. Counts one
 * view on the backend.
 */
export async function fetchSharedRoutine(code: string): Promise<ApiSharedRoutine | null> {
  if (!isValidShareCode(code)) return null

  try {
    const res = await fetch(`${apiBaseUrl()}/api/v1/public/shared-routines/${code}`, {
      method: 'GET',
      // No Authorization header: the endpoint is public, and the backend
      // rejects an expired token even on public paths.
      headers: {
        Accept: 'application/json',
        // The site is English only; keep stretch names and steps in the same language.
        'Accept-Language': 'en-GB',
      },
      cache: 'no-store',
      signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(TIMEOUT_MS) : undefined,
    })
    if (res.status === 404) return null
    if (!res.ok) {
      console.error('Shared routine fetch failed', res.status)
      return null
    }
    const data = (await res.json()) as ApiSharedRoutine | null
    if (!data || !Array.isArray(data.stretches)) return null
    return data
  } catch (error) {
    console.error('Shared routine fetch error', error instanceof Error ? error.name : 'unknown')
    return null
  }
}
