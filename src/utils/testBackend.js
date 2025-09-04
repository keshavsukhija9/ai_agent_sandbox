import { backendService } from '../services/backendService';

export const testBackend = async () => {
  console.log('🧪 Testing Enterprise Backend Connection...');
  
  const results = {
    connection: false,
    agentExecution: false,
    webScraping: false,
    aiProcessing: false,
    priceMonitoring: false
  };
  
  try {
    // Test 1: Backend Connection
    console.log('1️⃣ Testing backend connection...');
    const connectionTest = await backendService.testConnection();
    results.connection = connectionTest.success;
    
    if (!results.connection) {
      console.log('❌ Backend not available - tests cannot continue');
      return {
        success: false,
        results,
        message: 'Backend server not running on localhost:3001'
      };
    }
    
    console.log('✅ Backend connection successful');
    
    // Test 2: Agent Execution
    console.log('2️⃣ Testing agent execution...');
    try {
      const testAgent = {
        id: 'test_' + Date.now(),
        name: 'Backend Test Agent',
        task_input: 'Test enterprise backend functionality',
        skills: ['web-scraping', 'ai-processing', 'data-analysis']
      };
      
      const executionResult = await backendService.executeAgent(testAgent);
      results.agentExecution = executionResult.success;
      console.log('✅ Agent execution test passed');
    } catch (error) {
      console.log('❌ Agent execution test failed:', error.message);
    }
    
    // Test 3: Web Scraping
    console.log('3️⃣ Testing web scraping...');
    try {
      const scrapingResult = await backendService.scrapeWebsite('https://api.github.com/repos/microsoft/vscode');
      results.webScraping = scrapingResult.success;
      console.log('✅ Web scraping test passed');
    } catch (error) {
      console.log('❌ Web scraping test failed:', error.message);
    }
    
    // Test 4: AI Processing
    console.log('4️⃣ Testing AI processing...');
    try {
      const aiResult = await backendService.analyzeWithAI('This is a positive test message with great results');
      results.aiProcessing = aiResult.success;
      console.log('✅ AI processing test passed');
    } catch (error) {
      console.log('❌ AI processing test failed:', error.message);
    }
    
    // Test 5: Price Monitoring
    console.log('5️⃣ Testing price monitoring...');
    try {
      const priceResult = await backendService.monitorCompetitorPrices([
        'https://api.coindesk.com/v1/bpi/currentprice.json'
      ]);
      results.priceMonitoring = priceResult.success;
      console.log('✅ Price monitoring test passed');
    } catch (error) {
      console.log('❌ Price monitoring test failed:', error.message);
    }
    
  } catch (error) {
    console.error('Backend testing failed:', error);
  }
  
  // Calculate success rate
  const testCount = Object.keys(results).length;
  const passedCount = Object.values(results).filter(Boolean).length;
  const successRate = Math.round((passedCount / testCount) * 100);
  
  console.log('\n🏆 BACKEND TEST RESULTS:');
  console.log('========================');
  console.log(`Backend Connection: ${results.connection ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Agent Execution: ${results.agentExecution ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Web Scraping: ${results.webScraping ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`AI Processing: ${results.aiProcessing ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Price Monitoring: ${results.priceMonitoring ? '✅ PASS' : '❌ FAIL'}`);
  console.log('========================');
  console.log(`SUCCESS RATE: ${passedCount}/${testCount} (${successRate}%)`);
  
  let verdict;
  if (successRate >= 80) {
    verdict = '✅ ENTERPRISE BACKEND FULLY OPERATIONAL';
  } else if (successRate >= 60) {
    verdict = '⚠️ BACKEND PARTIALLY FUNCTIONAL';
  } else {
    verdict = '❌ BACKEND ISSUES DETECTED';
  }
  
  console.log(`\nVERDICT: ${verdict}`);
  
  return {
    success: successRate >= 60,
    results,
    successRate,
    verdict,
    message: `Backend tests completed: ${passedCount}/${testCount} passed`
  };
};

// Make available globally
if (typeof window !== 'undefined') {
  window.testBackend = testBackend;
  console.log('🔧 Backend test available: window.testBackend()');
}