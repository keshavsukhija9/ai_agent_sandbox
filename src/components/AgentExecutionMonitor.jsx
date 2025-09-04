import React, { useState, useEffect } from 'react';
import { realAgentExecutor } from '../services/realAgentExecutor';
import Icon from './AppIcon';
import Button from './ui/Button';

const AgentExecutionMonitor = ({ agentId, onClose }) => {
  const [execution, setExecution] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const status = realAgentExecutor.getAgentStatus(agentId);
      if (status.execution) {
        setExecution(status.execution);
        setIsRunning(status.status === 'running');
      } else if (status.lastExecution) {
        setExecution(status.lastExecution);
        setIsRunning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [agentId]);

  if (!execution) {
    return (
      <div className="p-6 text-center">
        <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No execution data available</p>
      </div>
    );
  }

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed': return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'failed': return <Icon name="XCircle" size={16} className="text-error" />;
      case 'running': return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default: return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      case 'running': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Agent Execution Monitor</h3>
          <p className="text-sm text-muted-foreground">{execution.agentName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isRunning ? 'bg-primary/10 text-primary' : 
            execution.status === 'completed' ? 'bg-success/10 text-success' :
            execution.status === 'failed' ? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
          }`}>
            {isRunning ? 'Running' : execution.status}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      {/* Execution Timeline */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Execution Steps</h4>
        <div className="space-y-3">
          {execution.steps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                {getStepIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{step.action}</p>
                  <span className={`text-xs ${getStatusColor(step.status)}`}>
                    {step.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                {step.result && (
                  <div className="mt-2 p-2 bg-muted/30 rounded text-xs">
                    <p className="text-foreground">{step.result.message}</p>
                    {step.result.data && (
                      <pre className="mt-1 text-muted-foreground overflow-x-auto">
                        {JSON.stringify(step.result.data, null, 2)}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Summary */}
      {execution.result && (
        <div className="mt-6 p-4 bg-muted/10 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Execution Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Steps:</span>
              <span className="ml-2 text-foreground">{execution.result.totalSteps}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="ml-2 text-foreground">
                {Math.round(execution.result.successRate * 100)}%
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <span className="ml-2 text-foreground">
                {execution.endTime ? 
                  Math.round((new Date(execution.endTime) - new Date(execution.startTime)) / 1000) + 's' :
                  'Running...'
                }
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <span className={`ml-2 ${getStatusColor(execution.status)}`}>
                {execution.status}
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {execution.result.executionSummary}
          </p>
        </div>
      )}

      {/* Error Display */}
      {execution.error && (
        <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <h4 className="font-medium text-error">Execution Error</h4>
          </div>
          <p className="text-sm text-error">{execution.error}</p>
        </div>
      )}
    </div>
  );
};

export default AgentExecutionMonitor;