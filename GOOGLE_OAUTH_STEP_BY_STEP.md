# 🔐 **GOOGLE OAUTH 2.0 CLIENT ID - STEP BY STEP**

## **Step 1: Go to Google Cloud Console**
1. Visit: https://console.cloud.google.com
2. Sign in with your Google account

## **Step 2: Create or Select Project**
1. Click the **project dropdown** (top left, next to "Google Cloud")
2. Click **"New Project"**
3. Project name: **"AI Agent Sandbox"**
4. Click **"Create"**
5. Wait for project creation, then **select it**

## **Step 3: Enable Google+ API**
1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click on it and press **"Enable"**

## **Step 4: Configure OAuth Consent Screen**
1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** → Click **"Create"**
3. Fill required fields:
   - **App name**: AI Agent Sandbox
   - **User support email**: [your email]
   - **Developer contact**: [your email]
4. Click **"Save and Continue"** through all steps

## **Step 5: Create OAuth 2.0 Client ID**
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** → **"OAuth 2.0 Client ID"**
3. **Application type**: Web application
4. **Name**: AI Agent Sandbox
5. **Authorized redirect URIs**: Click **"+ Add URI"**
   ```
   https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback
   ```
6. Click **"Create"**

## **Step 6: Copy Credentials**
1. A popup will show your **Client ID** and **Client Secret**
2. **Copy both** - you'll need them for Supabase
3. Click **"OK"**

## **Step 7: Add to Supabase**
1. Go to: https://supabase.com/dashboard/project/zmkkmdtojnlbyuusrfak
2. **Authentication** → **Providers** → **Google**
3. Toggle **"Enable sign in with Google"**
4. Paste **Client ID** and **Client Secret**
5. Click **"Save"**

**Done! Google OAuth is now configured.**