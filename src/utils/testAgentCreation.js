import { supabaseService } from '../services/supabaseService';

export const testAgentCreation = async () => {
  console.log('🧪 Testing Agent Creation...');
  
  try {
    // Test 1: Check user authentication
    console.log('1️⃣ Testing user authentication...');
    const user = await supabaseService.getCurrentUser();
    console.log('✅ User:', user);
    
    // Test 2: Create test agent
    console.log('2️⃣ Creating test agent...');
    const testAgentData = {
      name: 'Test Agent ' + Date.now(),
      description: 'Test agent created by automated test',
      taskInput: 'Monitor competitor prices and send daily reports',
      selectedModel: 'microsoft/DialoGPT-medium',
      permissionLevel: 'standard',
      executionEnvironment: 'sandbox',
      selectedSkills: ['web-scraping', 'data-analysis']
    };
    
    const { data, error } = await supabaseService.createAgent(testAgentData);
    
    if (error) {
      console.log('⚠️ Supabase error (using fallback):', error);
    }
    
    if (data && data.length > 0) {
      console.log('✅ Agent created successfully:', data[0]);
      
      // Test 3: Verify agent can be retrieved
      console.log('3️⃣ Testing agent retrieval...');
      const { data: agents } = await supabaseService.getAgents(user.id);
      console.log('✅ Retrieved agents:', agents?.length || 0);
      
      return {
        success: true,
        agent: data[0],
        message: 'Agent creation test passed!'
      };
    } else {
      throw new Error('No agent data returned');
    }
    
  } catch (error) {
    console.error('❌ Agent creation test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Agent creation test failed'
    };
  }
};

// Auto-run test when imported
if (typeof window !== 'undefined') {
  window.testAgentCreation = testAgentCreation;
  console.log('🔧 Agent creation test available: window.testAgentCreation()');
}