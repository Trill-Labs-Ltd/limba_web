/**
 * Front and back body map with the target muscles lit up in teal, ported from
 * limba_mobile src/components/common/MuscleMap.tsx and constants/muscleMap.ts.
 * The app picks the figure from the user's profile; a link recipient has no
 * profile, so the web uses the female figure. Renders nothing when none of the
 * muscles has a layer.
 */

import { useAppScale } from './appScale'

const FRONT_LAYERS = new Set([
  'chest',
  'shoulders',
  'core',
  'hips',
  'quads',
  'knees',
  'hip_adductors',
  'hip_abductors',
  'ankles',
  'elbows',
  'tibialis_anterior',
])
const BACK_LAYERS = new Set([
  'neck',
  'upper_back',
  'lower_back',
  'glutes',
  'hamstrings',
  'calves',
])

/** Muscle values (as used in the stretches table) drawn with another muscle's layer. */
const ALIASES: Record<string, string> = {
  hip_flexors: 'hips',
  adductors: 'hip_adductors',
  groin: 'hip_adductors',
  abductors: 'hip_abductors',
  vmo: 'quads',
  lats: 'upper_back',
  abdominals: 'core',
  obliques: 'core',
  proprioception: 'ankles',
}

/** Map layer key for a muscle value ('Upper Back', 'groin'), if it has one. */
export function getMuscleMapKey(
  value: string | null | undefined
): string | undefined {
  if (!value) return undefined
  const key = value
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
  const resolved = ALIASES[key] ?? key
  return FRONT_LAYERS.has(resolved) || BACK_LAYERS.has(resolved)
    ? resolved
    : undefined
}

const FIGURE_ASPECT = 240 / 400

const VIEWS = [
  { view: 'front', label: 'Front', layers: FRONT_LAYERS },
  { view: 'back', label: 'Back', layers: BACK_LAYERS },
] as const

export function MuscleMap({ muscles }: { muscles: string[] }) {
  const { s, vs, ms } = useAppScale()
  const keys = Array.from(
    new Set(muscles.map(getMuscleMapKey).filter((k): k is string => !!k))
  )
  if (keys.length === 0) return null

  // The app's MuscleMap: figureHeight = verticalScale(104), 240x400 artwork.
  const figureHeight = vs(104)
  const figure = { width: figureHeight * FIGURE_ASPECT, height: figureHeight }

  return (
    <div
      className="flex shrink-0 bg-white"
      style={{
        gap: s(4),
        paddingTop: vs(8),
        paddingBottom: vs(8),
        paddingLeft: s(8),
        paddingRight: s(8),
        borderRadius: s(16),
      }}
      aria-hidden="true"
    >
      {VIEWS.map(({ view, label, layers }) => (
        <div
          key={view}
          className="flex flex-col items-center"
          style={{ gap: vs(2) }}
        >
          <div className="relative" style={figure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/muscle-map/female/${view}/base.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
            />
            {keys
              .filter((key) => layers.has(key))
              .map((key) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={key}
                  src={`/muscle-map/female/${view}/${key}.png`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ))}
          </div>
          <span
            className="font-bold uppercase text-[#666666]"
            style={{ fontSize: ms(9), letterSpacing: 0.6 }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
