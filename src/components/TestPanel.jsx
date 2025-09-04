import React, { useState } from 'react';
import Button from './ui/Button';
import Icon from './AppIcon';
import { testAgentCreation } from '../utils/testAgentCreation';

const TestPanel = () => {
  const [testResult, setTestResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = async () => {
    setIsRunning(true);
    setTestResult(null);
    
    try {
      const result = await testAgentCreation();
      setTestResult(result);
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

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-foreground">Agent Creation Test</h3>
        <Icon name="TestTube" size={16} className="text-primary" />
      </div>
      
      <Button
        onClick={runTest}
        loading={isRunning}
        disabled={isRunning}
        size="sm"
        className="w-full mb-3"
      >
        {isRunning ? 'Testing...' : 'Test Agent Creation'}
      </Button>

      {testResult && (
        <div className={`p-3 rounded text-sm ${
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
              Created: {testResult.agent.name}
            </div>
          )}
          
          {testResult.error && (
            <div className="text-xs opacity-80">
              Error: {testResult.error}
            </div>
          )}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        Or run <code>window.testAgentCreation()</code> in console
      </div>
    </div>
  );
};

export default TestPanel;