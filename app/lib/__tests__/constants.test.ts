import { APP_NAME, ROUTES, SOCIAL_PROOF_COUNT, TAILWIND_CLASSES } from '../constants'

describe('constants', () => {
  describe('APP_NAME', () => {
    it('is defined as Limba', () => {
      expect(APP_NAME).toBe('Limba')
    })
  })

  describe('ROUTES', () => {
    it('has home route', () => {
      expect(ROUTES.home).toBe('/')
    })

    it('is immutable', () => {
      expect(Object.isFrozen(ROUTES)).toBe(true)
    })
  })

  describe('SOCIAL_PROOF_COUNT', () => {
    it('has correct format', () => {
      expect(SOCIAL_PROOF_COUNT).toBe('500+')
    })
  })

  describe('TAILWIND_CLASSES', () => {
    it('has container classes', () => {
      expect(TAILWIND_CLASSES.container).toContain('container')
      expect(TAILWIND_CLASSES.container).toContain('mx-auto')
    })

    it('has button base classes', () => {
      expect(TAILWIND_CLASSES.button.base).toContain('font-medium')
      expect(TAILWIND_CLASSES.button.base).toContain('rounded-full')
    })

    it('has button variant classes', () => {
      expect(TAILWIND_CLASSES.button.primary).toContain('bg-teal-500')
      expect(TAILWIND_CLASSES.button.secondary).toContain('border-2')
    })

    it('has button size classes', () => {
      expect(TAILWIND_CLASSES.button.sizes.sm).toBeDefined()
      expect(TAILWIND_CLASSES.button.sizes.md).toBeDefined()
      expect(TAILWIND_CLASSES.button.sizes.lg).toBeDefined()
    })

    it('has section classes', () => {
      expect(TAILWIND_CLASSES.section.base).toBe('w-full')
      expect(TAILWIND_CLASSES.section.padding).toContain('py-16')
    })

    it('is immutable', () => {
      expect(Object.isFrozen(TAILWIND_CLASSES)).toBe(true)
    })
  })
})

