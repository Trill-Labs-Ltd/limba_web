import { render, screen } from '@testing-library/react'
import { Badge } from '../Badge'

describe('Badge', () => {
  it('renders with children text', () => {
    render(<Badge>New Feature</Badge>)
    expect(screen.getByText('New Feature')).toBeInTheDocument()
  })

  it('renders with icon when provided', () => {
    const icon = <span data-testid="test-icon">✨</span>
    render(<Badge icon={icon}>With Icon</Badge>)
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('renders without icon when not provided', () => {
    render(<Badge>Without Icon</Badge>)
    expect(screen.getByText('Without Icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Badge</Badge>)
    const badge = screen.getByText('Badge').parentElement
    expect(badge).toHaveClass('custom-badge')
  })

  it('applies default styles', () => {
    render(<Badge>Default Badge</Badge>)
    const badge = screen.getByText('Default Badge').parentElement
    expect(badge).toHaveClass('inline-flex')
    expect(badge).toHaveClass('items-center')
    expect(badge).toHaveClass('gap-2')
  })
})

