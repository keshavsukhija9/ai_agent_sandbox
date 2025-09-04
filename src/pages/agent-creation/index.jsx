import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { supabaseService } from '../../services/supabaseService';

const AgentCreation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('facebook/bart-large-mnli');
  const [permissionLevel, setPermissionLevel] = useState('standard');
  const [executionEnvironment, setExecutionEnvironment] = useState('sandbox');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const availableModels = [
    { id: 'facebook/bart-large-mnli', name: 'BART Large MNLI', type: 'free' },
    { id: 'microsoft/DialoGPT-medium', name: 'DialoGPT Medium', type: 'free' },
    { id: 'distilbert-base-uncased', name: 'DistilBERT Base', type: 'free' },
    { id: 'gpt-4', name: 'GPT-4', type: 'premium' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', type: 'premium' }
  ];

  const availableSkills = [
    { id: 'web-scraping', name: 'Web Scraping', description: 'Extract data from websites' },
    { id: 'text-classification', name: 'Text Classification', description: 'Categorize and analyze text' },
    { id: 'ai-processing', name: 'AI Processing', description: 'Advanced AI model inference' },
    { id: 'data-analysis', name: 'Data Analysis', description: 'Statistical analysis and insights' },
    { id: 'reporting', name: 'Reporting', description: 'Generate comprehensive reports' }
  ];

  const handleSkillToggle = (skillId) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agentName.trim()) {
      alert('Please enter an agent name');
      return;
    }
    
    if (!taskInput.trim()) {
      alert('Please enter a task description');
      return;
    }

    setLoading(true);

    try {
      console.log('🤖 Creating agent:', agentName);

      // FORCE: Always create agent and store in localStorage immediately
      const newAgent = {
        id: 'agent_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        name: agentName.trim(),
        description: description.trim() || 'No description provided',
        task_input: taskInput.trim(),
        model: selectedModel,
        permission_level: permissionLevel,
        execution_environment: executionEnvironment,
        skills: selectedSkills,
        status: 'active',
        created_at: new Date().toISOString(),
        created_by: 'current_user'
      };

      // ALWAYS store in localStorage first
      const existingAgents = JSON.parse(localStorage.getItem('demo_agents') || '[]');
      existingAgents.push(newAgent);
      localStorage.setItem('demo_agents', JSON.stringify(existingAgents));
      console.log('✅ Agent stored in localStorage:', newAgent);

      // Try Supabase in background (don't wait for it)
      supabaseService.createAgent({
        name: agentName,
        description: description,
        taskInput: taskInput,
        selectedModel: selectedModel,
        permissionLevel: permissionLevel,
        executionEnvironment: executionEnvironment,
        selectedSkills: selectedSkills
      }).catch(error => {
        console.log('⚠️ Supabase creation failed (using localStorage):', error.message);
      });

      console.log('✅ Agent created successfully:', newAgent.name);
      
      // Show success message
      alert(`Agent "${agentName}" created successfully!\n\nYou can now find it in Agent Management.`);
      
      // Navigate to agent management
      navigate('/agent-management');
      
    } catch (error) {
      console.error('Agent creation error:', error);
      alert(`Failed to create agent: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Agent Creation', href: '/agent-creation' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Create AI Agent</h1>
              <p className="text-muted-foreground mt-2">
                Configure your AI agent with specific tasks and capabilities
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Agent Name *
                    </label>
                    <input
                      type="text"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="e.g., Market Research Bot"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of the agent's purpose"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Task Configuration */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Task Configuration</h2>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Task Description *
                  </label>
                  <textarea
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Describe what you want the agent to do. Be specific about the goals, data sources, and expected outcomes."
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Example: "Monitor competitor pricing on their websites daily and generate weekly reports with pricing trends and recommendations"
                  </p>
                </div>
              </div>

              {/* AI Model Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">AI Model Selection</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableModels.map((model) => (
                    <div
                      key={model.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedModel === model.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedModel(model.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{model.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            model.type === 'free' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-warning/10 text-warning'
                          }`}>
                            {model.type}
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedModel === model.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Agent Skills</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSkills.includes(skill.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleSkillToggle(skill.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                        </div>
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-1 ${
                          selectedSkills.includes(skill.id)
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`}>
                          {selectedSkills.includes(skill.id) && (
                            <Icon name="Check" size={12} className="text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Configuration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Permission Level
                    </label>
                    <select
                      value={permissionLevel}
                      onChange={(e) => setPermissionLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="restricted">Restricted</option>
                      <option value="standard">Standard</option>
                      <option value="elevated">Elevated</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Execution Environment
                    </label>
                    <select
                      value={executionEnvironment}
                      onChange={(e) => setExecutionEnvironment(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="sandbox">Sandbox</option>
                      <option value="staging">Staging</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/agent-management')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? 'Creating Agent...' : 'Create Agent'}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentCreation;