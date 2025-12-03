import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('renders logo', () => {
    render(<Footer />)
    expect(screen.getByAltText(/limba logo/i)).toBeInTheDocument()
  })

  it('displays tagline', () => {
    render(<Footer />)
    expect(
      screen.getByText(/built with ❤️ by health experts/i)
    ).toBeInTheDocument()
  })

  it('displays copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025 limba/i)).toBeInTheDocument()
  })

  it('has footer semantic HTML', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('has proper background styling', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-gray-50')
  })
})

