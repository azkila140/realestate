-- ============================================================================
-- EMAIL SUBSCRIBERS TABLE - Exit Intent Marketing
-- ============================================================================
-- Purpose: Capture email leads from exit-intent popup
-- Tech Stack: Supabase (PostgreSQL) + Row Level Security
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_subscribers (
  -- Primary Identifiers
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Subscriber Information
  email TEXT UNIQUE NOT NULL,
  
  -- Tracking
  source TEXT DEFAULT 'exit_intent' CHECK (source IN ('exit_intent', 'newsletter', 'footer', 'popup')),
  page_url TEXT,
  user_agent TEXT,
  
  -- Engagement
  is_active BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Constraints
  CONSTRAINT email_subscribers_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_created_at ON email_subscribers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_source ON email_subscribers(source);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_active ON email_subscribers(is_active) WHERE is_active = true;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (for email capture)
DROP POLICY IF EXISTS "Allow public email subscription" ON email_subscribers;
CREATE POLICY "Allow public email subscription" ON email_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view all subscribers
DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON email_subscribers;
CREATE POLICY "Authenticated users can view subscribers" ON email_subscribers
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE email_subscribers IS 'Email marketing list captured from exit-intent popup and newsletter signups';
COMMENT ON COLUMN email_subscribers.email IS 'Subscriber email address (unique)';
COMMENT ON COLUMN email_subscribers.source IS 'Where the email was captured from';
COMMENT ON COLUMN email_subscribers.metadata IS 'Additional data like referrer, UTM params, etc.';
