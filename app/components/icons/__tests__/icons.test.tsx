import { render } from '@testing-library/react'
import { SparkleIcon, ClockIcon, TrophyIcon } from '../index'

describe('Icon Components', () => {
  describe('SparkleIcon', () => {
    it('renders without crashing', () => {
      const { container } = render(<SparkleIcon />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('applies className prop', () => {
      const { container } = render(<SparkleIcon className="custom-class" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('custom-class')
    })

    it('uses currentColor for stroke', () => {
      const { container } = render(<SparkleIcon />)
      const svg = container.querySelector('svg')
      expect(svg?.innerHTML).toContain('currentColor')
    })

    it('accepts additional SVG props', () => {
      const { container } = render(<SparkleIcon data-testid="sparkle" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('data-testid', 'sparkle')
    })
  })

  describe('ClockIcon', () => {
    it('renders without crashing', () => {
      const { container } = render(<ClockIcon />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('applies className prop', () => {
      const { container } = render(<ClockIcon className="custom-class" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('custom-class')
    })

    it('has proper viewBox', () => {
      const { container } = render(<ClockIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox')
    })
  })

  describe('TrophyIcon', () => {
    it('renders without crashing', () => {
      const { container } = render(<TrophyIcon />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('applies className prop', () => {
      const { container } = render(<TrophyIcon className="custom-class" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('custom-class')
    })

    it('has proper viewBox', () => {
      const { container } = render(<TrophyIcon />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox')
    })
  })

  describe('Icon consistency', () => {
    it('all icons accept className', () => {
      const icons = [SparkleIcon, ClockIcon, TrophyIcon]
      
      icons.forEach((Icon) => {
        const { container } = render(<Icon className="test-class" />)
        const svg = container.querySelector('svg')
        expect(svg).toHaveClass('test-class')
      })
    })

    it('all icons render as SVG elements', () => {
      const icons = [
        <SparkleIcon key="sparkle" />,
        <ClockIcon key="clock" />,
        <TrophyIcon key="trophy" />,
      ]

      icons.forEach((icon) => {
        const { container } = render(icon)
        expect(container.querySelector('svg')).toBeInTheDocument()
      })
    })
  })
})

