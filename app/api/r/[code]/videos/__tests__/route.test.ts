/**
 * @jest-environment node
 */
import { GET } from '../route'
import { fetchSharedRoutine } from '@/app/lib/sharedRoutineApi'

jest.mock('@/app/lib/sharedRoutineApi', () => ({ fetchSharedRoutine: jest.fn() }))

/**
 * /api/r/<code>/videos — fresh signed video URLs for a long-open player tab.
 * It must return only the video fields and never be cached.
 */
const fetchMock = fetchSharedRoutine as jest.MockedFunction<typeof fetchSharedRoutine>

const get = (code: string) => GET(new Request(`https://getlimba.com/api/r/${code}/videos`), { params: { code } })

describe('GET /api/r/[code]/videos', () => {
  afterEach(() => fetchMock.mockReset())

  it('returns only id and video fields, uncached', async () => {
    fetchMock.mockResolvedValueOnce({
      code: 'Xk3p9Qa',
      sender_name: 'Toju',
      sender_id: null,
      dropped_count: 0,
      stretches: [
        {
          d: 30,
          x: 1,
          stretch: { id: 's1', name: 'Neck', reps: null, target_muscles: ['neck'], instructions: 'a || b' },
          video_url: 'https://cdn.getlimba.com/n.mp4?sig',
          video_expires_at: 1_900_000_000,
        },
      ],
    })

    const res = await get('Xk3p9Qa')

    expect(res.status).toBe(200)
    expect(res.headers.get('Cache-Control')).toBe('no-store')
    await expect(res.json()).resolves.toEqual({
      videos: [{ id: 's1', videoUrl: 'https://cdn.getlimba.com/n.mp4?sig', videoExpiresAt: 1_900_000_000 }],
    })
  })

  it('404s an unknown or expired code', async () => {
    fetchMock.mockResolvedValueOnce(null)
    const res = await get('Xk3p9Qa')
    expect(res.status).toBe(404)
  })

  it('404s a badly formed code without calling the backend', async () => {
    const res = await get('nope')
    expect(res.status).toBe(404)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
