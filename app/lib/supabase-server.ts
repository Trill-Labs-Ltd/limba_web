import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client with elevated permissions
// ONLY use in API routes - never import in client components
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role - bypasses RLS
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

