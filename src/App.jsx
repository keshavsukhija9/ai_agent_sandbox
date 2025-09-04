import React, { useEffect } from "react";
import Routes from "./Routes";
import { testConnections } from "./utils/testConnection";
import { testAgentCreation } from "./utils/testAgentCreation";
import { debugAgents } from "./utils/debugAgents";
import { testAgentFlow } from "./utils/testAgentFlow";
import { testRealExecution, testSpecificFunctions } from "./utils/testRealExecution";
import { realityCheck } from "./utils/realityCheck";
import { testBackend } from "./utils/testBackend";

function App() {
  useEffect(() => {
    testConnections();
    
    // Make test and debug available globally
    window.testAgentCreation = testAgentCreation;
    window.debugAgents = debugAgents;
    window.testAgentFlow = testAgentFlow;
    window.testRealExecution = testRealExecution;
    window.testSpecificFunctions = testSpecificFunctions;
    window.realityCheck = realityCheck;
    window.testBackend = testBackend;
    
    console.log('🧪 Tests available:');
    console.log('  - window.testBackend() - TEST ENTERPRISE BACKEND');
    console.log('  - window.realityCheck() - BRUTAL REALITY CHECK');
    console.log('  - window.testRealExecution() - Test REAL execution');
    console.log('  - window.testAgentCreation() - Test agent creation');
    console.log('  - window.testAgentFlow() - Test complete flow');
    console.log('  - window.testSpecificFunctions() - Test individual functions');
    console.log('  - window.debugAgents() - Debug agent storage');
    
    console.log('🏢 Run window.testBackend() to test enterprise backend!');
    console.log('🔥 Run window.realityCheck() to see if this is REAL or just frontend!');
  }, []);

  return (
    <Routes />
  );
}

export default App;