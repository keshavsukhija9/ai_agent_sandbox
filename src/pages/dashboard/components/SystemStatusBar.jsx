import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusBar = () => {
  const systemMetrics = [
    {
      label: 'CPU Usage',
      value: '45%',
      status: 'normal',
      icon: 'Cpu'
    },
    {
      label: 'Memory',
      value: '2.1GB',
      status: 'normal',
      icon: 'HardDrive'
    },
    {
      label: 'Network',
      value: '125ms',
      status: 'normal',
      icon: 'Wifi'
    },
    {
      label: 'Queue',
      value: '3 tasks',
      status: 'warning',
      icon: 'Clock'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {systemMetrics?.map((metric, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon 
                name={metric?.icon} 
                size={16} 
                className={getStatusColor(metric?.status)}
              />
              <div>
                <span className="text-xs text-muted-foreground">{metric?.label}:</span>
                <span className={`text-xs font-medium ml-1 ${getStatusColor(metric?.status)}`}>
                  {metric?.value}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </div>
          <button className="text-xs text-primary hover:text-primary/80 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusBar;