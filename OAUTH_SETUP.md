# OAuth Setup Guide

## Enable OAuth Providers in Supabase

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: zmkkmdtojnlbyuusrfak
3. **Navigate to**: Authentication → Providers
4. **Enable Google**:
   - Toggle ON "Enable sign in with Google"
   - Add redirect URL: `https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback`
   - For development, also add: `http://localhost:5173`

5. **Enable GitHub**:
   - Toggle ON "Enable sign in with GitHub" 
   - Add same redirect URLs as above

6. **Site URL Configuration**:
   - Go to Authentication → URL Configuration
   - Set Site URL to: `http://localhost:5173` (for development)
   - Add redirect URLs: `http://localhost:5173/dashboard`

## Quick Fix (Temporary)
For immediate testing, the app will fallback to dashboard redirect even if OAuth fails.