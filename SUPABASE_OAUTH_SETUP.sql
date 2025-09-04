-- Run this in your Supabase SQL Editor to configure OAuth settings

-- Update site URL for localhost development
UPDATE auth.config 
SET site_url = 'http://localhost:5173'
WHERE TRUE;

-- The callback URL for OAuth providers should be:
-- https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback

-- Add allowed redirect URLs after OAuth
INSERT INTO auth.redirect_urls (url) VALUES 
('http://localhost:5173'),
('http://localhost:5173/dashboard'),
('http://localhost:5173/**')
ON CONFLICT (url) DO NOTHING;