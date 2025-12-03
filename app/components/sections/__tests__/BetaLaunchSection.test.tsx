import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BetaLaunchSection } from '../BetaLaunchSection'

describe('BetaLaunchSection', () => {
  it('renders beta badge', () => {
    render(<BetaLaunchSection />)
    expect(screen.getByText(/beta launching soon/i)).toBeInTheDocument()
  })

  it('renders headline', () => {
    render(<BetaLaunchSection />)
    expect(
      screen.getByText(/your body deserves better than/i)
    ).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<BetaLaunchSection />)
    expect(
      screen.getByText(/join our beta waiting list and be among the first/i)
    ).toBeInTheDocument()
  })

  it('renders all benefit bullets', () => {
    render(<BetaLaunchSection />)
    
    expect(screen.getByText(/early access to the app/i)).toBeInTheDocument()
    expect(screen.getByText(/exclusive founding member benefits/i)).toBeInTheDocument()
    expect(screen.getByText(/help shape the product/i)).toBeInTheDocument()
  })

  it('renders phone mockup', () => {
    render(<BetaLaunchSection />)
    expect(screen.getByLabelText(/phone mockup/i)).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<BetaLaunchSection />)
    expect(
      screen.getByRole('button', { name: /join the waiting list/i })
    ).toBeInTheDocument()
  })

  it('calls onJoinWaitlist when CTA is clicked', async () => {
    const mockOnJoinWaitlist = jest.fn()
    const user = userEvent.setup()

    render(<BetaLaunchSection onJoinWaitlist={mockOnJoinWaitlist} />)

    const button = screen.getByRole('button', { name: /join.*waiting list/i })
    await user.click(button)

    expect(mockOnJoinWaitlist).toHaveBeenCalledTimes(1)
  })

  it('renders benefits as a list', () => {
    const { container } = render(<BetaLaunchSection />)
    const list = container.querySelector('ul[role="list"]')
    expect(list).toBeInTheDocument()
  })
})

