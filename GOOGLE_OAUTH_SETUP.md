# 🔐 **GOOGLE OAUTH SETUP**

## **Step 1: Create Google OAuth App**

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Create/Select Project**: "AI Agent Sandbox" 
3. **Enable APIs**:
   - Go to "APIs & Services" → "Library"
   - Search and enable "Google+ API"
4. **Create Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: **Web application**
   - Name: **AI Agent Sandbox**
   - Authorized redirect URIs:
     ```
     https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback
     ```
5. **Copy Client ID and Secret**

## **Step 2: Configure Supabase**

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/zmkkmdtojnlbyuusrfak
2. **Authentication → Providers → Google**:
   - ✅ Enable "Sign in with Google"
   - **Client ID**: [paste from Google Console]
   - **Client Secret**: [paste from Google Console]
   - **Redirect URL**: `https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback`

## **Step 3: GitHub OAuth (Optional)**

1. **GitHub Settings**: https://github.com/settings/developers
2. **New OAuth App**:
   - Application name: **AI Agent Sandbox**
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback`
3. **Add to Supabase**: Authentication → Providers → GitHub

## **Step 4: Test**
- Click "Continue with Google" → Should redirect to Google → Back to dashboard

**Callback URL: `https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback`**