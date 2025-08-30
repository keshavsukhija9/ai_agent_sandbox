import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import AgentTable from './components/AgentTable';
import FilterBar from './components/FilterBar';
import BulkActionsPanel from './components/BulkActionsPanel';
import AgentDetailModal from './components/AgentDetailModal';
import ActionMenu from './components/ActionMenu';
import MobileAgentCard from './components/MobileAgentCard';
import Pagination from './components/Pagination';

const AgentManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [actionMenu, setActionMenu] = useState({ isOpen: false, agent: null, position: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    performance: 'all',
    skillCategory: 'all'
  });

  // Mock agents data
  const mockAgents = [
    {
      id: 1,
      name: "DataHarvester Pro",
      description: "Advanced web scraping agent for e-commerce data extraction",
      status: "active",
      lastActivity: new Date(Date.now() - 300000),
      successRate: 94,
      tasksAssigned: 45,
      tasksCompleted: 42,
      skills: ["Web Scraping", "Data Analysis", "API Integration", "Content Extraction"],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      name: "ContentCurator AI",
      description: "Intelligent content generation and curation assistant",
      status: "paused",
      lastActivity: new Date(Date.now() - 1800000),
      successRate: 87,
      tasksAssigned: 32,
      tasksCompleted: 28,
      skills: ["Content Generation", "Research", "SEO Optimization"],
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      name: "MarketAnalyzer Bot",
      description: "Real-time market data analysis and reporting agent",
      status: "active",
      lastActivity: new Date(Date.now() - 120000),
      successRate: 96,
      tasksAssigned: 78,
      tasksCompleted: 75,
      skills: ["Data Analysis", "Market Research", "Report Generation", "Automation"],
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      name: "SocialMediaManager",
      description: "Automated social media posting and engagement agent",
      status: "error",
      lastActivity: new Date(Date.now() - 3600000),
      successRate: 72,
      tasksAssigned: 56,
      tasksCompleted: 40,
      skills: ["Social Media", "Content Scheduling", "Engagement Tracking"],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 5,
      name: "EmailAutomator Plus",
      description: "Intelligent email campaign management and automation",
      status: "active",
      lastActivity: new Date(Date.now() - 600000),
      successRate: 91,
      tasksAssigned: 123,
      tasksCompleted: 112,
      skills: ["Email Marketing", "Automation", "Analytics", "Personalization"],
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    },
    {
      id: 6,
      name: "CustomerSupport AI",
      description: "24/7 customer support chatbot with natural language processing",
      status: "active",
      lastActivity: new Date(Date.now() - 60000),
      successRate: 89,
      tasksAssigned: 234,
      tasksCompleted: 208,
      skills: ["Natural Language Processing", "Customer Service", "Chat Integration"],
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: 7,
      name: "InventoryTracker",
      description: "Automated inventory monitoring and restocking alerts",
      status: "idle",
      lastActivity: new Date(Date.now() - 7200000),
      successRate: 98,
      tasksAssigned: 89,
      tasksCompleted: 87,
      skills: ["Inventory Management", "Monitoring", "Alert Systems"],
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    },
    {
      id: 8,
      name: "CompetitorWatcher",
      description: "Continuous competitor analysis and price monitoring",
      status: "active",
      lastActivity: new Date(Date.now() - 900000),
      successRate: 85,
      tasksAssigned: 67,
      tasksCompleted: 57,
      skills: ["Competitive Analysis", "Price Monitoring", "Market Intelligence"],
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000)
    }
  ];

  // Filter and sort agents
  const filteredAndSortedAgents = useMemo(() => {
    let filtered = mockAgents?.filter(agent => {
      // Search filter
      if (filters?.search && !agent?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
          !agent?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters?.status !== 'all' && agent?.status !== filters?.status) {
        return false;
      }

      // Performance filter
      if (filters?.performance !== 'all') {
        if (filters?.performance === 'excellent' && agent?.successRate < 90) return false;
        if (filters?.performance === 'good' && (agent?.successRate < 70 || agent?.successRate >= 90)) return false;
        if (filters?.performance === 'poor' && agent?.successRate >= 70) return false;
      }

      // Skill category filter
      if (filters?.skillCategory !== 'all') {
        const skillMap = {
          'web-scraping': ['Web Scraping', 'Data Extraction'],
          'data-analysis': ['Data Analysis', 'Analytics'],
          'automation': ['Automation', 'Automated'],
          'communication': ['Communication', 'Email', 'Social Media'],
          'research': ['Research', 'Market Research'],
          'content-generation': ['Content Generation', 'Content']
        };
        
        const relevantSkills = skillMap?.[filters?.skillCategory] || [];
        if (!agent?.skills?.some(skill => 
          relevantSkills?.some(relevant => skill?.toLowerCase()?.includes(relevant?.toLowerCase()))
        )) {
          return false;
        }
      }

      return true;
    });

    // Sort agents
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'lastActivity') {
        aValue = new Date(aValue)?.getTime();
        bValue = new Date(bValue)?.getTime();
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAgents?.length / pageSize);
  const paginatedAgents = filteredAndSortedAgents?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      dateRange: 'all',
      performance: 'all',
      skillCategory: 'all'
    });
  };

  const handleSelectAgent = (agentId, isSelected) => {
    if (isSelected) {
      setSelectedAgents(prev => [...prev, agentId]);
    } else {
      setSelectedAgents(prev => prev?.filter(id => id !== agentId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedAgents(paginatedAgents?.map(agent => agent?.id));
    } else {
      setSelectedAgents([]);
    }
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    setIsDetailModalOpen(true);
  };

  const handleAgentAction = (agent, action, event) => {
    if (action === 'menu' && event) {
      const rect = event?.target?.getBoundingClientRect();
      setActionMenu({
        isOpen: true,
        agent,
        position: {
          top: rect?.bottom + window.scrollY,
          left: rect?.left + window.scrollX
        }
      });
      return;
    }

    switch (action) {
      case 'create': navigate('/agent-creation');
        break;
      case 'view':
        setSelectedAgent(agent);
        setIsDetailModalOpen(true);
        break;
      case 'edit':
        navigate(`/agent-creation?edit=${agent?.id}`);
        break;
      case 'start': console.log('Starting agent:', agent?.name);
        break;
      case 'pause': console.log('Pausing agent:', agent?.name);
        break;
      case 'restart': console.log('Restarting agent:', agent?.name);
        break;
      case 'duplicate': console.log('Duplicating agent:', agent?.name);
        break;
      case 'delete':
        console.log('Deleting agent:', agent?.name);
        break;
      case 'export':
        console.log('Exporting agent config:', agent?.name);
        break;
      case 'logs': console.log('Viewing logs for agent:', agent?.name);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleBulkAction = (action, agentIds) => {
    console.log(`Bulk ${action} for agents:`, agentIds);
    setSelectedAgents([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSidebarToggle={handleSidebarToggle}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        className="hidden lg:block"
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <Breadcrumb />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Agent Management</h1>
                <p className="text-muted-foreground mt-1">
                  Monitor, control, and manage your AI agents
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => window.location?.reload()}
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Refresh
                </Button>
                
                <Button
                  onClick={() => navigate('/agent-creation')}
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Create Agent
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            resultCount={filteredAndSortedAgents?.length}
          />

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <AgentTable
              agents={paginatedAgents}
              selectedAgents={selectedAgents}
              onSelectAgent={handleSelectAgent}
              onSelectAll={handleSelectAll}
              onSort={handleSort}
              sortConfig={sortConfig}
              onAgentClick={handleAgentClick}
              onAgentAction={(agent, action, event) => {
                if (action === 'menu') {
                  const rect = event?.currentTarget?.getBoundingClientRect();
                  setActionMenu({
                    isOpen: true,
                    agent,
                    position: {
                      top: rect?.bottom + window.scrollY + 8,
                      left: rect?.right + window.scrollX
                    }
                  });
                } else {
                  handleAgentAction(agent, action, event);
                }
              }}
            />
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {paginatedAgents?.map((agent) => (
              <MobileAgentCard
                key={agent?.id}
                agent={agent}
                isSelected={selectedAgents?.includes(agent?.id)}
                onSelect={handleSelectAgent}
                onAgentClick={handleAgentClick}
                onAction={handleAgentAction}
              />
            ))}
            
            {paginatedAgents?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Bot" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No agents found</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first AI agent or adjust your filters to see results.
                </p>
                <Button variant="outline" onClick={() => navigate('/agent-creation')}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Create Agent
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredAndSortedAgents?.length > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={filteredAndSortedAgents?.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}
        </div>
      </main>
      {/* Bulk Actions Panel */}
      <BulkActionsPanel
        selectedAgents={selectedAgents}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedAgents([])}
      />
      {/* Agent Detail Modal */}
      <AgentDetailModal
        agent={selectedAgent}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAgent(null);
        }}
        onAction={handleAgentAction}
      />
      {/* Action Menu */}
      <ActionMenu
        agent={actionMenu?.agent}
        isOpen={actionMenu?.isOpen}
        onClose={() => setActionMenu({ isOpen: false, agent: null, position: null })}
        onAction={handleAgentAction}
        position={actionMenu?.position}
      />
      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          onClick={() => navigate('/agent-creation')}
          className="rounded-full w-14 h-14 elevation-strong"
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default AgentManagement;