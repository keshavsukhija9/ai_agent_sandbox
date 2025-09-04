# 🔧 **FIX: Missing OAuth Secret**

## **Problem:** 
`{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: missing OAuth secret"}`

## **Solution:**

### **Step 1: Get Google OAuth Credentials**
1. Go to Google Cloud Console: https://console.cloud.google.com
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. **Copy both Client ID and Client Secret**

### **Step 2: Add to Supabase**
1. Go to: https://supabase.com/dashboard/project/zmkkmdtojnlbyuusrfak
2. **Authentication** → **Providers** → **Google**
3. Make sure you have BOTH:
   - ✅ **Client ID**: [paste from Google]
   - ✅ **Client Secret**: [paste from Google]
4. Click **"Save"**

### **Step 3: Verify Configuration**
- Both fields must be filled
- No extra spaces
- Save after entering both

### **Step 4: Test Again**
- Refresh your app
- Try Google login
- Should work now

**The error means Supabase has the Client ID but is missing the Client Secret!**