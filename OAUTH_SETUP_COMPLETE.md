# 🔐 **COMPLETE OAUTH SETUP GUIDE**

## **Step 1: Google OAuth Setup**

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Create/Select Project**: Create new or select existing project
3. **Enable Google+ API**: 
   - APIs & Services → Library → Search "Google+ API" → Enable
4. **Create OAuth Credentials**:
   - APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Name: "AI Agent Sandbox"
   - Authorized redirect URIs:
     ```
     https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback
     http://localhost:5173/auth/callback
     ```
5. **Copy Client ID and Secret**

## **Step 2: GitHub OAuth Setup**

1. **Go to GitHub**: https://github.com/settings/developers
2. **New OAuth App**: 
   - Application name: "AI Agent Sandbox"
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback`
3. **Copy Client ID and Secret**

## **Step 3: Configure Supabase**

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select Project**: zmkkmdtojnlbyuusrfak
3. **Authentication → Providers**:

   **Google:**
   - Enable "Sign in with Google"
   - Client ID: [paste from Google Console]
   - Client Secret: [paste from Google Console]

   **GitHub:**
   - Enable "Sign in with GitHub" 
   - Client ID: [paste from GitHub]
   - Client Secret: [paste from GitHub]

4. **Authentication → URL Configuration**:
   - Site URL: `http://localhost:5173`
   - Redirect URLs: `http://localhost:5173/**`

## **Step 4: Test OAuth**

1. Start app: `npm start`
2. Go to login page
3. Click "Continue with Google" or "Continue with GitHub"
4. Should redirect to OAuth provider and back to dashboard

## **Quick Fix (If Still Issues)**

Add this to your Supabase SQL Editor:
```sql
-- Allow localhost redirects
UPDATE auth.config SET site_url = 'http://localhost:5173';
```

**Status: OAuth will work after completing these steps!**