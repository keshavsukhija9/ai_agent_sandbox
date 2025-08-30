import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NodeDetailsPanel = ({ selectedNode, isCollapsed, onToggle }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedNode) {
    return (
      <div className={`bg-card border-l border-border h-full flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-80'
      }`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <h3 className="text-sm font-semibold text-foreground">Node Details</h3>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-8 h-8"
          >
            <Icon 
              name={isCollapsed ? 'ChevronLeft' : 'ChevronRight'} 
              size={16} 
            />
          </Button>
        </div>
        
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Select a node to view details
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'running': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      case 'pending': return 'text-muted-foreground bg-muted/50';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'running': return 'Play';
      case 'failed': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    return new Date(time)?.toLocaleTimeString();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'logs', label: 'Logs', icon: 'FileText' },
    { id: 'metrics', label: 'Metrics', icon: 'BarChart3' }
  ];

  const mockLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      level: 'info',
      message: 'Task execution started'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 240000),
      level: 'info',
      message: 'Browser instance created successfully'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 180000),
      level: 'warning',
      message: 'Rate limiting detected, implementing delay'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 120000),
      level: 'info',
      message: 'Data extraction in progress'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 60000),
      level: 'success',
      message: 'Task completed successfully'
    }
  ];

  const mockMetrics = {
    memoryUsage: '45.2 MB',
    cpuUsage: '12.5%',
    networkRequests: 23,
    dataProcessed: '1.2 MB',
    errorRate: '0.8%',
    successRate: '99.2%'
  };

  return (
    <div className={`bg-card border-l border-border h-full flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <h3 className="text-sm font-semibold text-foreground">Node Details</h3>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-8 h-8"
        >
          <Icon 
            name={isCollapsed ? 'ChevronLeft' : 'ChevronRight'} 
            size={16} 
          />
        </Button>
      </div>
      {!isCollapsed && (
        <>
          {/* Node Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-md ${getStatusColor(selectedNode?.status)}`}>
                <Icon name={getStatusIcon(selectedNode?.status)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">
                  {selectedNode?.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedNode?.type} • {selectedNode?.status}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name={tab?.icon} size={12} />
                    <span>{tab?.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="p-4 space-y-4">
                <div>
                  <h5 className="text-xs font-semibold text-foreground mb-2">Description</h5>
                  <p className="text-sm text-muted-foreground">
                    {selectedNode?.description || 'No description available'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-1">Start Time</h5>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(selectedNode?.startTime)}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-1">End Time</h5>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(selectedNode?.endTime)}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-foreground mb-1">Duration</h5>
                  <p className="text-sm text-muted-foreground">
                    {formatDuration(selectedNode?.duration)}
                  </p>
                </div>

                {selectedNode?.output && (
                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-2">Output</h5>
                    <div className="bg-muted rounded-md p-3">
                      <p className="text-sm text-foreground font-mono">
                        {selectedNode?.output}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="p-4">
                <div className="space-y-3">
                  {mockLogs?.map(log => (
                    <div key={log?.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        log?.level === 'error' ? 'bg-error' :
                        log?.level === 'warning' ? 'bg-warning' :
                        log?.level === 'success' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{log?.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {log?.timestamp?.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="p-4 space-y-4">
                {Object.entries(mockMetrics)?.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Download" size={14} className="mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NodeDetailsPanel;