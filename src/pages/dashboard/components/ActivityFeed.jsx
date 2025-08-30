import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'agent_created',
      title: 'New agent "DataProcessor" created',
      description: 'Web scraping agent for e-commerce data collection',
      timestamp: new Date(Date.now() - 300000),
      icon: 'Bot',
      color: 'success'
    },
    {
      id: 2,
      type: 'task_completed',
      title: 'Task completed successfully',
      description: 'Agent "ContentAnalyzer" finished processing 150 articles',
      timestamp: new Date(Date.now() - 900000),
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 3,
      type: 'agent_error',
      title: 'Agent execution error',
      description: 'Agent "WebCrawler" encountered rate limiting on target site',
      timestamp: new Date(Date.now() - 1800000),
      icon: 'AlertTriangle',
      color: 'error'
    },
    {
      id: 4,
      type: 'collaboration',
      title: 'Multi-agent collaboration started',
      description: 'Agents "DataCollector" and "DataProcessor" began joint task',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'Users',
      color: 'primary'
    },
    {
      id: 5,
      type: 'skill_learned',
      title: 'New skill acquired',
      description: 'Agent "LearnBot" learned natural language processing skill',
      timestamp: new Date(Date.now() - 7200000),
      icon: 'Brain',
      color: 'warning'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getColorClasses(activity?.color)}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">
                {activity?.title}
              </p>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {activity?.description}
              </p>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(activity?.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;