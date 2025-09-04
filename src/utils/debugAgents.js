// Debug utility to check agent storage
export const debugAgents = () => {
  console.log('=== AGENT DEBUG INFO ===');
  
  // Check localStorage
  const localAgents = localStorage.getItem('demo_agents');
  console.log('Raw localStorage demo_agents:', localAgents);
  
  if (localAgents) {
    try {
      const parsed = JSON.parse(localAgents);
      console.log('Parsed local agents:', parsed);
      console.log('Local agents count:', parsed.length);
    } catch (error) {
      console.error('Error parsing local agents:', error);
    }
  } else {
    console.log('No local agents found');
  }
  
  // Check all localStorage keys
  console.log('All localStorage keys:', Object.keys(localStorage));
  
  return {
    localAgents: localAgents ? JSON.parse(localAgents) : [],
    allKeys: Object.keys(localStorage)
  };
};

// Add to window for easy access
if (typeof window !== 'undefined') {
  window.debugAgents = debugAgents;
}