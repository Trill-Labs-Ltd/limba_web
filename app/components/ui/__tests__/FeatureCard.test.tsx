import { render, screen } from '@testing-library/react'
import { FeatureCard } from '../FeatureCard'

describe('FeatureCard', () => {
  const mockIcon = <span data-testid="mock-icon">🎯</span>

  it('renders title and description', () => {
    render(
      <FeatureCard
        icon={mockIcon}
        title="Test Feature"
        description="This is a test description"
      />
    )

    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('This is a test description')).toBeInTheDocument()
  })

  it('renders icon', () => {
    render(
      <FeatureCard
        icon={mockIcon}
        title="Feature"
        description="Description"
      />
    )

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('applies semantic HTML structure', () => {
    render(
      <FeatureCard
        icon={mockIcon}
        title="Feature Title"
        description="Feature Description"
      />
    )

    const title = screen.getByText('Feature Title')
    expect(title.tagName).toBe('H3')
  })

  it('renders with proper styling classes', () => {
    const { container } = render(
      <FeatureCard
        icon={mockIcon}
        title="Title"
        description="Description"
      />
    )

    const card = container.firstChild
    expect(card).toHaveClass('bg-white')
    expect(card).toHaveClass('rounded-2xl')
    expect(card).toHaveClass('shadow-md')
  })
})

