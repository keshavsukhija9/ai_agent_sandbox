// Force agent synchronization utility
export const forceAgentSync = () => {
  console.log('🔄 Force syncing agents...');
  
  // Create a test agent if none exist
  const existingAgents = JSON.parse(localStorage.getItem('demo_agents') || '[]');
  
  if (existingAgents.length === 0) {
    console.log('📝 Creating demo agent for testing...');
    
    const demoAgent = {
      id: 'demo_' + Date.now(),
      name: 'Demo Crypto Analyzer',
      description: 'Demo agent for testing functionality',
      task_input: 'Analyze cryptocurrency market trends and provide investment insights',
      model: 'facebook/bart-large-mnli',
      permission_level: 'standard',
      execution_environment: 'sandbox',
      skills: ['web-scraping', 'ai-processing', 'data-analysis'],
      status: 'active',
      created_at: new Date().toISOString(),
      created_by: 'demo_user'
    };
    
    existingAgents.push(demoAgent);
    localStorage.setItem('demo_agents', JSON.stringify(existingAgents));
    console.log('✅ Demo agent created:', demoAgent);
  }
  
  console.log(`📊 Total agents in storage: ${existingAgents.length}`);
  return existingAgents;
};

// Add to window for easy access
if (typeof window !== 'undefined') {
  window.forceAgentSync = forceAgentSync;
}