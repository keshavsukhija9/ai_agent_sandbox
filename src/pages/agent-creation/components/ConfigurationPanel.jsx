import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const ConfigurationPanel = ({ 
  selectedModel, 
  setSelectedModel, 
  permissionLevel, 
  setPermissionLevel,
  executionEnvironment,
  setExecutionEnvironment,
  selectedSkills,
  setSelectedSkills,
  showAdvanced,
  setShowAdvanced
}) => {
  const modelOptions = [
    // Free Hugging Face Models
    { 
      value: 'microsoft/DialoGPT-medium', 
      label: 'DialoGPT Medium (Free)', 
      description: 'Conversational AI - Free on Hugging Face' 
    },
    { 
      value: 'facebook/blenderbot-400M-distill', 
      label: 'BlenderBot 400M (Free)', 
      description: 'Open-domain chatbot - Free' 
    },
    { 
      value: 'microsoft/CodeBERT-base', 
      label: 'CodeBERT (Free)', 
      description: 'Code understanding and generation - Free' 
    },
    { 
      value: 'distilbert-base-uncased', 
      label: 'DistilBERT (Free)', 
      description: 'Fast text classification - Free' 
    },
    { 
      value: 'facebook/bart-large-mnli', 
      label: 'BART MNLI (Free)', 
      description: 'Text classification and NLI - Free' 
    },
    { 
      value: 'sentence-transformers/all-MiniLM-L6-v2', 
      label: 'MiniLM Embeddings (Free)', 
      description: 'Text embeddings and similarity - Free' 
    },
    // Premium Models
    { 
      value: 'gpt-4o-mini', 
      label: 'GPT-4o Mini (Premium)', 
      description: 'Fast and efficient - Requires API key' 
    },
    { 
      value: 'gpt-3.5-turbo', 
      label: 'GPT-3.5 Turbo (Premium)', 
      description: 'Cost-effective - Requires API key' 
    },
    { 
      value: 'gpt-4', 
      label: 'GPT-4 (Premium)', 
      description: 'Most capable - Requires API key' 
    }
  ];

  const permissionOptions = [
    { 
      value: 'restricted', 
      label: 'Restricted', 
      description: 'Limited to predefined data sources' 
    },
    { 
      value: 'standard', 
      label: 'Standard', 
      description: 'Access to common web resources' 
    },
    { 
      value: 'elevated', 
      label: 'Elevated', 
      description: 'Extended access with user approval' 
    }
  ];

  const environmentOptions = [
    { 
      value: 'sandbox', 
      label: 'Sandbox', 
      description: 'Safe testing environment' 
    },
    { 
      value: 'staging', 
      label: 'Staging', 
      description: 'Pre-production environment' 
    },
    { 
      value: 'production', 
      label: 'Production', 
      description: 'Live environment (requires approval)' 
    }
  ];

  const availableSkills = [
    // Data Collection
    { id: 'web-scraping', name: 'Web Scraping', category: 'Data Collection', rating: 4.8 },
    { id: 'api-integration', name: 'API Integration', category: 'Data Collection', rating: 4.9 },
    { id: 'sentiment-analysis', name: 'Sentiment Analysis', category: 'Data Collection', rating: 4.6 },
    { id: 'text-extraction', name: 'Text Extraction', category: 'Data Collection', rating: 4.5 },
    
    // AI Processing
    { id: 'text-classification', name: 'Text Classification', category: 'AI Processing', rating: 4.7 },
    { id: 'language-detection', name: 'Language Detection', category: 'AI Processing', rating: 4.6 },
    { id: 'text-summarization', name: 'Text Summarization', category: 'AI Processing', rating: 4.8 },
    { id: 'question-answering', name: 'Question Answering', category: 'AI Processing', rating: 4.7 },
    { id: 'code-generation', name: 'Code Generation', category: 'AI Processing', rating: 4.5 },
    
    // Data Processing
    { id: 'data-analysis', name: 'Data Analysis', category: 'Data Processing', rating: 4.7 },
    { id: 'file-processing', name: 'File Processing', category: 'Data Processing', rating: 4.5 },
    { id: 'data-transformation', name: 'Data Transformation', category: 'Data Processing', rating: 4.6 },
    
    // Communication
    { id: 'email-automation', name: 'Email Automation', category: 'Communication', rating: 4.6 },
    { id: 'notification-system', name: 'Notifications', category: 'Communication', rating: 4.8 },
    { id: 'report-generation', name: 'Report Generation', category: 'Communication', rating: 4.7 },
    
    // Storage & Media
    { id: 'database-operations', name: 'Database Operations', category: 'Data Storage', rating: 4.7 },
    { id: 'image-processing', name: 'Image Processing', category: 'Media', rating: 4.4 },
    { id: 'audio-processing', name: 'Audio Processing', category: 'Media', rating: 4.3 }
  ];

  const skillCategories = [...new Set(availableSkills.map(skill => skill.category))];

  const handleSkillToggle = (skillId) => {
    setSelectedSkills(prev => 
      prev?.includes(skillId) 
        ? prev?.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Agent Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure your agent's capabilities and execution environment
        </p>
      </div>
      {/* Core Configuration */}
      <div className="space-y-4">
        <Select
          label="LLM Model"
          description="Choose the language model for your agent"
          options={modelOptions}
          value={selectedModel}
          onChange={setSelectedModel}
          required
        />

        <Select
          label="Permission Level"
          description="Define data access permissions"
          options={permissionOptions}
          value={permissionLevel}
          onChange={setPermissionLevel}
          required
        />

        <Select
          label="Execution Environment"
          description="Select where your agent will run"
          options={environmentOptions}
          value={executionEnvironment}
          onChange={setExecutionEnvironment}
          required
        />
      </div>
      {/* Skill Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Available Skills</h3>
          <span className="text-xs text-muted-foreground">
            {selectedSkills?.length} selected
          </span>
        </div>

        <div className="max-h-64 overflow-y-auto border border-border rounded-md">
          {skillCategories?.map(category => (
            <div key={category} className="border-b border-border last:border-b-0">
              <div className="p-3 bg-muted/30">
                <h4 className="text-sm font-medium text-foreground">{category}</h4>
              </div>
              <div className="p-2 space-y-2">
                {availableSkills?.filter(skill => skill?.category === category)?.map(skill => (
                    <div key={skill?.id} className="flex items-center space-x-3 p-2 hover:bg-muted/20 rounded">
                      <Checkbox
                        checked={selectedSkills?.includes(skill?.id)}
                        onChange={() => handleSkillToggle(skill?.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-foreground">{skill?.name}</span>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-warning fill-current" />
                            <span className="text-xs text-muted-foreground">{skill?.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Advanced Settings */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="w-full justify-between"
        >
          Advanced Settings
        </Button>

        {showAdvanced && (
          <div className="space-y-4 p-4 border border-border rounded-md bg-muted/10">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Execution Parameters</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Max Execution Time (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    min={1}
                    max={180}
                    className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Retry Attempts
                  </label>
                  <input
                    type="number"
                    defaultValue={3}
                    min={1}
                    max={10}
                    className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Checkbox label="Enable detailed logging" />
                <Checkbox label="Send completion notifications" />
                <Checkbox label="Auto-retry on failure" />
                <Checkbox label="Require approval for external requests" />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Resource Usage Estimate */}
      <div className="p-4 bg-muted/20 rounded-md">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Zap" size={16} className="text-warning" />
          <h4 className="text-sm font-medium text-foreground">Estimated Resource Usage</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Compute Cost:</span>
            <span className="ml-2 font-medium text-foreground">
              {selectedModel?.includes('gpt') ? '$0.05/hour' : 'Free'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Memory Usage:</span>
            <span className="ml-2 font-medium text-foreground">~256MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;