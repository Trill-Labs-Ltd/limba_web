# Supabase Setup for Limba Waitlist

This guide will help you set up Supabase for the waitlist functionality.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details
5. Wait for the project to be created

## 2. Create the `waitlist_signups` Table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create waitlist_signups table
CREATE TABLE waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  referral_code TEXT,
  referred_by_code TEXT,
  status TEXT DEFAULT 'waiting',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  confirmed_at TIMESTAMPTZ
);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist_signups(email);

-- Create index on status for filtering
CREATE INDEX idx_waitlist_status ON waitlist_signups(status);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for signups)
CREATE POLICY "Allow public inserts" 
ON waitlist_signups 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy to prevent public reads (optional - for privacy)
-- Remove this if you want to allow users to check if they're on the list
CREATE POLICY "Prevent public reads" 
ON waitlist_signups 
FOR SELECT 
TO anon 
USING (false);
```

## 3. Get Your Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (the long string under "Project API keys")
   - **service_role** key (the secret key - only use server-side!)

## 4. Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important**: 
- Never commit `.env.local` to version control!
- The service role key is used server-side in the API route to bypass RLS
- Keep your service role key secret - it has full database access

## 5. Install Dependencies

```bash
npm install
```

This will install `@supabase/supabase-js` which was added to `package.json`.

## 6. Test the Integration

1. Start your dev server:
```bash
npm run dev
```

2. Click any "Join Waiting List" button
3. Fill in the form with a test email
4. Submit the form
5. Check your Supabase dashboard to verify the entry was created

## Database Schema

The `waitlist_signups` table has the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `email` | TEXT | User's email address (unique) |
| `source` | TEXT | Where they signed up from (e.g., "header", "hero", "beta_section") |
| `referral_code` | TEXT | Code assigned to this user for sharing |
| `referred_by_code` | TEXT | Referral code they used to sign up |
| `status` | TEXT | Lifecycle stage (default: "waiting") |
| `notes` | TEXT | Internal notes |
| `created_at` | TIMESTAMPTZ | When they signed up |
| `confirmed_at` | TIMESTAMPTZ | When email was confirmed (if using double opt-in) |

## Security Notes

- The table uses Row Level Security (RLS)
- Public users can only INSERT (sign up)
- Public users cannot SELECT (view) entries
- Only authenticated Supabase users (admins) can view all entries
- Email addresses are stored as lowercase and trimmed

## Optional: Generate Referral Codes

If you want to automatically generate unique referral codes for each signup, add this SQL function:

```sql
-- Function to generate a random referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  done BOOLEAN := false;
BEGIN
  WHILE NOT done LOOP
    -- Generate a random code like "limba_abc123"
    code := 'limba_' || lower(substring(md5(random()::text) from 1 for 6));
    
    -- Check if it's unique
    IF NOT EXISTS (SELECT 1 FROM waitlist_signups WHERE referral_code = code) THEN
      done := true;
    END IF;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Add referral_code generation to the table
ALTER TABLE waitlist_signups 
ALTER COLUMN referral_code 
SET DEFAULT generate_referral_code();
```

## Implementation Details

### Server-Side vs Client-Side

The app uses two Supabase clients:

1. **Client-side** (`app/lib/supabase.ts`) - Uses anon key
   - For any future client-side operations
   - Respects RLS policies

2. **Server-side** (`app/lib/supabase-server.ts`) - Uses service role key
   - Used in the `/api/waitlist` route
   - Bypasses RLS for server operations
   - Never exposed to the browser

This is the recommended pattern for Next.js + Supabase applications.

## Troubleshooting

### "Failed to add to waiting list" error
- Check your environment variables are set correctly
- Verify you have BOTH the anon key AND service role key in `.env.local`
- Make sure you added `SUPABASE_SERVICE_ROLE_KEY` (not `NEXT_PUBLIC_`)
- Restart your dev server after adding environment variables

### "This email is already on the waitlist" 
- This is expected behavior - each email can only sign up once
- The unique constraint on the email column prevents duplicates

### Can't see entries in Supabase dashboard
- Make sure you're logged into Supabase
- Go to **Table Editor** → **waitlist_signups**
- If the table is empty, try submitting a test signup

## Next Steps

- Set up email notifications when someone joins the waitlist
- Create an admin dashboard to view and manage signups
- Implement email verification (double opt-in)
- Set up automated referral code sharing

