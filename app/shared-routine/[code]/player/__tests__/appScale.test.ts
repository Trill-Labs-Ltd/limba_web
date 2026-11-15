import {
  BASE_HEIGHT,
  BASE_WIDTH,
  makeAppScale,
  scaleForWindow,
} from '../appScale'

/** Same maths as limba_mobile src/utils/responsive.ts. */
describe('makeAppScale', () => {
  it('is 1:1 on the app’s design size (iPhone 14 Pro, 393 x 852)', () => {
    const { s, vs, ms } = makeAppScale(BASE_WIDTH, BASE_HEIGHT)
    expect(s(110)).toBe(110)
    expect(vs(260)).toBe(260)
    expect(ms(13)).toBe(13)
  })

  it('scales widths by width, heights by height and fonts half way', () => {
    // iPhone 15 Pro Max width with a browser's visible height.
    const { s, vs, ms, height } = makeAppScale(430, 739)
    expect(s(393)).toBeCloseTo(430)
    expect(vs(852)).toBeCloseTo(739)
    // moderateScale(20): 20 + (20 * 430 / 393 - 20) * 0.5
    expect(ms(20)).toBeCloseTo(20 + (20 * (430 / 393) - 20) * 0.5)
    expect(height).toBe(739)
  })

  it('shrinks on a small phone', () => {
    const { s, ms } = makeAppScale(320, 568)
    expect(s(44)).toBeLessThan(44)
    expect(ms(16)).toBeLessThan(16)
    expect(ms(16)).toBeGreaterThan(s(16))
  })

  it('caps the column at 430 px and the height at phone proportions', () => {
    // A tall desktop window: 430 wide column, 1380 px high.
    const { s, vs, height } = scaleForWindow(1440, 1380)
    expect(s(393)).toBeCloseTo(430)
    expect(height).toBeCloseTo(430 * (852 / 393))
    expect(vs(56)).toBeCloseTo(56 * (430 / 393))
  })
})
