import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import ActiveTasksPanel from './components/ActiveTasksPanel';
import QuickActionsPanel from './components/QuickActionsPanel';
import SystemStatusBar from './components/SystemStatusBar';
import UserProfile from '../../components/ui/UserProfile';
import TestPanel from '../../components/TestPanel';
import TestRunner from '../../components/TestRunner';
import Button from '../../components/ui/Button';
import { supabaseService } from '../../services/supabaseService';


const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Check for mock user first
        const mockUser = localStorage.getItem('mockUser');
        if (mockUser) {
          const user = JSON.parse(mockUser);
          console.log('Using mock user:', user.name, 'via', user.provider);
        }
        
        const user = await supabaseService.getCurrentUser();
        const { data: agents } = await supabaseService.getAgents(user?.id);
        console.log('Loaded agents:', agents);
      } catch (error) {
        console.log('Using demo mode');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  

  const metricsData = [
    {
      title: 'Active Agents',
      value: '12',
      change: '+3 from yesterday',
      changeType: 'positive',
      icon: 'Bot',
      color: 'primary'
    },
    {
      title: 'Completed Tasks',
      value: '847',
      change: '+12% this week',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1% improvement',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      title: 'System Load',
      value: '67%',
      change: 'Normal range',
      changeType: 'neutral',
      icon: 'Activity',
      color: 'warning'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSidebarToggle={handleSidebarToggle} isSidebarCollapsed={isSidebarCollapsed} />
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
        
        <main className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarCollapsed={isSidebarCollapsed} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <Breadcrumb />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Monitor your AI agents and track system performance
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  size="sm"
                >
                  Refresh
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/agent-creation')}
                >
                  Create Agent
                </Button>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <UserProfile />

          {/* System Status Bar */}
          <SystemStatusBar />
          
          {/* Test Panel */}
          <TestPanel />
          
          {/* Test Runner */}
          <TestRunner />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Activity Feed - Left Column */}
            <div className="lg:col-span-4">
              <ActivityFeed />
            </div>

            {/* Active Tasks - Center Column */}
            <div className="lg:col-span-5">
              <ActiveTasksPanel />
            </div>

            {/* Quick Actions - Right Column */}
            <div className="lg:col-span-3">
              <QuickActionsPanel />
            </div>
          </div>

          

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date()?.toLocaleString()}
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button 
                  onClick={() => navigate('/agent-management')}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  View All Agents
                </button>
                <button 
                  onClick={() => navigate('/task-tree-visualization')}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Task Visualizations
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;