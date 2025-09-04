import React from 'react';
import Icon from '../../../components/AppIcon';

const ModelSelector = ({ selectedModel, setSelectedModel }) => {
  const freeModels = [
    { 
      value: 'microsoft/DialoGPT-medium', 
      label: 'DialoGPT Medium', 
      description: 'Conversational AI',
      type: 'free',
      capabilities: ['Chat', 'Q&A', 'Task Planning']
    },
    { 
      value: 'facebook/blenderbot-400M-distill', 
      label: 'BlenderBot 400M', 
      description: 'Open-domain chatbot',
      type: 'free',
      capabilities: ['Conversation', 'Knowledge', 'Personality']
    },
    { 
      value: 'microsoft/CodeBERT-base', 
      label: 'CodeBERT', 
      description: 'Code understanding',
      type: 'free',
      capabilities: ['Code Gen', 'Code Review', 'Documentation']
    },
    { 
      value: 'facebook/bart-large-mnli', 
      label: 'BART MNLI', 
      description: 'Text classification',
      type: 'free',
      capabilities: ['Classification', 'NLI', 'Analysis']
    }
  ];

  const premiumModels = [
    { 
      value: 'gpt-4o-mini', 
      label: 'GPT-4o Mini', 
      description: 'Fast and efficient',
      type: 'premium',
      capabilities: ['Advanced Reasoning', 'Complex Tasks', 'Multi-step']
    },
    { 
      value: 'gpt-4', 
      label: 'GPT-4', 
      description: 'Most capable',
      type: 'premium',
      capabilities: ['Expert Level', 'Creative Tasks', 'Problem Solving']
    }
  ];

  const ModelCard = ({ model }) => (
    <div
      onClick={() => setSelectedModel(model.value)}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        selectedModel === model.value
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-foreground">{model.label}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              model.type === 'free' 
                ? 'bg-success/10 text-success' 
                : 'bg-warning/10 text-warning'
            }`}>
              {model.type === 'free' ? 'FREE' : 'PREMIUM'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
        </div>
        {selectedModel === model.value && (
          <Icon name="CheckCircle" size={20} className="text-primary" />
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        {model.capabilities.map((cap, idx) => (
          <span key={idx} className="px-2 py-1 text-xs bg-muted rounded">
            {cap}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Choose AI Model</h3>
        <p className="text-sm text-muted-foreground">
          Select from free Hugging Face models or premium options
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Gift" size={16} className="mr-2 text-success" />
            Free Models (Hugging Face)
          </h4>
          <div className="grid gap-3">
            {freeModels.map(model => (
              <ModelCard key={model.value} model={model} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Crown" size={16} className="mr-2 text-warning" />
            Premium Models (API Required)
          </h4>
          <div className="grid gap-3">
            {premiumModels.map(model => (
              <ModelCard key={model.value} model={model} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;