-- Luxury Real Estate Leads Table
-- This table captures high-net-worth client inquiries before WhatsApp redirect

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_ref TEXT NOT NULL,
  status TEXT DEFAULT 'captured' CHECK (status IN ('captured', 'contacted', 'qualified', 'closed')),
  
  -- Metadata for analytics
  user_agent TEXT,
  ip_address INET,
  
  -- Indexes for performance
  CONSTRAINT leads_phone_check CHECK (length(phone) >= 10)
);

-- Create index for faster queries by status and date
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_property_ref ON leads(property_ref);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow insert for all (public lead capture)
CREATE POLICY "Allow public lead capture" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can view leads (for admin dashboard)
CREATE POLICY "Authenticated users can view leads" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

COMMENT ON TABLE leads IS 'Captures luxury real estate inquiries with enterprise-grade validation';
COMMENT ON COLUMN leads.property_ref IS 'Reference to the property listing (e.g., VOLGA-TOWER-001)';
COMMENT ON COLUMN leads.status IS 'Lead lifecycle: captured → contacted → qualified → closed';
