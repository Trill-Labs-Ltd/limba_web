import { render, screen } from '@testing-library/react'
import { PhoneMockup } from '../PhoneMockup'

describe('PhoneMockup', () => {
  it('renders hero variant correctly', () => {
    render(<PhoneMockup variant="hero" />)
    
    // Check for hero-specific content
    expect(screen.getByText('Get Relief')).toBeInTheDocument()
    expect(screen.getByText('Daily Streak')).toBeInTheDocument()
    expect(screen.getByText('3 days')).toBeInTheDocument()
  })

  it('renders beta variant correctly', () => {
    render(<PhoneMockup variant="beta" />)
    
    // Check for beta-specific content
    expect(screen.getByText('Get Your Session')).toBeInTheDocument()
  })

  it('displays completion badge in both variants', () => {
    const { rerender } = render(<PhoneMockup variant="hero" />)
    expect(screen.getByText('✓ Completed')).toBeInTheDocument()

    rerender(<PhoneMockup variant="beta" />)
    expect(screen.getByText('✓ Completed')).toBeInTheDocument()
  })

  it('has proper ARIA label', () => {
    render(<PhoneMockup variant="hero" />)
    expect(screen.getByLabelText('Phone mockup displaying Limba app interface')).toBeInTheDocument()
  })

  it('renders with phone frame styling', () => {
    const { container } = render(<PhoneMockup variant="hero" />)
    const phoneFrame = container.querySelector('[aria-label="Phone mockup displaying Limba app interface"]')
    
    expect(phoneFrame).toHaveClass('bg-gray-900')
    expect(phoneFrame).toHaveClass('rounded-3xl')
  })
})

