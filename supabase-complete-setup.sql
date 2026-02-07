-- ============================================================================
-- MASTER SETUP SCRIPT - RUN THIS TO FIX EVERYTHING
-- ============================================================================
-- This script will:
-- 1. Reset the 'leads' table (WARNING: Deletes existing data)
-- 2. Re-create it with ALL required columns
-- 3. Set up correct security policies (RLS)
-- ============================================================================

-- 1. Cleanup Old Table
DROP TABLE IF EXISTS leads CASCADE;

-- 2. Create Leads Table (Complete Schema)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Client Information
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  
  -- Property Interest
  property_interest TEXT NOT NULL, -- e.g. "Villa Palm Jumeirah"
  property_ref TEXT,               -- e.g. "VILLA-001"
  budget_range TEXT,               -- e.g. "5M - 10M AED"
  property_type TEXT,              -- e.g. "Villa", "Apartment"
  contact_preference TEXT DEFAULT 'whatsapp', -- "whatsapp", "call", "email"
  
  -- Lead Tracking
  source TEXT DEFAULT 'website_demo',
  status TEXT DEFAULT 'new',      -- "new", "contacted", "qualified", "closed"
  
  -- Sales Assignment
  assigned_agent TEXT,
  priority TEXT DEFAULT 'medium'
  
);

-- 3. Enable Security (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies (CRITICAL FOR PUBLIC FORMS)
-- Allow EVERYONE (anon + auth) to insert leads
CREATE POLICY "Enable insert for everyone" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow ONLY authenticated users (Admins) to view leads
CREATE POLICY "Enable read for authenticated users only" ON leads FOR SELECT TO authenticated USING (true);

-- Allow ONLY authenticated users to update leads
CREATE POLICY "Enable update for authenticated users only" ON leads FOR UPDATE TO authenticated USING (true);

-- 5. Create Email Subscribers Table (Bonus)
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'waitlist_popup'
);

-- Enable RLS for Subscribers
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert subscribers" ON email_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin view subscribers" ON email_subscribers FOR SELECT TO authenticated USING (true);
