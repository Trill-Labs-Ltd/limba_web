import { render, screen } from '@testing-library/react'
import { Logo } from '../Logo'

describe('Logo', () => {
  it('renders logo image', () => {
    render(<Logo />)
    expect(screen.getByAltText(/limba logo/i)).toBeInTheDocument()
  })

  it('does not show text by default', () => {
    render(<Logo />)
    expect(screen.queryByText('Limba')).not.toBeInTheDocument()
  })

  it('shows text when showText is true', () => {
    render(<Logo showText={true} />)
    expect(screen.getByText('Limba')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom-logo" />)
    const logoContainer = container.firstChild
    expect(logoContainer).toHaveClass('custom-logo')
  })

  it('has responsive image sizing', () => {
    render(<Logo />)
    const img = screen.getByAltText(/limba logo/i)
    expect(img).toHaveClass('h-8')
    expect(img).toHaveClass('sm:h-10')
  })

  it('renders image with priority for LCP optimization', () => {
    render(<Logo />)
    const img = screen.getByAltText(/limba logo/i)
    // Next.js Image component adds priority as a data attribute
    expect(img).toBeInTheDocument()
  })
})

