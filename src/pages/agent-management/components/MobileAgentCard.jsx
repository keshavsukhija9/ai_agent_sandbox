import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const MobileAgentCard = ({ 
  agent, 
  isSelected, 
  onSelect, 
  onAgentClick, 
  onAction 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'paused':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      case 'idle':
        return 'text-muted-foreground bg-muted/50';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  const getPerformanceColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-error';
  };

  const formatLastActivity = (timestamp) => {
    const now = new Date();
    const activity = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activity) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect(agent?.id, e?.target?.checked)}
          />
          
          <button
            onClick={() => onAgentClick(agent)}
            className="flex items-start space-x-3 flex-1 text-left"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Bot" size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{agent?.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{agent?.description}</p>
            </div>
          </button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onAction(agent, 'menu')}
          className="h-8 w-8 flex-shrink-0"
        >
          <Icon name="MoreVertical" size={16} />
        </Button>
      </div>
      {/* Status and Quick Info */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent?.status)}`}>
          <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
            agent?.status === 'active' ? 'bg-success status-pulse' : 
            agent?.status === 'error' ? 'bg-error' : 'bg-current'
          }`} />
          {agent?.status?.charAt(0)?.toUpperCase() + agent?.status?.slice(1)}
        </span>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>{formatLastActivity(agent?.lastActivity)}</span>
          <span className={getPerformanceColor(agent?.successRate)}>
            {agent?.successRate}%
          </span>
        </div>
      </div>
      {/* Skills Preview */}
      <div className="flex flex-wrap gap-1 mb-3">
        {agent?.skills?.slice(0, 3)?.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary"
          >
            {skill}
          </span>
        ))}
        {agent?.skills?.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
            +{agent?.skills?.length - 3}
          </span>
        )}
      </div>
      {/* Expandable Details */}
      <div className="border-t border-border pt-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground"
        >
          <span>Details</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {isExpanded && (
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tasks Assigned:</span>
              <span className="text-foreground">{agent?.tasksAssigned}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completed:</span>
              <span className="text-foreground">{agent?.tasksCompleted}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Success Rate:</span>
              <div className="flex items-center space-x-2">
                <span className={`font-medium ${getPerformanceColor(agent?.successRate)}`}>
                  {agent?.successRate}%
                </span>
                <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      agent?.successRate >= 90 ? 'bg-success' :
                      agent?.successRate >= 70 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${agent?.successRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="flex space-x-2 mt-3 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction(agent, agent?.status === 'active' ? 'pause' : 'start')}
          className="flex-1"
        >
          <Icon name={agent?.status === 'active' ? 'Pause' : 'Play'} size={14} className="mr-1" />
          {agent?.status === 'active' ? 'Pause' : 'Start'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction(agent, 'view')}
          className="flex-1"
        >
          <Icon name="Eye" size={14} className="mr-1" />
          View
        </Button>
      </div>
    </div>
  );
};

export default MobileAgentCard;