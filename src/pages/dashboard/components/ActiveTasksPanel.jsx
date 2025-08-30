import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ActiveTasksPanel = () => {
  const [expandedTask, setExpandedTask] = useState(null);

  const activeTasks = [
    {
      id: 1,
      title: 'E-commerce Data Collection',
      agent: 'DataProcessor',
      progress: 75,
      status: 'running',
      estimatedTime: '15 min',
      subtasks: [
        { id: 1, name: 'Product URL extraction', status: 'completed', progress: 100 },
        { id: 2, name: 'Price data scraping', status: 'running', progress: 80 },
        { id: 3, name: 'Image URL collection', status: 'pending', progress: 0 },
        { id: 4, name: 'Data validation', status: 'pending', progress: 0 }
      ]
    },
    {
      id: 2,
      title: 'Content Analysis Pipeline',
      agent: 'ContentAnalyzer',
      progress: 45,
      status: 'running',
      estimatedTime: '8 min',
      subtasks: [
        { id: 1, name: 'Text preprocessing', status: 'completed', progress: 100 },
        { id: 2, name: 'Sentiment analysis', status: 'running', progress: 60 },
        { id: 3, name: 'Topic extraction', status: 'pending', progress: 0 },
        { id: 4, name: 'Report generation', status: 'pending', progress: 0 }
      ]
    },
    {
      id: 3,
      title: 'Multi-Agent Collaboration',
      agent: 'CollaborationHub',
      progress: 30,
      status: 'running',
      estimatedTime: '25 min',
      subtasks: [
        { id: 1, name: 'Task distribution', status: 'completed', progress: 100 },
        { id: 2, name: 'Agent coordination', status: 'running', progress: 40 },
        { id: 3, name: 'Data synchronization', status: 'pending', progress: 0 },
        { id: 4, name: 'Result aggregation', status: 'pending', progress: 0 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'running':
        return 'text-primary';
      case 'pending':
        return 'text-muted-foreground';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'running':
        return 'Play';
      case 'pending':
        return 'Clock';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const toggleTaskExpansion = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Active Tasks</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activeTasks?.map((task) => (
          <div key={task?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTaskExpansion(task?.id)}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-medium text-foreground">{task?.title}</h4>
                  <Icon 
                    name={expandedTask === task?.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="Bot" size={12} />
                    <span>{task?.agent}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{task?.estimatedTime}</span>
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task?.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">{task?.progress}% complete</span>
                  <div className={`flex items-center space-x-1 ${getStatusColor(task?.status)}`}>
                    <Icon name={getStatusIcon(task?.status)} size={12} />
                    <span className="text-xs capitalize">{task?.status}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {expandedTask === task?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="text-xs font-medium text-muted-foreground mb-3">Subtasks</h5>
                <div className="space-y-2">
                  {task?.subtasks?.map((subtask) => (
                    <div key={subtask?.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getStatusIcon(subtask?.status)} 
                          size={14} 
                          className={getStatusColor(subtask?.status)}
                        />
                        <span className="text-xs text-foreground">{subtask?.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{subtask?.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTasksPanel;