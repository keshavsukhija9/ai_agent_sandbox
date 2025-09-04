import { supabase } from './supabase';

export const testConnections = async () => {
  console.log('🔍 Testing connections...');
  
  // Test Supabase connection
  try {
    const { data, error } = await supabase.from('agents').select('count').limit(1);
    if (error) {
      console.log('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connected successfully');
    }
  } catch (error) {
    console.log('❌ Supabase connection error:', error.message);
  }

  // Test Hugging Face (if API key exists)
  const hfKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  if (hfKey && hfKey !== 'your-huggingface-api-key-here') {
    console.log('✅ Hugging Face API key configured');
  } else {
    console.log('⚠️ Hugging Face API key not configured - using fallback');
  }

  console.log('🚀 App running in hybrid mode (real + demo data)');
};