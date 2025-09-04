import React, { useState } from 'react';
import Button from './ui/Button';
import Icon from './AppIcon';
import { testAgentFlow } from '../utils/testAgentFlow';
import { debugAgents } from '../utils/debugAgents';
import { testRealExecution } from '../utils/testRealExecution';

const TestRunner = () => {
  const [testResult, setTestResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  const [executionResult, setExecutionResult] = useState(null);

  const runCompleteTest = async () => {
    setIsRunning(true);
    setTestResult(null);
    
    try {
      console.log('🚀 Running complete agent flow test...');
      const result = await testAgentFlow();
      setTestResult(result);
      
      // Also get debug info
      const debug = debugAgents();
      setDebugInfo(debug);
      
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message,
        message: 'Test execution failed'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const runDebugOnly = () => {
    const debug = debugAgents();
    setDebugInfo(debug);
    console.log('Debug info:', debug);
  };

  const runRealExecution = async () => {
    setIsRunning(true);
    setExecutionResult(null);
    
    try {
      console.log('🤖 Testing real agent execution...');
      const result = await testRealExecution();
      setExecutionResult(result);
    } catch (error) {
      setExecutionResult({
        success: false,
        error: error.message,
        message: 'Real execution test failed'
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50 max-w-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-foreground">Agent Flow Tester</h3>
        <Icon name="TestTube" size={16} className="text-primary" />
      </div>
      
      <div className="space-y-2 mb-3">
        <Button
          onClick={runCompleteTest}
          loading={isRunning}
          disabled={isRunning}
          size="sm"
          className="w-full"
        >
          {isRunning ? 'Testing...' : 'Test Complete Flow'}
        </Button>
        
        <Button
          onClick={runRealExecution}
          variant="default"
          size="sm"
          className="w-full"
          disabled={isRunning}
        >
          Test REAL Execution
        </Button>
        
        <Button
          onClick={runDebugOnly}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Debug Storage
        </Button>
      </div>

      {testResult && (
        <div className={`p-3 rounded text-sm mb-3 ${
          testResult.success 
            ? 'bg-success/10 text-success border border-success/20' 
            : 'bg-error/10 text-error border border-error/20'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={testResult.success ? 'CheckCircle' : 'XCircle'} 
              size={14} 
            />
            <span className="font-medium">{testResult.message}</span>
          </div>
          
          {testResult.agent && (
            <div className="text-xs opacity-80">
              ✅ Agent: {testResult.agent.name}
            </div>
          )}
          
          {testResult.totalAgents && (
            <div className="text-xs opacity-80">
              📊 Total agents: {testResult.totalAgents}
            </div>
          )}
          
          {testResult.error && (
            <div className="text-xs opacity-80">
              ❌ Error: {testResult.error}
            </div>
          )}
        </div>
      )}

      {executionResult && (
        <div className={`p-3 rounded text-sm mb-3 ${
          executionResult.success 
            ? 'bg-success/10 text-success border border-success/20' 
            : 'bg-error/10 text-error border border-error/20'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={executionResult.success ? 'CheckCircle' : 'XCircle'} 
              size={14} 
            />
            <span className="font-medium">{executionResult.message}</span>
          </div>
          
          {executionResult.realFunctionality && (
            <div className="text-xs space-y-1">
              <div>🌐 API Calls: {executionResult.realFunctionality.dataCollection ? '✅' : '❌'}</div>
              <div>🤖 AI Processing: {executionResult.realFunctionality.aiProcessing ? '✅' : '❌'}</div>
              <div>📊 Insights: {executionResult.realFunctionality.insights ? '✅' : '❌'}</div>
            </div>
          )}
        </div>
      )}

      {debugInfo && (
        <div className="p-3 bg-muted/20 rounded text-xs">
          <div className="font-medium mb-1">Debug Info:</div>
          <div>Local agents: {debugInfo.localAgents?.length || 0}</div>
          <div>Storage keys: {debugInfo.allKeys?.length || 0}</div>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        Console: <code>window.testAgentFlow()</code>
      </div>
    </div>
  );
};

export default TestRunner;