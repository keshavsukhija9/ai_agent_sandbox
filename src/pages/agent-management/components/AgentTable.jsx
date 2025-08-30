import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AgentTable = ({ 
  agents, 
  selectedAgents, 
  onSelectAgent, 
  onSelectAll, 
  onSort, 
  sortConfig, 
  onAgentClick,
  onAgentAction 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

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

  const handleSort = (column) => {
    const direction = sortConfig?.key === column && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key: column, direction });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
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
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedAgents?.length === agents?.length && agents?.length > 0}
                  indeterminate={selectedAgents?.length > 0 && selectedAgents?.length < agents?.length}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Agent Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Last Activity</span>
                  <Icon name={getSortIcon('lastActivity')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('successRate')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Success Rate</span>
                  <Icon name={getSortIcon('successRate')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('tasksAssigned')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Tasks</span>
                  <Icon name={getSortIcon('tasksAssigned')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-foreground">Skills</span>
              </th>
              <th className="w-12 px-4 py-3">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {agents?.map((agent) => (
              <tr
                key={agent?.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors ${
                  selectedAgents?.includes(agent?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(agent?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedAgents?.includes(agent?.id)}
                    onChange={(e) => onSelectAgent(agent?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => onAgentClick(agent)}
                    className="flex items-center space-x-3 hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Bot" size={16} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">{agent?.name}</div>
                      <div className="text-xs text-muted-foreground">{agent?.description}</div>
                    </div>
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent?.status)}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                        agent?.status === 'active' ? 'bg-success status-pulse' : 
                        agent?.status === 'error' ? 'bg-error' : 'bg-current'
                      }`} />
                      {agent?.status?.charAt(0)?.toUpperCase() + agent?.status?.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-muted-foreground">
                    {formatLastActivity(agent?.lastActivity)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getPerformanceColor(agent?.successRate)}`}>
                      {agent?.successRate}%
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          agent?.successRate >= 90 ? 'bg-success' :
                          agent?.successRate >= 70 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${agent?.successRate}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{agent?.tasksAssigned}</span>
                    <span className="text-xs text-muted-foreground">
                      ({agent?.tasksCompleted} completed)
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {agent?.skills?.slice(0, 2)?.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                    {agent?.skills?.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                        +{agent?.skills?.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onAgentAction(agent, 'menu');
                      }}
                      className="h-8 w-8"
                    >
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {agents?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Bot" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No agents found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first AI agent or adjust your filters to see results.
          </p>
          <Button variant="outline" onClick={() => onAgentAction(null, 'create')}>
            <Icon name="Plus" size={16} className="mr-2" />
            Create Agent
          </Button>
        </div>
      )}
    </div>
  );
};

export default AgentTable;