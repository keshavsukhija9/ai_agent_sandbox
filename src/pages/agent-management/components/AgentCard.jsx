import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AgentCard = ({ agent, status, onRun, onMonitor, onDelete, isExecuting }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{agent.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {agent.description || 'No description provided'}
          </p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              status.status === 'running' ? 'bg-primary animate-pulse' :
              status.status === 'completed' ? 'bg-success' :
              status.status === 'failed' ? 'bg-error' : 'bg-muted-foreground'
            }`} />
            <span className="capitalize">{status.status}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <span className="text-xs text-muted-foreground">Model:</span>
          <p className="text-sm text-foreground">{agent.model || 'Not specified'}</p>
        </div>
        
        {agent.skills && agent.skills.length > 0 && (
          <div>
            <span className="text-xs text-muted-foreground">Skills:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {agent.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {skill.replace('-', ' ')}
                </span>
              ))}
              {agent.skills.length > 3 && (
                <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-full">
                  +{agent.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div>
          <span className="text-xs text-muted-foreground">Created:</span>
          <p className="text-sm text-foreground">
            {new Date(agent.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          size="sm"
          onClick={onRun}
          disabled={isExecuting}
          loading={isExecuting}
          className="flex-1"
        >
          {isExecuting ? (
            <>
              <Icon name="Loader2" size={14} className="mr-1 animate-spin" />
              Running
            </>
          ) : (
            <>
              <Icon name="Play" size={14} className="mr-1" />
              Run
            </>
          )}
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={onMonitor}
        >
          <Icon name="Monitor" size={14} />
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={onDelete}
          className="text-error hover:text-error"
        >
          <Icon name="Trash2" size={14} />
        </Button>
      </div>
    </div>
  );
};

export default AgentCard;