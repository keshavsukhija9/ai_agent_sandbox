import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export const huggingFaceService = {
  async generateTaskBreakdown(taskDescription, model = 'microsoft/DialoGPT-medium') {
    try {
      const response = await hf.textGeneration({
        model: model,
        inputs: `Break down this task: ${taskDescription}`,
        parameters: { max_new_tokens: 200, temperature: 0.7 }
      });
      return this.parseTaskBreakdown(response.generated_text, taskDescription);
    } catch (error) {
      return this.getFallbackTaskBreakdown(taskDescription);
    }
  },

  async classifyText(text, model = 'facebook/bart-large-mnli') {
    try {
      const response = await hf.textClassification({
        model: model,
        inputs: text,
        parameters: {
          candidate_labels: ['positive', 'negative', 'neutral', 'urgent', 'normal']
        }
      });
      return response;
    } catch (error) {
      return [{ label: 'neutral', score: 0.8 }];
    }
  },

  async generateCode(prompt, model = 'microsoft/CodeBERT-base') {
    try {
      const response = await hf.textGeneration({
        model: model,
        inputs: `Generate code for: ${prompt}`,
        parameters: { max_new_tokens: 150, temperature: 0.3 }
      });
      return response.generated_text;
    } catch (error) {
      return `# Generated code for: ${prompt}\n# Code generation failed, using fallback`;
    }
  },

  async summarizeText(text, model = 'facebook/bart-large-cnn') {
    try {
      const response = await hf.summarization({
        model: model,
        inputs: text,
        parameters: { max_length: 100, min_length: 30 }
      });
      return response.summary_text;
    } catch (error) {
      return 'Summary generation failed';
    }
  },

  async classifyAgentType(description) {
    try {
      const response = await hf.textClassification({
        model: 'facebook/bart-large-mnli',
        inputs: description,
        parameters: {
          candidate_labels: ['data-processing', 'web-scraping', 'analysis', 'automation']
        }
      });
      return response[0]?.label || 'general';
    } catch (error) {
      return 'general';
    }
  },

  parseTaskBreakdown(text, original) {
    const words = original.split(' ').length;
    const complexity = words > 50 ? 'High' : words > 25 ? 'Medium' : 'Low';
    
    return {
      complexity,
      estimatedSteps: Math.ceil(words / 15),
      taskBreakdown: [
        {
          title: 'Initialize Task',
          description: 'Set up environment and resources',
          difficulty: 'Easy',
          estimatedTime: '2-3 minutes',
          requirements: ['System Access']
        },
        {
          title: 'Execute Process',
          description: 'Perform core operations',
          difficulty: complexity === 'High' ? 'Hard' : 'Medium',
          estimatedTime: complexity === 'High' ? '10-15 minutes' : '5-10 minutes',
          requirements: ['Processing Power']
        },
        {
          title: 'Deliver Results',
          description: 'Complete and output results',
          difficulty: 'Easy',
          estimatedTime: '2-3 minutes',
          requirements: ['Output Generation']
        }
      ],
      suggestedSkills: [
        { name: 'Task Processing', description: 'Core execution', icon: 'Cpu', rating: 4.5 },
        { name: 'Data Handling', description: 'Manage data', icon: 'Database', rating: 4.3 }
      ]
    };
  },

  getFallbackTaskBreakdown(taskDescription) {
    return this.parseTaskBreakdown('', taskDescription);
  },

  // Get available free models
  getFreeModels() {
    return [
      'microsoft/DialoGPT-medium',
      'facebook/blenderbot-400M-distill', 
      'microsoft/CodeBERT-base',
      'distilbert-base-uncased',
      'facebook/bart-large-mnli',
      'sentence-transformers/all-MiniLM-L6-v2'
    ];
  },

  // Check if model is free
  isFreeModel(model) {
    return this.getFreeModels().includes(model);
  }
};