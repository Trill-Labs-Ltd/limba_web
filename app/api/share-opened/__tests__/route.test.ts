/**
 * @jest-environment node
 */
import { POST } from '../route'

/**
 * /api/share-opened — the beacon behind routine_share_link_opened. Link-preview
 * bots fetch every shared link, so letting them through would inflate opens.
 * We validate:
 * - bot / missing user agents are ignored (no Mixpanel call)
 * - real browsers are tracked with the right payload
 * - bad codes are rejected and an unset token is a no-op
 */
const CHROME_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
const SENDER = '3f1c2b4a-1d2e-4f5a-8b9c-0d1e2f3a4b5c'

function makeRequest(body: unknown, userAgent: string | null = CHROME_UA) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (userAgent !== null) headers['User-Agent'] = userAgent
  return new Request('https://getlimba.com/api/share-opened', {
    method: 'POST',
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

describe('POST /api/share-opened', () => {
  const originalFetch = global.fetch
  const originalToken = process.env.MIXPANEL_PROJECT_TOKEN
  let fetchMock: jest.Mock

  beforeEach(() => {
    process.env.MIXPANEL_PROJECT_TOKEN = 'test-token'
    fetchMock = jest.fn().mockResolvedValue(new Response('1', { status: 200 }))
    global.fetch = fetchMock as unknown as typeof fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    if (originalToken === undefined) delete process.env.MIXPANEL_PROJECT_TOKEN
    else process.env.MIXPANEL_PROJECT_TOKEN = originalToken
    jest.restoreAllMocks()
  })

  it.each([
    ['WhatsApp', 'WhatsApp/2.23.20.0 A'],
    ['Facebook', 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'],
    ['Twitter', 'Twitterbot/1.0'],
    ['Slack', 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)'],
    ['Telegram', 'TelegramBot (like TwitterBot)'],
    ['Discord', 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)'],
    ['Google', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
    ['Bing', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'],
    ['generic crawler', 'SomeCrawler/1.0'],
    ['generic spider', 'Baiduspider'],
    ['generic preview', 'LinkPreview/3.0'],
  ])('ignores %s', async (_name, ua) => {
    const res = await POST(makeRequest({ code: 'abc1234', sender_user_id: SENDER }, ua))
    expect(res.status).toBe(204)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('ignores a request with no user agent', async () => {
    const res = await POST(makeRequest({ code: 'abc1234' }, null))
    expect(res.status).toBe(204)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('tracks a real browser open in Mixpanel EU', async () => {
    const res = await POST(makeRequest({ code: 'abc1234', sender_user_id: SENDER }))
    expect(res.status).toBe(204)
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, init] = fetchMock.mock.calls[0]
    expect(String(url)).toMatch(/^https:\/\/api-eu\.mixpanel\.com\/track/)
    expect(init.method).toBe('POST')
    const [event] = JSON.parse(init.body)
    expect(event.event).toBe('routine_share_link_opened')
    expect(event.properties).toEqual({
      token: 'test-token',
      distinct_id: expect.stringMatching(/^[0-9a-f-]{36}$/),
      code: 'abc1234',
      platform: 'web',
      sender_user_id: SENDER,
    })
  })

  it('uses a fresh distinct_id per request', async () => {
    await POST(makeRequest({ code: 'abc1234' }))
    await POST(makeRequest({ code: 'abc1234' }))
    const ids = fetchMock.mock.calls.map(
      ([, init]) => JSON.parse(init.body)[0].properties.distinct_id
    )
    expect(ids[0]).not.toBe(ids[1])
  })

  it('drops a sender id that is not a uuid', async () => {
    await POST(makeRequest({ code: 'abc1234', sender_user_id: 'not-a-uuid' }))
    const [, init] = fetchMock.mock.calls[0]
    expect(JSON.parse(init.body)[0].properties.sender_user_id).toBeNull()
  })

  it.each([['abc123'], ['abc-1234'], [42], [undefined]])(
    'rejects code %p',
    async (code) => {
      const res = await POST(makeRequest({ code }))
      expect(res.status).toBe(400)
      expect(fetchMock).not.toHaveBeenCalled()
    }
  )

  it('rejects a body that is not JSON', async () => {
    const res = await POST(makeRequest('not json'))
    expect(res.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('is a no-op when the Mixpanel token is unset', async () => {
    delete process.env.MIXPANEL_PROJECT_TOKEN
    const res = await POST(makeRequest({ code: 'abc1234' }))
    expect(res.status).toBe(204)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('still answers 204 when Mixpanel is down', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    fetchMock.mockRejectedValueOnce(new Error('network'))
    const res = await POST(makeRequest({ code: 'abc1234' }))
    expect(res.status).toBe(204)
  })
})
