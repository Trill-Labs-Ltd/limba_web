import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeroSection } from '../HeroSection'

describe('HeroSection', () => {
  it('renders headline with highlighted text', () => {
    render(<HeroSection />)
    expect(screen.getByText(/feel better in/i)).toBeInTheDocument()
    expect(screen.getByText(/under 5 minutes/i)).toBeInTheDocument()
    expect(screen.getByText(/a day/i)).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<HeroSection />)
    expect(
      screen.getByText(/limba learns your unique aches and pains/i)
    ).toBeInTheDocument()
  })

  it('renders expert badge', () => {
    render(<HeroSection />)
    expect(
      screen.getByText(/built by stanford & imperial college experts/i)
    ).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /join the waiting list/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })

  it('calls onJoinWaitlist when primary CTA is clicked', async () => {
    const mockOnJoinWaitlist = jest.fn()
    const user = userEvent.setup()

    render(<HeroSection onJoinWaitlist={mockOnJoinWaitlist} />)

    const joinButton = screen.getByRole('button', { name: /join the waiting list/i })
    await user.click(joinButton)

    expect(mockOnJoinWaitlist).toHaveBeenCalledTimes(1)
  })

  it('renders social proof', () => {
    render(<HeroSection />)
    expect(screen.getByText(/500\+ early adopters waiting/i)).toBeInTheDocument()
  })

  it('renders phone mockup', () => {
    render(<HeroSection />)
    expect(screen.getByLabelText(/phone mockup/i)).toBeInTheDocument()
  })

  it('displays avatar placeholders', () => {
    const { container } = render(<HeroSection />)
    const avatars = container.querySelectorAll('[aria-label^="User"]')
    expect(avatars.length).toBe(4)
  })
})

