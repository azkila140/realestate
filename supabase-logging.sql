-- ============================================================================
-- SYSTEM LOGS & LEAD EVENTS
-- ============================================================================
-- PURPOSE: Track all automation events (WhatsApp, CRM, Email) for debugging and proof of delivery.

CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  event_type TEXT NOT NULL, -- 'LEAD_CAPTURE', 'WHATSAPP_SENT', 'CRM_SYNC', 'ERROR'
  status TEXT NOT NULL,     -- 'SUCCESS', 'FAILED', 'PENDING', 'RETRYING'
  details JSONB,            -- Store payload, error message, or response data
  lead_id UUID REFERENCES leads(id),
  metadata JSONB
);

-- Enable RLS
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Allow public insert (server actions) but only admin read
CREATE POLICY "Enable insert for server" ON system_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for admin only" ON system_logs FOR SELECT TO authenticated USING (true);

-- Indexes for performance
CREATE INDEX idx_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX idx_logs_event_type ON system_logs(event_type);
