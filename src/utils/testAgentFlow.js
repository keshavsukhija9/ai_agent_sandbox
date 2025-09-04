import { supabaseService } from '../services/supabaseService';
import { agentStore } from './agentStore';

export const testAgentFlow = async () => {
  console.log('🧪 Testing Complete Agent Flow...');
  
  try {
    // Step 1: Clear existing data
    console.log('1️⃣ Clearing existing data...');
    localStorage.removeItem('demo_agents');
    agentStore.clear();
    
    // Step 2: Create test agent
    console.log('2️⃣ Creating test agent...');
    const testAgent = {
      name: 'Test Flow Agent ' + Date.now(),
      description: 'Automated test agent for flow verification',
      taskInput: 'Analyze cryptocurrency trends and generate investment insights',
      selectedModel: 'facebook/bart-large-mnli',
      permissionLevel: 'standard',
      executionEnvironment: 'sandbox',
      selectedSkills: ['web-scraping', 'ai-processing', 'data-analysis']
    };
    
    const { data, error } = await supabaseService.createAgent(testAgent);
    
    if (error) {
      console.log('⚠️ Supabase error (expected in demo mode):', error);
    }
    
    if (data && data[0]) {
      console.log('✅ Agent created:', data[0]);
      
      // Step 3: Verify storage
      console.log('3️⃣ Verifying storage...');
      const localAgents = JSON.parse(localStorage.getItem('demo_agents') || '[]');
      console.log('📦 Local storage agents:', localAgents);
      
      // Step 4: Test retrieval
      console.log('4️⃣ Testing retrieval...');
      const user = await supabaseService.getCurrentUser();
      const { data: retrievedAgents } = await supabaseService.getAgents(user.id);
      console.log('🔍 Retrieved agents:', retrievedAgents);
      
      // Step 5: Verify agent appears in list
      const agentFound = retrievedAgents?.find(a => a.name === testAgent.name);
      
      if (agentFound) {
        console.log('✅ SUCCESS: Agent found in management list!');
        return {
          success: true,
          message: 'Agent flow test passed!',
          agent: agentFound,
          totalAgents: retrievedAgents.length
        };
      } else {
        console.log('❌ FAIL: Agent not found in management list');
        return {
          success: false,
          message: 'Agent created but not visible in management',
          created: data[0],
          retrieved: retrievedAgents
        };
      }
    } else {
      throw new Error('No agent data returned from creation');
    }
    
  } catch (error) {
    console.error('❌ Agent flow test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Agent flow test failed'
    };
  }
};

// Auto-run test when imported
if (typeof window !== 'undefined') {
  window.testAgentFlow = testAgentFlow;
  console.log('🔧 Agent flow test available: window.testAgentFlow()');
}