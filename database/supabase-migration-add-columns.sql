-- ============================================================================
-- UPDATED LEADS TABLE SCHEMA - Add New Columns
-- ============================================================================
-- Run this to add budget_range, property_type, and contact_preference columns
-- ============================================================================

-- Add new columns if they don't exist
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS property_type TEXT,
ADD COLUMN IF NOT EXISTS contact_preference TEXT DEFAULT 'whatsapp';

-- Update budget_range if it exists, otherwise add it
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='leads' AND column_name='budget_range') THEN
        ALTER TABLE leads ADD COLUMN budget_range TEXT;
    END IF;
END $$;

-- Create index for property_type
CREATE INDEX IF NOT EXISTS idx_leads_property_type ON leads(property_type);
CREATE INDEX IF NOT EXISTS idx_leads_budget_range ON leads(budget_range);

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================
-- Run this to verify the columns were added:
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'leads' ORDER BY ordinal_position;
