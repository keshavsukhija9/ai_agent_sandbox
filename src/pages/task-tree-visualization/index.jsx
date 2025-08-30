import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TaskTreeCanvas from './components/TaskTreeCanvas';
import TreeNavigationSidebar from './components/TreeNavigationSidebar';
import NodeDetailsPanel from './components/NodeDetailsPanel';
import VisualizationControls from './components/VisualizationControls';
import ExecutionTimeline from './components/ExecutionTimeline';

const TaskTreeVisualization = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [treeNavCollapsed, setTreeNavCollapsed] = useState(false);
  const [detailsPanelCollapsed, setDetailsPanelCollapsed] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState('web-scraper-1');
  const [timelinePosition, setTimelinePosition] = useState(65);
  const [showControls, setShowControls] = useState(true);
  const [showTimeline, setShowTimeline] = useState(true);

  const [filters, setFilters] = useState({
    showCompleted: true,
    showRunning: true,
    showPending: true,
    showFailed: true,
    showLabels: true,
    showTiming: false,
    animate: true,
    realTime: false,
    layout: 'tree'
  });

  // Mock WebSocket connection for real-time updates
  useEffect(() => {
    if (filters?.realTime) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        console.log('Real-time update received');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filters?.realTime]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleTreeNavToggle = () => {
    setTreeNavCollapsed(!treeNavCollapsed);
  };

  const handleDetailsPanelToggle = () => {
    setDetailsPanelCollapsed(!detailsPanelCollapsed);
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    if (detailsPanelCollapsed) {
      setDetailsPanelCollapsed(false);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAgentChange = (agentId) => {
    setSelectedAgent(agentId);
    setSelectedNode(null); // Reset selected node when changing agents
  };

  const handleTimelineChange = (position) => {
    if (typeof position === 'function') {
      setTimelinePosition(prev => position(prev));
    } else {
      setTimelinePosition(position);
    }
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement?.requestFullscreen();
    }
  };

  const handleRefresh = () => {
    // Simulate data refresh
    setSelectedNode(null);
    setTimelinePosition(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarCollapsed={sidebarCollapsed} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      } pt-16`}>
        <div className="h-screen flex flex-col">
          {/* Page Header */}
          <div className="p-6 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <Breadcrumb />
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="GitBranch" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">Task Tree Visualization</h1>
                      <p className="text-sm text-muted-foreground">
                        Interactive workflow execution and decision-making analysis
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowControls(!showControls)}
                  iconName={showControls ? 'EyeOff' : 'Eye'}
                  iconPosition="left"
                >
                  {showControls ? 'Hide' : 'Show'} Controls
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTimeline(!showTimeline)}
                  iconName="Clock"
                  iconPosition="left"
                >
                  Timeline
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFullscreen}
                  iconName="Maximize"
                  iconPosition="left"
                >
                  Fullscreen
                </Button>
              </div>
            </div>
          </div>

          {/* Visualization Layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar - Tree Navigation */}
            <TreeNavigationSidebar
              onNodeSelect={handleNodeSelect}
              selectedNode={selectedNode}
              isCollapsed={treeNavCollapsed}
              onToggle={handleTreeNavToggle}
            />

            {/* Main Visualization Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Controls Panel */}
              {showControls && (
                <div className="p-4 border-b border-border bg-card">
                  <VisualizationControls
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    timelinePosition={timelinePosition}
                    onTimelineChange={handleTimelineChange}
                    selectedAgent={selectedAgent}
                    onAgentChange={handleAgentChange}
                  />
                </div>
              )}

              {/* Canvas Area */}
              <div className="flex-1 p-4">
                <TaskTreeCanvas
                  selectedAgent={selectedAgent}
                  onNodeSelect={handleNodeSelect}
                  selectedNode={selectedNode}
                  filters={filters}
                  timelinePosition={timelinePosition}
                />
              </div>

              {/* Timeline Panel */}
              {showTimeline && (
                <div className="p-4 border-t border-border bg-card">
                  <ExecutionTimeline
                    selectedNode={selectedNode}
                    timelinePosition={timelinePosition}
                    onTimelineChange={handleTimelineChange}
                  />
                </div>
              )}
            </div>

            {/* Right Sidebar - Node Details */}
            <NodeDetailsPanel
              selectedNode={selectedNode}
              isCollapsed={detailsPanelCollapsed}
              onToggle={handleDetailsPanelToggle}
            />
          </div>
        </div>
      </main>

      {/* Mobile Responsive Overlay */}
      <div className="lg:hidden">
        {(!treeNavCollapsed || !detailsPanelCollapsed) && (
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setTreeNavCollapsed(true);
              setDetailsPanelCollapsed(true);
            }}
          />
        )}
      </div>

      {/* Mobile Controls */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-card border border-border rounded-lg p-3 elevation-strong">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTreeNavCollapsed(!treeNavCollapsed)}
              iconName="List"
              iconPosition="left"
            >
              Tree
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowControls(!showControls)}
              iconName="Settings"
              iconPosition="left"
            >
              Controls
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDetailsPanelCollapsed(!detailsPanelCollapsed)}
              iconName="Info"
              iconPosition="left"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTreeVisualization;