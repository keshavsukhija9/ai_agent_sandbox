import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { supabaseService } from '../../services/supabaseService';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import AgentCard from './components/AgentCard';
import AgentExecutionMonitor from '../../components/AgentExecutionMonitor';
import { realAgentExecutor } from '../../services/realAgentExecutor';

const AgentManagement = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [executingAgents, setExecutingAgents] = useState(new Set());
  const [monitoringAgent, setMonitoringAgent] = useState(null);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      // FORCE: Always check localStorage first and create demo agent if needed
      let localAgents = JSON.parse(localStorage.getItem('demo_agents') || '[]');
      
      // If no agents exist, create a demo one immediately
      if (localAgents.length === 0) {
        const demoAgent = {
          id: 'demo_' + Date.now(),
          name: 'Demo Market Analyzer',
          description: 'Demo agent - Create your own agents!',
          task_input: 'Analyze cryptocurrency market trends and provide investment insights',
          model: 'facebook/bart-large-mnli',
          skills: ['web-scraping', 'ai-processing', 'data-analysis'],
          status: 'active',
          created_at: new Date().toISOString(),
          created_by: 'demo_user'
        };
        localAgents = [demoAgent];
        localStorage.setItem('demo_agents', JSON.stringify(localAgents));
        console.log('✅ Created demo agent automatically');
      }
      
      console.log('📦 Local agents found:', localAgents.length);
      
      // Always show local agents immediately
      setAgents(localAgents);
      
      // Try to get Supabase agents in background
      try {
        const user = await supabaseService.getCurrentUser();
        const { data: supabaseAgents } = await supabaseService.getAgents(user.id);
        
        if (supabaseAgents && supabaseAgents.length > 0) {
          // Merge unique agents (avoid duplicates)
          const allAgents = [...localAgents];
          supabaseAgents.forEach(agent => {
            if (!allAgents.find(a => a.id === agent.id)) {
              allAgents.push(agent);
            }
          });
          setAgents(allAgents);
          console.log('📊 Merged agents:', allAgents.length);
        }
      } catch (supabaseError) {
        console.log('⚠️ Supabase unavailable, using local agents only');
      }
      
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      // Final fallback - create demo agent
      const fallbackAgent = {
        id: 'fallback_' + Date.now(),
        name: 'Fallback Demo Agent',
        description: 'Emergency demo agent',
        task_input: 'Demo task for testing',
        model: 'facebook/bart-large-mnli',
        skills: ['ai-processing'],
        status: 'active',
        created_at: new Date().toISOString()
      };
      setAgents([fallbackAgent]);
      localStorage.setItem('demo_agents', JSON.stringify([fallbackAgent]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleRunAgent = async (agent) => {
    try {
      setExecutingAgents(prev => new Set([...prev, agent.id]));
      console.log(`🚀 Starting REAL execution for agent: ${agent.name}`);
      
      const execution = await realAgentExecutor.executeAgent(agent);
      console.log(`✅ REAL Agent execution completed:`, execution);
      
      if (execution.status === 'completed') {
        alert(`Agent "${agent.name}" completed successfully!\n\nReal data collected: ${execution.realData?.length || 0} sources\nInsights generated: ${execution.result?.realInsights?.length || 0}`);
      }
      
    } catch (error) {
      console.error('Error running real agent:', error);
      alert(`Agent execution failed: ${error.message}`);
    } finally {
      setExecutingAgents(prev => {
        const newSet = new Set(prev);
        newSet.delete(agent.id);
        return newSet;
      });
    }
  };

  const handleDeleteAgent = async (agentId) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        // Remove from localStorage
        const localAgents = JSON.parse(localStorage.getItem('demo_agents') || '[]');
        const updatedAgents = localAgents.filter(agent => agent.id !== agentId);
        localStorage.setItem('demo_agents', JSON.stringify(updatedAgents));
        
        // Remove from state
        setAgents(prev => prev.filter(agent => agent.id !== agentId));
        
        console.log('✅ Agent deleted successfully');
      } catch (error) {
        console.error('Error deleting agent:', error);
      }
    }
  };

  const getAgentStatus = (agentId) => {
    if (executingAgents.has(agentId)) {
      return { status: 'running', color: 'text-primary' };
    }
    
    const status = realAgentExecutor.getAgentStatus(agentId);
    switch (status.status) {
      case 'running':
        return { status: 'running', color: 'text-primary' };
      case 'completed':
        return { status: 'completed', color: 'text-success' };
      case 'failed':
        return { status: 'failed', color: 'text-error' };
      default:
        return { status: 'idle', color: 'text-muted-foreground' };
    }
  };

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterStatus === 'all') return matchesSearch;
      
      const agentStatus = getAgentStatus(agent.id);
      return matchesSearch && agentStatus.status === filterStatus;
    });
  }, [agents, searchTerm, filterStatus, executingAgents]);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Agent Management', href: '/agent-management' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
                <p className="text-muted-foreground mt-2">
                  Manage and monitor your AI agents
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log('🔄 Force refreshing agents...');
                    fetchAgents();
                  }}
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Refresh
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    const localCount = JSON.parse(localStorage.getItem('demo_agents') || '[]').length;
                    const memoryCount = agents.length;
                    alert(`Debug Info:\nAgents in memory: ${memoryCount}\nAgents in localStorage: ${localCount}\n\nCheck console for details.`);
                    console.log('Current agents in memory:', agents);
                    console.log('Agents in localStorage:', JSON.parse(localStorage.getItem('demo_agents') || '[]'));
                  }}
                >
                  <Icon name="Info" size={16} className="mr-2" />
                  Debug
                </Button>
                
                <Button onClick={() => navigate('/agent-creation')}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Create Agent
                </Button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="idle">Idle</option>
                <option value="running">Running</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Agents Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-muted-foreground">Loading agents...</span>
              </div>
            ) : filteredAgents.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Bot" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {searchTerm || filterStatus !== 'all' ? 'No agents match your criteria' : 'No agents found'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first AI agent to get started'
                  }
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <Button onClick={() => navigate('/agent-creation')}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Create Your First Agent
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    status={getAgentStatus(agent.id)}
                    onRun={() => handleRunAgent(agent)}
                    onMonitor={() => setMonitoringAgent(agent)}
                    onDelete={() => handleDeleteAgent(agent.id)}
                    isExecuting={executingAgents.has(agent.id)}
                  />
                ))}
              </div>
            )}

            {/* Execution Monitor Modal */}
            {monitoringAgent && (
              <AgentExecutionMonitor
                agentId={monitoringAgent.id}
                agentName={monitoringAgent.name}
                onClose={() => setMonitoringAgent(null)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentManagement;