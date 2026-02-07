-- ============================================================================
-- LUXURY REAL ESTATE CRM - ENTERPRISE DATABASE SCHEMA
-- ============================================================================
-- Purpose: Lead Routing & Management System for High-Net-Worth Clients
-- Tech Stack: Supabase (PostgreSQL) + Row Level Security
-- Author: Senior Full Stack Architect
-- ============================================================================

-- Drop existing table if you want to recreate (CAUTION: This deletes data!)
-- DROP TABLE IF EXISTS leads CASCADE;

-- ============================================================================
-- LEADS TABLE - The Core CRM
-- ============================================================================
CREATE TABLE IF NOT EXISTS leads (
  -- Primary Identifiers
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Client Information
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  
  -- Property Interest
  property_interest TEXT NOT NULL, -- e.g., "Volga Tower", "Azizi Venice"
  property_ref TEXT, -- e.g., "VOLGA-TOWER-001"
  budget_range TEXT, -- e.g., "1M-2M AED"
  
  -- Lead Tracking
  source TEXT DEFAULT 'website_demo' CHECK (source IN ('website_demo', 'landing_page', 'referral', 'social_media', 'direct')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'viewing_scheduled', 'offer_made', 'closed_won', 'closed_lost')),
  
  -- Sales Assignment
  assigned_agent TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Analytics & Tracking
  user_agent TEXT,
  ip_address INET,
  referrer_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Communication Log
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  contact_count INTEGER DEFAULT 0,
  notes TEXT,
  
  -- Constraints
  CONSTRAINT leads_phone_check CHECK (length(phone) >= 10),
  CONSTRAINT leads_email_check CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================================================
