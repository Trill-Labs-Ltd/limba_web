import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '../Header'

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />)
    expect(screen.getByAltText(/limba logo/i)).toBeInTheDocument()
  })

  it('renders join waiting list button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /join.*waiting list/i })).toBeInTheDocument()
  })

  it('calls onJoinWaitlist when button is clicked', async () => {
    const mockOnJoinWaitlist = jest.fn()
    const user = userEvent.setup()

    render(<Header onJoinWaitlist={mockOnJoinWaitlist} />)

    const button = screen.getByRole('button', { name: /join.*waiting list/i })
    await user.click(button)

    expect(mockOnJoinWaitlist).toHaveBeenCalledTimes(1)
  })

  it('has sticky positioning', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    
    expect(header).toHaveClass('sticky')
    expect(header).toHaveClass('top-0')
  })

  it('has proper navigation role', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('shows full text on larger screens', () => {
    render(<Header />)
    const fullText = screen.getByText('Join The Waiting List')
    expect(fullText).toHaveClass('hidden')
    expect(fullText).toHaveClass('sm:inline')
  })

  it('shows shortened text on mobile', () => {
    render(<Header />)
    const shortText = screen.getByText('Join List')
    expect(shortText).toHaveClass('sm:hidden')
  })
})

