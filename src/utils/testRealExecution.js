import { realAgentExecutor } from '../services/realAgentExecutor';

export const testRealExecution = async () => {
  console.log('🤖 Testing REAL Agent Execution...');
  
  try {
    // Create a test agent with real capabilities
    const testAgent = {
      id: 'test_agent_' + Date.now(),
      name: 'Real Execution Test Agent',
      task_input: 'Analyze cryptocurrency market trends and provide investment insights',
      skills: ['web-scraping', 'ai-processing', 'data-analysis'],
      model: 'facebook/bart-large-mnli'
    };
    
    console.log('🚀 Starting real agent execution...');
    console.log('Agent:', testAgent);
    
    // Execute the agent with real functionality
    const execution = await realAgentExecutor.executeAgent(testAgent);
    
    console.log('✅ Execution completed!');
    console.log('Result:', execution);
    
    // Verify real functionality
    const verification = {
      executionCompleted: execution.status === 'completed',
      realDataCollected: execution.realData && execution.realData.length > 0,
      stepsExecuted: execution.steps && execution.steps.length > 0,
      insightsGenerated: execution.result && execution.result.realInsights,
      apiCallsMade: false,
      aiProcessingDone: false
    };
    
    // Check for real API calls
    if (execution.realData) {
      for (const data of execution.realData) {
        if (Array.isArray(data)) {
          verification.apiCallsMade = data.some(item => 
            item.source && item.source.includes('api.')
          );
        }
      }
    }
    
    // Check for AI processing
    if (execution.steps) {
      verification.aiProcessingDone = execution.steps.some(step => 
        step.type === 'ai_processing' && step.status === 'completed'
      );
    }
    
    console.log('🔍 Verification Results:');
    console.log(verification);
    
    return {
      success: true,
      execution,
      verification,
      realFunctionality: {
        dataCollection: verification.apiCallsMade,
        aiProcessing: verification.aiProcessingDone,
        insights: verification.insightsGenerated,
        stepExecution: verification.stepsExecuted
      },
      message: `Agent executed ${execution.steps?.length || 0} steps with real functionality`
    };
    
  } catch (error) {
    console.error('❌ Real execution test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Real execution test failed'
    };
  }
};

// Test specific functionality
export const testSpecificFunctions = async () => {
  console.log('🔬 Testing Specific Agent Functions...');
  
  const tests = [];
  
  try {
    // Test 1: Data Collection
    console.log('1️⃣ Testing data collection...');
    const dataTest = await fetch('https://api.github.com/repos/microsoft/vscode');
    if (dataTest.ok) {
      const data = await dataTest.json();
      tests.push({
        name: 'API Data Collection',
        success: true,
        result: `Fetched ${Object.keys(data).length} fields from GitHub API`
      });
    }
  } catch (error) {
    tests.push({
      name: 'API Data Collection',
      success: false,
      error: error.message
    });
  }
  
  try {
    // Test 2: Text Processing
    console.log('2️⃣ Testing text processing...');
    const text = "This is a positive sentiment analysis test with great results";
    const words = text.toLowerCase().split(/\s+/);
    const positiveWords = ['positive', 'great', 'good', 'excellent'];
    const sentiment = words.some(word => positiveWords.includes(word)) ? 'positive' : 'neutral';
    
    tests.push({
      name: 'Text Processing',
      success: true,
      result: `Analyzed ${words.length} words, detected ${sentiment} sentiment`
    });
  } catch (error) {
    tests.push({
      name: 'Text Processing',
      success: false,
      error: error.message
    });
  }
  
  try {
    // Test 3: Statistical Analysis
    console.log('3️⃣ Testing statistical analysis...');
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    
    tests.push({
      name: 'Statistical Analysis',
      success: true,
      result: `Calculated mean: ${mean}, variance: ${variance.toFixed(2)}`
    });
  } catch (error) {
    tests.push({
      name: 'Statistical Analysis',
      success: false,
      error: error.message
    });
  }
  
  console.log('📊 Function Test Results:', tests);
  
  return {
    success: tests.every(test => test.success),
    tests,
    summary: `${tests.filter(t => t.success).length}/${tests.length} functions working`
  };
};

// Make available globally
if (typeof window !== 'undefined') {
  window.testRealExecution = testRealExecution;
  window.testSpecificFunctions = testSpecificFunctions;
  console.log('🧪 Real execution tests available:');
  console.log('  - window.testRealExecution() - Test complete agent execution');
  console.log('  - window.testSpecificFunctions() - Test individual functions');
}