-- INDEXES - For Performance Optimization
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_property_ref ON leads(property_ref);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_agent ON leads(assigned_agent);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone); -- For duplicate detection

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status_priority ON leads(status, priority DESC, created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Enterprise-Grade Security
-- ============================================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public INSERT (for lead capture forms)
DROP POLICY IF EXISTS "Allow public lead capture" ON leads;
CREATE POLICY "Allow public lead capture" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Authenticated users can view all leads (for admin dashboard)
DROP POLICY IF EXISTS "Authenticated users can view leads" ON leads;
CREATE POLICY "Authenticated users can view leads" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy 3: Authenticated users can update leads
DROP POLICY IF EXISTS "Authenticated users can update leads" ON leads;
CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- TRIGGERS - Automated Business Logic
-- ============================================================================

-- Trigger: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-assign priority based on budget
CREATE OR REPLACE FUNCTION auto_assign_priority()
RETURNS TRIGGER AS $$
BEGIN
  -- High priority for budgets over 5M AED
  IF NEW.budget_range LIKE '%5M%' OR NEW.budget_range LIKE '%10M%' OR NEW.budget_range LIKE '%15M%' THEN
    NEW.priority = 'urgent';
  -- Medium priority for 2M-5M AED
  ELSIF NEW.budget_range LIKE '%2M%' OR NEW.budget_range LIKE '%3M%' OR NEW.budget_range LIKE '%4M%' THEN
    NEW.priority = 'high';
  ELSE
    NEW.priority = 'medium';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auto_assign_priority_trigger ON leads;
CREATE TRIGGER auto_assign_priority_trigger
  BEFORE INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION auto_assign_priority();

-- ============================================================================
-- VIEWS - For Analytics & Reporting
-- ============================================================================

-- View: Lead Pipeline Summary
CREATE OR REPLACE VIEW lead_pipeline_summary AS
SELECT 
  status,
  COUNT(*) as count,
  COUNT(*) FILTER (WHERE priority = 'urgent') as urgent_count,
  COUNT(*) FILTER (WHERE priority = 'high') as high_count,
  AVG(contact_count) as avg_contacts,
  MAX(created_at) as latest_lead
FROM leads
GROUP BY status
ORDER BY 
  CASE status
    WHEN 'new' THEN 1
    WHEN 'contacted' THEN 2
    WHEN 'qualified' THEN 3
    WHEN 'viewing_scheduled' THEN 4
    WHEN 'offer_made' THEN 5
    WHEN 'closed_won' THEN 6
    WHEN 'closed_lost' THEN 7
  END;

-- View: Today's Leads
CREATE OR REPLACE VIEW todays_leads AS
SELECT *
FROM leads
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;

-- View: Hot Leads (High priority, not yet contacted)
CREATE OR REPLACE VIEW hot_leads AS
SELECT *
FROM leads
WHERE priority IN ('urgent', 'high')
  AND status = 'new'
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY priority DESC, created_at ASC;

-- ============================================================================
-- FUNCTIONS - Business Logic
-- ============================================================================

-- Function: Get lead conversion rate
CREATE OR REPLACE FUNCTION get_conversion_rate(days_back INTEGER DEFAULT 30)
RETURNS TABLE(
  total_leads BIGINT,
  closed_won BIGINT,
  conversion_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'closed_won') as closed_won,
    ROUND(
      (COUNT(*) FILTER (WHERE status = 'closed_won')::NUMERIC / 
       NULLIF(COUNT(*), 0) * 100), 2
    ) as conversion_rate
  FROM leads
  WHERE created_at > NOW() - (days_back || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

-- Function: Detect duplicate leads (same phone number)
CREATE OR REPLACE FUNCTION check_duplicate_lead(phone_number TEXT)
RETURNS TABLE(
  is_duplicate BOOLEAN,
  existing_lead_id UUID,
  existing_status TEXT,
  days_since_last_contact INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TRUE as is_duplicate,
    id as existing_lead_id,
    status as existing_status,
    EXTRACT(DAY FROM NOW() - COALESCE(last_contacted_at, created_at))::INTEGER as days_since_last_contact
  FROM leads
  WHERE phone = phone_number
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::INTEGER;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMMENTS - Documentation
-- ============================================================================
COMMENT ON TABLE leads IS 'Enterprise CRM for luxury real estate lead management with automated routing and analytics';
COMMENT ON COLUMN leads.full_name IS 'Client full name (required for personalization)';
COMMENT ON COLUMN leads.phone IS 'Normalized phone number in international format (+971XXXXXXXXX)';
COMMENT ON COLUMN leads.property_interest IS 'Property name the client is interested in';
COMMENT ON COLUMN leads.source IS 'Lead acquisition channel for attribution tracking';
COMMENT ON COLUMN leads.status IS 'Lead lifecycle stage: new → contacted → qualified → viewing_scheduled → offer_made → closed_won/lost';
COMMENT ON COLUMN leads.priority IS 'Auto-assigned based on budget range and property interest';
COMMENT ON COLUMN leads.assigned_agent IS 'Sales agent responsible for this lead';

-- ============================================================================
-- SAMPLE DATA - For Testing (Optional)
-- ============================================================================
-- Uncomment to insert sample data:
/*
INSERT INTO leads (full_name, phone, property_interest, property_ref, budget_range, source) VALUES
('Ahmed Al Maktoum', '+971501234567', 'Volga Tower', 'VOLGA-TOWER-001', '2M-3M AED', 'website_demo'),
('Fatima Hassan', '+971509876543', 'Azizi Venice', 'AZIZI-VENICE-002', '1M-2M AED', 'landing_page'),
('Mohammed Rashid', '+971551234567', 'Palm Jumeirah Villa', 'PALM-VILLA-003', '10M-15M AED', 'referral');
*/

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify the setup:

-- 1. Check table structure
-- SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'leads';

-- 2. Check indexes
-- SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'leads';

-- 3. Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename = 'leads';

-- 4. Test conversion rate function
-- SELECT * FROM get_conversion_rate(30);

-- 5. View pipeline summary
-- SELECT * FROM lead_pipeline_summary;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
