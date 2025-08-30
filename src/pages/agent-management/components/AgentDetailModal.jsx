import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AgentDetailModal = ({ agent, isOpen, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !agent) return null;

  const performanceData = [
    { name: 'Mon', success: 95, failed: 5 },
    { name: 'Tue', success: 88, failed: 12 },
    { name: 'Wed', success: 92, failed: 8 },
    { name: 'Thu', success: 97, failed: 3 },
    { name: 'Fri', success: 89, failed: 11 },
    { name: 'Sat', success: 94, failed: 6 },
    { name: 'Sun', success: 91, failed: 9 }
  ];

  const activityData = [
    { time: '00:00', tasks: 2 },
    { time: '04:00', tasks: 1 },
    { time: '08:00', tasks: 8 },
    { time: '12:00', tasks: 12 },
    { time: '16:00', tasks: 15 },
    { time: '20:00', tasks: 7 }
  ];

  const recentTasks = [
    {
      id: 1,
      name: "Extract product data from e-commerce site",
      status: "completed",
      duration: "2m 34s",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      name: "Generate weekly sales report",
      status: "completed",
      duration: "1m 45s",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 3,
      name: "Monitor competitor pricing",
      status: "running",
      duration: "5m 12s",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 4,
      name: "Send notification emails",
      status: "failed",
      duration: "0m 23s",
      timestamp: new Date(Date.now() - 3600000)
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'running':
        return 'text-primary bg-primary/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  const formatDuration = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / (1000 * 60));
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'tasks', label: 'Task History', icon: 'History' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'configuration', label: 'Configuration', icon: 'Settings' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg elevation-strong max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Bot" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{agent?.name}</h2>
              <p className="text-muted-foreground">{agent?.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAction(agent, 'edit')}
            >
              <Icon name="Edit" size={16} className="mr-2" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className={`font-medium capitalize ${
                        agent?.status === 'active' ? 'text-success' :
                        agent?.status === 'error' ? 'text-error' : 'text-warning'
                      }`}>
                        {agent?.status}
                      </p>
                    </div>
                    <Icon name="Activity" size={20} className="text-muted-foreground" />
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="font-medium text-foreground">{agent?.successRate}%</p>
                    </div>
                    <Icon name="TrendingUp" size={20} className="text-success" />
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                      <p className="font-medium text-foreground">{agent?.tasksCompleted}</p>
                    </div>
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                      <p className="font-medium text-foreground">99.2%</p>
                    </div>
                    <Icon name="Clock" size={20} className="text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Skills & Capabilities</h3>
                <div className="flex flex-wrap gap-2">
                  {agent?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Recent Tasks</h3>
                <div className="space-y-3">
                  {recentTasks?.slice(0, 3)?.map((task) => (
                    <div key={task?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task?.status)}`}>
                          {task?.status}
                        </span>
                        <span className="text-sm text-foreground">{task?.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDuration(task?.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Task History</h3>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="space-y-3">
                {recentTasks?.map((task) => (
                  <div key={task?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{task?.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task?.status)}`}>
                        {task?.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Duration: {task?.duration}</span>
                      <span>{formatDuration(task?.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-4">Performance Trends</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="success" fill="var(--color-success)" />
                      <Bar dataKey="failed" fill="var(--color-error)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-4">Daily Activity</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="tasks" stroke="var(--color-primary)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'configuration' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-4">Agent Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Agent Name</label>
                    <div className="p-3 bg-muted/30 rounded-md text-sm text-foreground">
                      {agent?.name}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Model</label>
                    <div className="p-3 bg-muted/30 rounded-md text-sm text-foreground">
                      GPT-4o-mini
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Max Concurrent Tasks</label>
                    <div className="p-3 bg-muted/30 rounded-md text-sm text-foreground">
                      5
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Timeout (minutes)</label>
                    <div className="p-3 bg-muted/30 rounded-md text-sm text-foreground">
                      30
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-4">Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-foreground">Web Browsing</span>
                    <Icon name="Check" size={16} className="text-success" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-foreground">File System Access</span>
                    <Icon name="X" size={16} className="text-error" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-foreground">API Calls</span>
                    <Icon name="Check" size={16} className="text-success" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-foreground">Email Sending</span>
                    <Icon name="Check" size={16} className="text-success" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetailModal;