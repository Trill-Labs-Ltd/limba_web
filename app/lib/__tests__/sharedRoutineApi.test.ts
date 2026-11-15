/**
 * @jest-environment node
 */
import { apiBaseUrl, fetchSharedRoutine } from '../sharedRoutineApi'

/**
 * fetchSharedRoutine — the page's only data source for /r/<code>. It must call
 * the public endpoint without auth, in English, never cached, and turn every
 * failure into null (the page then shows the friendly not-found page).
 */
const ROUTINE = {
  code: 'Xk3p9Qa',
  sender_name: 'Toju',
  sender_id: '3f1c2b4a-1d2e-4f5a-8b9c-0d1e2f3a4b5c',
  dropped_count: 0,
  stretches: [{ d: 30, x: 1, stretch: { id: 's1', name: 'Neck', reps: null, target_muscles: [], instructions: null }, video_url: null, video_expires_at: null }],
}

describe('fetchSharedRoutine', () => {
  const originalFetch = global.fetch
  const originalBase = process.env.API_BASE_URL
  let fetchMock: jest.Mock

  beforeEach(() => {
    delete process.env.API_BASE_URL
    fetchMock = jest.fn().mockResolvedValue(Response.json(ROUTINE))
    global.fetch = fetchMock as unknown as typeof fetch
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    global.fetch = originalFetch
    if (originalBase === undefined) delete process.env.API_BASE_URL
    else process.env.API_BASE_URL = originalBase
    jest.restoreAllMocks()
  })

  it('calls the public endpoint in English, uncached and without auth', async () => {
    await expect(fetchSharedRoutine('Xk3p9Qa')).resolves.toEqual(ROUTINE)

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.getlimba.com/api/v1/public/shared-routines/Xk3p9Qa')
    expect(init.cache).toBe('no-store')
    expect(init.headers).toEqual({ Accept: 'application/json', 'Accept-Language': 'en-GB' })
    expect(init.headers).not.toHaveProperty('Authorization')
    expect(init.signal).toBeDefined()
  })

  it('uses API_BASE_URL without a trailing slash', async () => {
    process.env.API_BASE_URL = 'https://staging-api.getlimba.com/'
    expect(apiBaseUrl()).toBe('https://staging-api.getlimba.com')
    await fetchSharedRoutine('Xk3p9Qa')
    expect(fetchMock.mock.calls[0][0]).toBe('https://staging-api.getlimba.com/api/v1/public/shared-routines/Xk3p9Qa')
  })

  it('does not call the backend for a badly formed code', async () => {
    await expect(fetchSharedRoutine('nope')).resolves.toBeNull()
    await expect(fetchSharedRoutine('../../x')).resolves.toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns null for an unknown or expired code (404)', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 404 }))
    await expect(fetchSharedRoutine('Xk3p9Qa')).resolves.toBeNull()
    expect(console.error).not.toHaveBeenCalled()
  })

  it('returns null and logs on a server error', async () => {
    fetchMock.mockResolvedValueOnce(new Response('oops', { status: 502 }))
    await expect(fetchSharedRoutine('Xk3p9Qa')).resolves.toBeNull()
    expect(console.error).toHaveBeenCalledWith('Shared routine fetch failed', 502)
  })

  it('returns null on a timeout or network error', async () => {
    fetchMock.mockRejectedValueOnce(Object.assign(new Error('timed out'), { name: 'TimeoutError' }))
    await expect(fetchSharedRoutine('Xk3p9Qa')).resolves.toBeNull()
    expect(console.error).toHaveBeenCalledWith('Shared routine fetch error', 'TimeoutError')
  })

  it('returns null for an unexpected body', async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ hello: 'world' }))
    await expect(fetchSharedRoutine('Xk3p9Qa')).resolves.toBeNull()
  })
})
