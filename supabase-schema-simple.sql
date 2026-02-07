-- ============================================================================
-- SIMPLE LEADS TABLE - For Property Inquiries
-- ============================================================================
-- Run this first to create a clean leads table
-- ============================================================================

-- Drop existing table if it exists (CAUTION: This deletes data!)
DROP TABLE IF EXISTS leads CASCADE;

-- Create leads table
CREATE TABLE leads (
  -- Primary Identifiers
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Client Information (Required)
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  
  -- Property Interest (Required)
  property_interest TEXT NOT NULL,
  property_ref TEXT,
  budget_range TEXT,
  
  -- Lead Tracking
  lead_source TEXT DEFAULT 'website_demo',
  lead_status TEXT DEFAULT 'new',
  
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
-- INDEXES
-- ============================================================================
CREATE INDEX idx_leads_status ON leads(lead_status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_property_ref ON leads(property_ref);
CREATE INDEX idx_leads_source ON leads(lead_source);
CREATE INDEX idx_leads_phone ON leads(phone);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (for lead capture forms)
CREATE POLICY "Allow public lead capture" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view all leads
CREATE POLICY "Authenticated users can view leads" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can update leads
CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- AUTO-UPDATE TRIGGER
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
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE leads IS 'Property inquiry leads from luxury real estate website';
COMMENT ON COLUMN leads.full_name IS 'Client full name';
COMMENT ON COLUMN leads.phone IS 'Client phone number (required)';
COMMENT ON COLUMN leads.email IS 'Client email address';
COMMENT ON COLUMN leads.property_interest IS 'Property they are interested in';
COMMENT ON COLUMN leads.lead_source IS 'Where the lead came from';
COMMENT ON COLUMN leads.lead_status IS 'Current status of the lead';
