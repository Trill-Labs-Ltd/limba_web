import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WaitlistModal } from '../WaitlistModal'

// Mock fetch
global.fetch = jest.fn()

describe('WaitlistModal', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('does not render when isOpen is false', () => {
    render(<WaitlistModal isOpen={false} onClose={mockOnClose} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('closes when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)

    const closeButton = screen.getByLabelText('Close modal')
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('closes when backdrop is clicked', async () => {
    const user = userEvent.setup()
    render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)

    const backdrop = screen.getByRole('dialog')
    await user.click(backdrop)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when modal content is clicked', async () => {
    const user = userEvent.setup()
    render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.click(emailInput)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('submits form with email and source', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Added to waiting list' }),
    })

    render(<WaitlistModal isOpen={true} onClose={mockOnClose} source="web-app" />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'test@example.com')

    const submitButton = screen.getByRole('button', { name: /join the waiting list/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          source: 'web-app',
          referredByCode: undefined,
        }),
      })
    })
  })

  it('submits form with email and referral code', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/referral code/i), 'REF123')

    await user.click(screen.getByRole('button', { name: /join the waiting list/i }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/waitlist',
        expect.objectContaining({
          body: expect.stringContaining('REF123'),
        })
      )
    })
  })

  it('displays error message on failed submission', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email already exists' }),
    })

    render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)

    await user.type(screen.getByLabelText(/email/i), 'existing@example.com')
    await user.click(screen.getByRole('button', { name: /join the waiting list/i }))

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument()
    })
  })

  it('shows success state and closes after 2 seconds', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ delay: null })
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /join the waiting list/i }))

    await waitFor(() => {
      expect(screen.getByText(/thank you for joining/i)).toBeInTheDocument()
    })

    jest.advanceTimersByTime(2000)

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })

    jest.useRealTimers()
  })

  it('disables submit button while loading', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    )

    render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    
    const submitButton = screen.getByRole('button', { name: /join the waiting list/i })
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
  })

  it('resets form when modal reopens', () => {
    const { rerender } = render(<WaitlistModal isOpen={true} onClose={mockOnClose} />)
    
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    userEvent.type(emailInput, 'test@example.com')

    rerender(<WaitlistModal isOpen={false} onClose={mockOnClose} />)
    rerender(<WaitlistModal isOpen={true} onClose={mockOnClose} />)

    expect(emailInput.value).toBe('')
  })
})

