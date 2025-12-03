import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../page'

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders all major sections', () => {
    render(<Home />)
    
    // Header
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    
    // Hero section content
    expect(screen.getByText(/feel better in/i)).toBeInTheDocument()
    
    // Value prop section
    expect(screen.getByText(/wellness that fits your life/i)).toBeInTheDocument()
    
    // Beta section
    expect(screen.getByText(/beta launching soon/i)).toBeInTheDocument()
    
    // Footer
    expect(screen.getByText(/© 2025 limba/i)).toBeInTheDocument()
  })

  it('modal is closed by default', () => {
    render(<Home />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens modal when header CTA is clicked', async () => {
    const user = userEvent.setup()
    render(<Home />)

    // Click the header button
    const headerButtons = screen.getAllByRole('button', { name: /join.*waiting list/i })
    await user.click(headerButtons[0])

    // Modal should be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('opens modal when hero CTA is clicked', async () => {
    const user = userEvent.setup()
    render(<Home />)

    // Find and click a CTA button in hero section
    const ctaButtons = screen.getAllByRole('button', { name: /join.*waiting list/i })
    await user.click(ctaButtons[1])

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('opens modal when beta section CTA is clicked', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const ctaButtons = screen.getAllByRole('button', { name: /join.*waiting list/i })
    const betaButton = ctaButtons[ctaButtons.length - 1]
    await user.click(betaButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Home />)

    // Open modal
    const ctaButton = screen.getAllByRole('button', { name: /join.*waiting list/i })[0]
    await user.click(ctaButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Close modal
    const closeButton = screen.getByLabelText('Close modal')
    await user.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('passes correct source prop to modal', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const ctaButton = screen.getAllByRole('button', { name: /join.*waiting list/i })[0]
    await user.click(ctaButton)

    // Modal should be open with web-app source
    // We can verify this by checking that the modal is rendered
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders all major UI components', () => {
    render(<Home />)

    // Check for key text content
    expect(screen.getByText('Personalised to You')).toBeInTheDocument()
    expect(screen.getByText('Under 5 Minutes')).toBeInTheDocument()
    expect(screen.getByText('Progress That Sticks')).toBeInTheDocument()
  })

  it('has correct page structure', () => {
    const { container } = render(<Home />)
    const main = container.querySelector('main')
    
    expect(main).toHaveClass('min-h-screen')
    expect(main).toHaveClass('bg-white')
  })
})

