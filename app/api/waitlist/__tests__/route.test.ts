import { POST } from '../route'
import { NextRequest } from 'next/server'

// Mock the Supabase server client
jest.mock('@/app/lib/supabase-server', () => ({
  supabaseServer: {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(),
      })),
    })),
  },
}))

const { supabaseServer } = require('@/app/lib/supabase-server')

describe('POST /api/waitlist', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset the mock implementation
    supabaseServer.from.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn(),
      }),
    })
  })

  const createMockRequest = (body: any) => {
    return {
      json: async () => body,
    } as NextRequest
  }

  describe('validation', () => {
    it('returns 400 if email is missing', async () => {
      const request = createMockRequest({})
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Valid email is required')
    })

    it('returns 400 if email is invalid', async () => {
      const request = createMockRequest({ email: 'invalid-email' })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Valid email is required')
    })
  })

  describe('successful signup', () => {
    it('returns 201 and success data on successful insert', async () => {
      const mockData = {
        id: '123',
        email: 'test@example.com',
        source: 'web-app',
        status: 'waiting',
      }

      supabaseServer.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: [mockData],
            error: null,
          }),
        }),
      })

      const request = createMockRequest({
        email: 'test@example.com',
        source: 'web-app',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.message).toBe('Successfully added to waiting list!')
      expect(data.data).toEqual(mockData)
    })

    it('trims and lowercases email', async () => {
      let insertedData: any = null

      supabaseServer.from.mockReturnValue({
        insert: jest.fn((data) => {
          insertedData = data[0]
          return {
            select: jest.fn().mockResolvedValue({
              data: [{ ...data[0], id: '123' }],
              error: null,
            }),
          }
        }),
      })

      const request = createMockRequest({
        email: '  TEST@EXAMPLE.COM  ',
        source: 'web-app',
      })

      await POST(request)

      expect(insertedData.email).toBe('test@example.com')
    })

    it('uses default source if not provided', async () => {
      let insertedData: any = null

      supabaseServer.from.mockReturnValue({
        insert: jest.fn((data) => {
          insertedData = data[0]
          return {
            select: jest.fn().mockResolvedValue({
              data: [{ ...data[0], id: '123' }],
              error: null,
            }),
          }
        }),
      })

      const request = createMockRequest({
        email: 'test@example.com',
      })

      await POST(request)

      expect(insertedData.source).toBe('landing_page')
    })

    it('includes referral code when provided', async () => {
      let insertedData: any = null

      supabaseServer.from.mockReturnValue({
        insert: jest.fn((data) => {
          insertedData = data[0]
          return {
            select: jest.fn().mockResolvedValue({
              data: [{ ...data[0], id: '123' }],
              error: null,
            }),
          }
        }),
      })

      const request = createMockRequest({
        email: 'test@example.com',
        source: 'web-app',
        referredByCode: 'REF123',
      })

      await POST(request)

      expect(insertedData.referred_by_code).toBe('REF123')
    })
  })

  describe('error handling', () => {
    it('returns 409 for duplicate email', async () => {
      supabaseServer.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: null,
            error: { code: '23505', message: 'Duplicate key violation' },
          }),
        }),
      })

      const request = createMockRequest({
        email: 'existing@example.com',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.error).toBe('This email is already on the waiting list')
    })

    it('returns 500 for other database errors', async () => {
      supabaseServer.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: null,
            error: { code: 'OTHER_ERROR', message: 'Database error' },
          }),
        }),
      })

      const request = createMockRequest({
        email: 'test@example.com',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to add to waiting list')
    })

    it('returns 500 for unexpected errors', async () => {
      const request = {
        json: async () => {
          throw new Error('Unexpected error')
        },
      } as NextRequest

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })

  describe('data integrity', () => {
    it('sets status to waiting for all signups', async () => {
      let insertedData: any = null

      supabaseServer.from.mockReturnValue({
        insert: jest.fn((data) => {
          insertedData = data[0]
          return {
            select: jest.fn().mockResolvedValue({
              data: [{ ...data[0], id: '123' }],
              error: null,
            }),
          }
        }),
      })

      const request = createMockRequest({
        email: 'test@example.com',
      })

      await POST(request)

      expect(insertedData.status).toBe('waiting')
    })

    it('handles null referral code correctly', async () => {
      let insertedData: any = null

      supabaseServer.from.mockReturnValue({
        insert: jest.fn((data) => {
          insertedData = data[0]
          return {
            select: jest.fn().mockResolvedValue({
              data: [{ ...data[0], id: '123' }],
              error: null,
            }),
          }
        }),
      })

      const request = createMockRequest({
        email: 'test@example.com',
        referredByCode: '',
      })

      await POST(request)

      expect(insertedData.referred_by_code).toBeNull()
    })
  })
})

