import { render, screen } from '@testing-library/react'
import { ValuePropSection } from '../ValuePropSection'

describe('ValuePropSection', () => {
  it('renders section title', () => {
    render(<ValuePropSection />)
    expect(screen.getByText(/wellness that fits your life/i)).toBeInTheDocument()
  })

  it('renders section description', () => {
    render(<ValuePropSection />)
    expect(
      screen.getByText(/designed for people who don't have time/i)
    ).toBeInTheDocument()
  })

  it('renders all three feature cards', () => {
    render(<ValuePropSection />)
    
    expect(screen.getByText('Personalised to You')).toBeInTheDocument()
    expect(screen.getByText('Under 5 Minutes')).toBeInTheDocument()
    expect(screen.getByText('Progress That Sticks')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<ValuePropSection />)
    
    expect(screen.getByText(/tell us where it hurts/i)).toBeInTheDocument()
    expect(screen.getByText(/no gym required/i)).toBeInTheDocument()
    expect(screen.getByText(/watch your playful avatar evolve/i)).toBeInTheDocument()
  })

  it('renders icons for each feature', () => {
    const { container } = render(<ValuePropSection />)
    
    // Each feature card should have an icon
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThanOrEqual(3)
  })

  it('has proper section styling', () => {
    const { container } = render(<ValuePropSection />)
    const section = container.querySelector('section')
    
    expect(section).toHaveClass('bg-gray-50')
  })
})

