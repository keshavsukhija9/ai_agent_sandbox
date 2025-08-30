import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import TaskInputPanel from './components/TaskInputPanel';
import ConfigurationPanel from './components/ConfigurationPanel';
import TaskPreviewPanel from './components/TaskPreviewPanel';
import MobileTabNavigation from './components/MobileTabNavigation';
import CreateAgentActions from './components/CreateAgentActions';

const AgentCreation = () => {
  const navigate = useNavigate();
  
  // Layout state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('task');

  // Form state
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [permissionLevel, setPermissionLevel] = useState('standard');
  const [executionEnvironment, setExecutionEnvironment] = useState('sandbox');
  const [selectedSkills, setSelectedSkills] = useState(['web-scraping', 'api-integration']);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Preview state
  const [previewData, setPreviewData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const canCreate = agentName?.trim() && taskInput?.trim() && selectedModel && permissionLevel && executionEnvironment;

  const generatePreview = async () => {
    if (!taskInput?.trim()) return;

    setIsGeneratingPreview(true);
    
    // Simulate API call to generate task breakdown
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockPreviewData = {
      complexity: taskInput?.length > 200 ? 'High' : taskInput?.length > 100 ? 'Medium' : 'Low',
      estimatedSteps: Math.ceil(taskInput?.split(' ')?.length / 15),
      taskBreakdown: [
        {
          title: 'Initialize Data Collection',
          description: 'Set up data sources and establish connections to target websites or APIs',
          difficulty: 'Easy',
          estimatedTime: '2-3 minutes',
          requirements: ['Web Access', 'API Keys']
        },
        {
          title: 'Extract Target Information',
          description: 'Navigate through web pages and extract the specified data points',
          difficulty: 'Medium',
          estimatedTime: '5-10 minutes',
          requirements: ['Web Scraping', 'Data Parsing']
        },
        {
          title: 'Process and Validate Data',
          description: 'Clean, format, and validate the extracted information for accuracy',
          difficulty: 'Medium',
          estimatedTime: '3-5 minutes',
          requirements: ['Data Processing', 'Validation Rules']
        },
        {
          title: 'Generate Output Report',
          description: 'Compile the processed data into the requested format and deliver results',
          difficulty: 'Easy',
          estimatedTime: '2-3 minutes',
          requirements: ['File Processing', 'Report Generation']
        }
      ],
      suggestedSkills: [
        {
          name: 'Web Scraping',
          description: 'Extract data from websites',
          icon: 'Globe',
          rating: 4.8
        },
        {
          name: 'API Integration',
          description: 'Connect to external services',
          icon: 'Link',
          rating: 4.9
        },
        {
          name: 'Data Analysis',
          description: 'Process and analyze data',
          icon: 'BarChart3',
          rating: 4.7
        },
        {
          name: 'File Processing',
          description: 'Handle various file formats',
          icon: 'FileText',
          rating: 4.5
        }
      ]
    };

    setPreviewData(mockPreviewData);
    setIsGeneratingPreview(false);
    setShowPreview(true);
  };

  const handleCreateAgent = async () => {
    if (!canCreate) return;

    setIsCreating(true);
    
    // Simulate agent creation
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Navigate to agent management with success message
    navigate('/agent-management', { 
      state: { 
        message: `Agent "${agentName}" created successfully!`,
        type: 'success'
      }
    });
  };

  const handleSaveTemplate = async () => {
    if (!canCreate) return;

    setIsSaving(true);
    
    // Simulate template saving
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    // Could show a toast notification here
  };

  const handlePreviewClose = () => {
    setShowPreview(false);
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

      {/* Mobile Sidebar */}
      <Sidebar 
        isCollapsed={!isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        className="lg:hidden"
      />

      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb />
          </div>

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Create New Agent
            </h1>
            <p className="text-muted-foreground">
              Build an AI agent by describing its task in natural language and configuring its capabilities
            </p>
          </div>

          {/* Mobile Tab Navigation */}
          <MobileTabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            hasPreview={!!previewData}
            onPreviewOpen={() => setShowPreview(true)}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Task Input Panel - Desktop: 60%, Mobile: Full width with tabs */}
            <div className={`lg:col-span-3 ${
              activeTab === 'task' ? 'block' : 'hidden'
            } lg:block`}>
              <div className="bg-card border border-border rounded-lg p-6">
                <TaskInputPanel
                  agentName={agentName}
                  setAgentName={setAgentName}
                  description={description}
                  setDescription={setDescription}
                  taskInput={taskInput}
                  setTaskInput={setTaskInput}
                  onPreviewGenerate={generatePreview}
                  isGeneratingPreview={isGeneratingPreview}
                />
              </div>
            </div>

            {/* Configuration Panel - Desktop: 40%, Mobile: Full width with tabs */}
            <div className={`lg:col-span-2 ${
              activeTab === 'config' ? 'block' : 'hidden'
            } lg:block`}>
              <div className="bg-card border border-border rounded-lg p-6">
                <ConfigurationPanel
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  permissionLevel={permissionLevel}
                  setPermissionLevel={setPermissionLevel}
                  executionEnvironment={executionEnvironment}
                  setExecutionEnvironment={setExecutionEnvironment}
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                  showAdvanced={showAdvanced}
                  setShowAdvanced={setShowAdvanced}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Desktop only (mobile has preview button fixed at bottom) */}
          <div className="hidden lg:block mt-6">
            <div className="flex justify-end">
              <CreateAgentActions
                onCreateAgent={handleCreateAgent}
                onSaveTemplate={handleSaveTemplate}
                isCreating={isCreating}
                isSaving={isSaving}
                canCreate={canCreate}
              />
            </div>
          </div>

          {/* Mobile spacing for fixed preview button */}
          <div className="lg:hidden h-20"></div>
        </div>
      </main>

      {/* Task Preview Modal */}
      <TaskPreviewPanel
        previewData={previewData}
        isVisible={showPreview}
        onClose={handlePreviewClose}
        onCreateAgent={handleCreateAgent}
        isCreating={isCreating}
      />
    </div>
  );
};

export default AgentCreation;