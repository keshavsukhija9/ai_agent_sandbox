import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: 'Create New Agent',
      description: 'Build a custom AI agent with natural language instructions',
      icon: 'Plus',
      color: 'primary',
      action: () => navigate('/agent-creation')
    },
    {
      id: 2,
      title: 'Manage Agents',
      description: 'View and control all your active AI agents',
      icon: 'Settings',
      color: 'secondary',
      action: () => navigate('/agent-management')
    },
    {
      id: 3,
      title: 'Task Visualization',
      description: 'Explore agent task trees and workflows',
      icon: 'GitBranch',
      color: 'accent',
      action: () => navigate('/task-tree-visualization')
    }
  ];

  const agentTemplates = [
    {
      id: 1,
      name: 'Web Scraper',
      description: 'Extract data from websites automatically',
      icon: 'Globe',
      usageCount: 245
    },
    {
      id: 2,
      name: 'Content Analyzer',
      description: 'Analyze and categorize text content',
      icon: 'FileText',
      usageCount: 189
    },
    {
      id: 3,
      name: 'Data Processor',
      description: 'Clean and transform datasets',
      icon: 'Database',
      usageCount: 156
    },
    {
      id: 4,
      name: 'API Monitor',
      description: 'Monitor API endpoints and responses',
      icon: 'Activity',
      usageCount: 98
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border hover:bg-muted/20';
    }
  };

  const handleTemplateUse = (template) => {
    navigate('/agent-creation', { state: { template } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      {/* Primary Actions */}
      <div className="space-y-3 mb-8">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-current/10 flex items-center justify-center">
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">{action?.title}</h4>
                <p className="text-xs opacity-80">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="opacity-60" />
            </div>
          </button>
        ))}
      </div>
      {/* Agent Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-foreground">Popular Templates</h4>
          <button className="text-xs text-primary hover:text-primary/80 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {agentTemplates?.map((template) => (
            <div
              key={template?.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => handleTemplateUse(template)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Icon name={template?.icon} size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-foreground">{template?.name}</h5>
                  <p className="text-xs text-muted-foreground">{template?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">{template?.usageCount} uses</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Status */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">System Status</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">API Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-success">Operational</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Agent Capacity</span>
            <span className="text-xs text-foreground">12/50 active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Queue Status</span>
            <span className="text-xs text-foreground">3 pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;