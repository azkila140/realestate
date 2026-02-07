-- ============================================================================
-- STEP 1: Drop existing table
-- ============================================================================
DROP TABLE IF EXISTS leads CASCADE;

-- ============================================================================
-- STEP 2: Create leads table with correct structure
-- ============================================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Client Information
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  
  -- Property Interest
  property_interest TEXT NOT NULL,
  property_ref TEXT,
  budget_range TEXT,
  
  -- Lead Tracking (matching your code exactly)
  source TEXT DEFAULT 'website_demo',
  status TEXT DEFAULT 'new',
  
  -- Sales Assignment
  assigned_agent TEXT,
  priority TEXT DEFAULT 'medium',
  
  -- Analytics
  user_agent TEXT,
  ip_address INET,
  referrer_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Communication
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  contact_count INTEGER DEFAULT 0,
  notes TEXT,
  
  -- Constraints
  CONSTRAINT leads_phone_check CHECK (length(phone) >= 10),
  CONSTRAINT leads_email_check CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================================================
-- STEP 3: Create indexes
-- ============================================================================
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_source ON leads(source);

-- ============================================================================
-- STEP 4: Enable Row Level Security
-- ============================================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public to insert leads
CREATE POLICY "Allow public lead capture" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view leads
CREATE POLICY "Authenticated users can view leads" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can update leads
CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- STEP 5: Create auto-update trigger
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- DONE! Now run the email_subscribers schema
-- ============================================================================
