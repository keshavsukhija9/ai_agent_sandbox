# 🔧 **FIX: Google OAuth Redirect URI Mismatch**

## **Problem:** 
`Error 400: redirect_uri_mismatch`

## **Solution:**

### **Step 1: Check Current Redirect URI in Google Console**
1. Go to: https://console.cloud.google.com
2. **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Check **Authorized redirect URIs**

### **Step 2: Update Redirect URI**
**Remove any incorrect URIs and add ONLY this one:**
```
https://zmkkmdtojnlbyuusrfak.supabase.co/auth/v1/callback
```

**Make sure it's EXACTLY:**
- ✅ `https://` (not `http://`)
- ✅ `zmkkmdtojnlbyuusrfak.supabase.co`
- ✅ `/auth/v1/callback`
- ❌ No extra paths or parameters

### **Step 3: Save and Wait**
1. Click **"Save"** in Google Console
2. Wait 5-10 minutes for changes to propagate
3. Try Google login again

### **Step 4: Verify Supabase Settings**
1. Go to: https://supabase.com/dashboard/project/zmkkmdtojnlbyuusrfak
2. **Authentication** → **URL Configuration**
3. **Site URL**: `http://localhost:5173`
4. **Redirect URLs**: `http://localhost:5173/**`

**The redirect URI must match EXACTLY between Google Console and what Supabase sends!**