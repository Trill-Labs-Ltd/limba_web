import { existsSync } from 'fs'
import { join } from 'path'
import { normalizeStretchKey, stretchIconUrl } from '../stretchIcons'

/** Same lookup order as the app: library id, then name, alias, prefix match. */
describe('stretchIconUrl', () => {
  it('uses the library id first', () => {
    expect(stretchIconUrl({ id: 'cd0ecfae-50a5-4eee-9990-873106a21047', name: 'Anything' })).toBe(
      '/stretch-icons/hamstring_scoops.webp'
    )
  })

  it('falls back to the name, its alias, then a prefix match', () => {
    expect(stretchIconUrl({ id: 'unknown', name: 'Downward Dog' })).toBe('/stretch-icons/downward_dog.webp')
    expect(stretchIconUrl({ name: "Child's Pose (Lumbar Soften)" })).toBe('/stretch-icons/child_pose.webp')
    expect(stretchIconUrl({ name: 'Bird Dog' })).toBe('/stretch-icons/birddog.webp')
    expect(stretchIconUrl({ name: 'Ankle Dorsiflexion Knee-to-Wall' })).toBe('/stretch-icons/ankle_dorsiflexion.webp')
  })

  it('returns null when there is no illustration', () => {
    expect(stretchIconUrl({ id: 'nope', name: 'Zz' })).toBeNull()
    expect(stretchIconUrl({})).toBeNull()
  })

  it('normalises names like the app', () => {
    expect(normalizeStretchKey('90/90 Hip Stretch')).toBe('90_90_hip_stretch')
    expect(normalizeStretchKey('Cat–Cow (Lumbar Focus)')).toBe('cat_cow')
  })

  it('every mapped illustration exists in /public', () => {
    const ids = [
      'cd0ecfae-50a5-4eee-9990-873106a21047',
      '7d826b8f-bfad-4693-9de6-f1a65634d22c', // pyramid pose (file renamed from pyramind_pose)
      '4e7008aa-bbce-4112-b5ae-9ccdcfe4275e', // seiza pose (was a JPEG in the app)
    ]
    for (const id of ids) {
      const url = stretchIconUrl({ id })
      expect(url).not.toBeNull()
      expect(existsSync(join(process.cwd(), 'public', url!))).toBe(true)
    }
  })
})
