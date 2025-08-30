import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const TaskInputPanel = ({ 
  agentName, 
  setAgentName, 
  description, 
  setDescription, 
  taskInput, 
  setTaskInput, 
  onPreviewGenerate,
  isGeneratingPreview 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const taskSuggestions = [
    "Monitor competitor pricing and send weekly reports",
    "Scrape job postings from multiple sites and filter by criteria",
    "Analyze social media sentiment for brand mentions",
    "Extract product reviews and categorize feedback",
    "Track inventory levels across multiple suppliers",
    "Generate daily market research summaries",
    "Monitor news articles for industry trends",
    "Collect and organize customer feedback from various channels"
  ];

  const exampleTasks = [
    {
      title: "Web Scraping Agent",
      description: "Extract product data from e-commerce sites and compile into structured reports"
    },
    {
      title: "Content Monitor",
      description: "Track mentions of specific keywords across social media and news sites"
    },
    {
      title: "Data Collector",
      description: "Gather information from multiple APIs and create consolidated dashboards"
    }
  ];

  useEffect(() => {
    if (taskInput?.length > 10) {
      const filtered = taskSuggestions?.filter(suggestion => 
        suggestion?.toLowerCase()?.includes(taskInput?.toLowerCase()?.split(' ')?.[0])
      );
      setSuggestions(filtered?.slice(0, 3));
      setShowSuggestions(filtered?.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [taskInput]);

  const handleSuggestionClick = (suggestion) => {
    setTaskInput(suggestion);
    setShowSuggestions(false);
  };

  const handleExampleClick = (example) => {
    setAgentName(example?.title);
    setTaskInput(example?.description);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Agent Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Define your agent's identity and primary task using natural language
        </p>
      </div>
      {/* Basic Information */}
      <div className="space-y-4">
        <Input
          label="Agent Name"
          type="text"
          placeholder="e.g., Web Scraper Bot, Content Monitor"
          value={agentName}
          onChange={(e) => setAgentName(e?.target?.value)}
          required
          description="Choose a descriptive name for your agent"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description <span className="text-muted-foreground">(Optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            placeholder="Brief description of what this agent does..."
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>
      {/* Task Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Task Description <span className="text-error">*</span>
          </label>
          <div className="relative">
            <textarea
              value={taskInput}
              onChange={(e) => setTaskInput(e?.target?.value)}
              placeholder="Describe what you want your agent to do in plain English. Be specific about the steps, data sources, and expected outcomes..."
              className="w-full px-3 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={6}
              required
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md elevation-moderate z-10">
                <div className="p-2 border-b border-border">
                  <p className="text-xs font-medium text-muted-foreground">Suggestions</p>
                </div>
                {suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted/50 border-b border-border last:border-b-0"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            The more detailed your description, the better your agent will perform
          </p>
        </div>

        {/* Task Complexity Indicator */}
        {taskInput?.length > 50 && (
          <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-md">
            <Icon name="Info" size={16} className="text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Task Complexity: Medium</p>
              <p className="text-xs text-muted-foreground">
                This task will require {Math.ceil(taskInput?.split(' ')?.length / 20)} main steps
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Example Tasks */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Quick Start Examples</h3>
        <div className="grid gap-2">
          {exampleTasks?.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="text-left p-3 border border-border rounded-md hover:bg-muted/30 transition-colors"
            >
              <p className="text-sm font-medium text-foreground">{example?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{example?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Generate Preview Button */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onPreviewGenerate}
          disabled={!taskInput?.trim() || isGeneratingPreview}
          loading={isGeneratingPreview}
          iconName="Eye"
          iconPosition="left"
          className="w-full"
        >
          {isGeneratingPreview ? 'Generating Preview...' : 'Generate Task Preview'}
        </Button>
      </div>
    </div>
  );
};

export default TaskInputPanel;