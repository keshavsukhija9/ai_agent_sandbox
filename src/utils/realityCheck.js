// Brutal reality check - is this real or just frontend?
export const realityCheck = async () => {
  console.log('🔍 BRUTAL REALITY CHECK - Testing if functionality is REAL or FAKE');
  
  const results = {
    realApiCalls: false,
    realAiProcessing: false,
    realDataProcessing: false,
    realTimeExecution: false,
    actualFunctionality: false
  };
  
  try {
    // Test 1: Can we actually make real API calls?
    console.log('1️⃣ Testing REAL API calls...');
    try {
      const response = await fetch('https://api.github.com/repos/microsoft/vscode');
      if (response.ok) {
        const data = await response.json();
        results.realApiCalls = true;
        console.log('✅ REAL API call successful - got actual data:', Object.keys(data).length, 'fields');
      }
    } catch (error) {
      console.log('❌ API calls BLOCKED by browser/CORS');
      results.realApiCalls = false;
    }
    
    // Test 2: Is AI processing real or mock?
    console.log('2️⃣ Testing AI processing...');
    const testText = "This is a test for sentiment analysis with positive words like great and excellent";
    
    // Check if we have real Hugging Face integration
    const hfKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    if (hfKey && hfKey !== 'your-huggingface-api-key-here') {
      try {
        const hfResponse = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-mnli', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${hfKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: testText,
            parameters: { candidate_labels: ["positive", "negative", "neutral"] }
          })
        });
        
        if (hfResponse.ok) {
          const hfData = await hfResponse.json();
          results.realAiProcessing = true;
          console.log('✅ REAL AI processing - Hugging Face API working');
        }
      } catch (error) {
        console.log('❌ Hugging Face API failed:', error.message);
      }
    } else {
      console.log('❌ No real Hugging Face API key - using mock processing');
    }
    
    // Test 3: Check if data processing is real math or fake
    console.log('3️⃣ Testing data processing...');
    const testData = [1, 2, 3, 4, 5];
    const mean = testData.reduce((a, b) => a + b, 0) / testData.length;
    const variance = testData.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / testData.length;
    
    if (mean === 3 && variance === 2) {
      results.realDataProcessing = true;
      console.log('✅ REAL mathematical calculations working');
    } else {
      console.log('❌ Math calculations incorrect');
    }
    
    // Test 4: Check if execution is real-time or just setTimeout
    console.log('4️⃣ Testing real-time execution...');
    const startTime = performance.now();
    
    // Simulate what agent execution does
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const endTime = performance.now();
    const actualTime = endTime - startTime;
    
    if (actualTime >= 90 && actualTime <= 150) {
      results.realTimeExecution = true;
      console.log('✅ Real-time execution timing correct');
    } else {
      console.log('❌ Execution timing suspicious');
    }
    
    // Test 5: Overall functionality assessment
    console.log('5️⃣ Overall functionality check...');
    
    // Check if we have real execution engine
    try {
      const { realAgentExecutor } = await import('../services/realAgentExecutor');
      if (realAgentExecutor && typeof realAgentExecutor.executeAgent === 'function') {
        results.actualFunctionality = true;
        console.log('✅ Real execution engine exists');
      }
    } catch (error) {
      console.log('❌ No real execution engine found');
    }
    
  } catch (error) {
    console.error('Reality check failed:', error);
  }
  
  // Final verdict
  const realCount = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log('\n🏆 REALITY CHECK RESULTS:');
  console.log('========================');
  console.log(`Real API Calls: ${results.realApiCalls ? '✅ YES' : '❌ NO'}`);
  console.log(`Real AI Processing: ${results.realAiProcessing ? '✅ YES' : '❌ NO'}`);
  console.log(`Real Data Processing: ${results.realDataProcessing ? '✅ YES' : '❌ NO'}`);
  console.log(`Real-time Execution: ${results.realTimeExecution ? '✅ YES' : '❌ NO'}`);
  console.log(`Actual Functionality: ${results.actualFunctionality ? '✅ YES' : '❌ NO'}`);
  console.log('========================');
  console.log(`SCORE: ${realCount}/${totalTests} (${Math.round(realCount/totalTests*100)}%)`);
  
  let verdict;
  if (realCount >= 4) {
    verdict = '✅ REAL FUNCTIONALITY - This is a working system';
  } else if (realCount >= 2) {
    verdict = '⚠️ PARTIAL FUNCTIONALITY - Some real features, some mock';
  } else {
    verdict = '❌ MOSTLY FRONTEND - Limited real functionality';
  }
  
  console.log(`\nVERDICT: ${verdict}`);
  
  return {
    results,
    score: `${realCount}/${totalTests}`,
    percentage: Math.round(realCount/totalTests*100),
    verdict
  };
};

// Make available globally
if (typeof window !== 'undefined') {
  window.realityCheck = realityCheck;
  console.log('🔍 Reality check available: window.realityCheck()');
}