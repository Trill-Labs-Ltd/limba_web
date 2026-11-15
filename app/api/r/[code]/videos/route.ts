import { isValidShareCode, toPlayable } from '@/app/lib/sharedRoutine'
import { fetchSharedRoutine } from '@/app/lib/sharedRoutineApi'

/**
 * Fresh signed video URLs for the /r/<code> browser player. Signed URLs last
 * about an hour, so a tab left open longer asks here once. Returns only the
 * video fields. Each call counts a view on the backend, which is why the
 * player calls it at most once per tab.
 */
export const dynamic = 'force-dynamic'

const noStore = { 'Cache-Control': 'no-store' }

export async function GET(_request: Request, { params }: { params: { code: string } }) {
  if (!isValidShareCode(params.code)) {
    return Response.json({ videos: [] }, { status: 404, headers: noStore })
  }

  const routine = await fetchSharedRoutine(params.code)
  if (!routine) {
    return Response.json({ videos: [] }, { status: 404, headers: noStore })
  }

  const videos = toPlayable(routine.stretches).map(({ id, videoUrl, videoExpiresAt }) => ({
    id,
    videoUrl,
    videoExpiresAt,
  }))
  return Response.json({ videos }, { headers: noStore })
}
