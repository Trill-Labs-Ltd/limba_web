import { heroContent, features, betaContent, footerContent } from '../data'

describe('data', () => {
  describe('heroContent', () => {
    it('has all required fields', () => {
      expect(heroContent.badge).toBeDefined()
      expect(heroContent.headline).toBeDefined()
      expect(heroContent.highlightedText).toBeDefined()
      expect(heroContent.headlineContinued).toBeDefined()
      expect(heroContent.description).toBeDefined()
      expect(heroContent.ctaPrimary).toBeDefined()
      expect(heroContent.ctaSecondary).toBeDefined()
    })

    it('uses British spelling for personalised', () => {
      expect(heroContent.description).toContain('personalised')
      expect(heroContent.description).not.toContain('personalized')
    })

    it('has correct CTA text', () => {
      expect(heroContent.ctaPrimary).toBe('Join The Waiting List')
      expect(heroContent.ctaSecondary).toBe('Learn More')
    })
  })

  describe('features', () => {
    it('has exactly 3 features', () => {
      expect(features).toHaveLength(3)
    })

    it('has correct feature IDs', () => {
      const ids = features.map((f) => f.id)
      expect(ids).toEqual(['personalised', 'under-5-minutes', 'progress-that-sticks'])
    })

    it('all features have required fields', () => {
      features.forEach((feature) => {
        expect(feature.id).toBeDefined()
        expect(feature.icon).toBeDefined()
        expect(feature.title).toBeDefined()
        expect(feature.description).toBeDefined()
      })
    })

    it('has correct icon types', () => {
      const icons = features.map((f) => f.icon)
      expect(icons).toEqual(['sparkle', 'clock', 'trophy'])
    })

    it('uses British spelling in personalised feature', () => {
      const personalisedFeature = features.find((f) => f.id === 'personalised')
      expect(personalisedFeature?.title).toContain('Personalised')
      expect(personalisedFeature?.description).toContain('Limba')
    })
  })

  describe('betaContent', () => {
    it('has all required fields', () => {
      expect(betaContent.badge).toBeDefined()
      expect(betaContent.headline).toBeDefined()
      expect(betaContent.description).toBeDefined()
      expect(betaContent.cta).toBeDefined()
    })

    it('uses British spelling', () => {
      expect(betaContent.description).toContain('personalised')
    })

    it('has correct CTA text', () => {
      expect(betaContent.cta).toBe('Join The Waiting List')
    })

    it('mentions credentials', () => {
      expect(betaContent.description).toContain('Imperial College London')
      expect(betaContent.description).toContain('Stanford')
    })
  })

  describe('footerContent', () => {
    it('has tagline and copyright', () => {
      expect(footerContent.tagline).toBeDefined()
      expect(footerContent.copyright).toBeDefined()
    })

    it('includes current year in copyright', () => {
      expect(footerContent.copyright).toContain('2025')
    })

    it('tagline mentions expertise', () => {
      expect(footerContent.tagline).toContain('Imperial College London')
      expect(footerContent.tagline).toContain('Stanford')
    })
  })
})

