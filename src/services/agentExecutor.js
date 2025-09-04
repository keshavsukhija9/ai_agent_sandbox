import { huggingFaceService } from './huggingface';

export class AgentExecutor {
  constructor() {
    this.runningAgents = new Map();
    this.executionHistory = [];
  }

  async executeAgent(agent, taskData = {}) {
    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`🤖 Starting agent execution: ${agent.name}`);
    
    const execution = {
      id: executionId,
      agentId: agent.id,
      agentName: agent.name,
      status: 'running',
      startTime: new Date(),
      steps: [],
      result: null,
      error: null
    };

    this.runningAgents.set(executionId, execution);

    try {
      // Parse task input and create execution plan
      const plan = await this.createExecutionPlan(agent.task_input, agent.model);
      execution.steps = plan.steps;

      // Execute each step
      for (let i = 0; i < plan.steps.length; i++) {
        const step = plan.steps[i];
        console.log(`📋 Executing step ${i + 1}: ${step.action}`);
        
        step.status = 'running';
        step.startTime = new Date();

        const stepResult = await this.executeStep(step, agent, taskData);
        
        step.result = stepResult;
        step.status = stepResult.success ? 'completed' : 'failed';
        step.endTime = new Date();

        if (!stepResult.success && step.critical) {
          throw new Error(`Critical step failed: ${stepResult.error}`);
        }
      }

      // Compile final result
      const finalResult = await this.compileResults(execution.steps, agent);
      
      execution.status = 'completed';
      execution.result = finalResult;
      execution.endTime = new Date();

      console.log(`✅ Agent execution completed: ${agent.name}`);
      
    } catch (error) {
      console.error(`❌ Agent execution failed: ${error.message}`);
      execution.status = 'failed';
      execution.error = error.message;
      execution.endTime = new Date();
    }

    this.executionHistory.push(execution);
    this.runningAgents.delete(executionId);
    
    return execution;
  }

  async createExecutionPlan(taskInput, model) {
    try {
      // Use AI to break down task into executable steps
      const breakdown = await huggingFaceService.generateTaskBreakdown(taskInput, model);
      
      return {
        steps: breakdown.steps.map((step, index) => ({
          id: `step_${index + 1}`,
          action: step.action,
          description: step.description,
          type: this.determineStepType(step.action),
          critical: step.critical || false,
          status: 'pending',
          result: null
        }))
      };
    } catch (error) {
      // Fallback to simple step creation
      return {
        steps: [
          {
            id: 'step_1',
            action: 'analyze_task',
            description: 'Analyze the given task requirements',
            type: 'analysis',
            critical: true,
            status: 'pending'
          },
          {
            id: 'step_2', 
            action: 'execute_task',
            description: 'Execute the main task logic',
            type: 'execution',
            critical: true,
            status: 'pending'
          },
          {
            id: 'step_3',
            action: 'generate_report',
            description: 'Generate execution report',
            type: 'reporting',
            critical: false,
            status: 'pending'
          }
        ]
      };
    }
  }

  async executeStep(step, agent, taskData) {
    try {
      switch (step.type) {
        case 'analysis':
          return await this.executeAnalysisStep(step, agent, taskData);
        case 'data_collection':
          return await this.executeDataCollectionStep(step, agent, taskData);
        case 'processing':
          return await this.executeProcessingStep(step, agent, taskData);
        case 'ai_processing':
          return await this.executeAIProcessingStep(step, agent, taskData);
        case 'communication':
          return await this.executeCommunicationStep(step, agent, taskData);
        case 'reporting':
          return await this.executeReportingStep(step, agent, taskData);
        default:
          return await this.executeGenericStep(step, agent, taskData);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  async executeAnalysisStep(step, agent, taskData) {
    // Simulate analysis with AI
    await this.delay(1000 + Math.random() * 2000);
    
    const analysis = {
      taskComplexity: Math.random() > 0.5 ? 'medium' : 'low',
      estimatedTime: Math.floor(Math.random() * 300) + 60,
      requiredResources: ['cpu', 'memory'],
      confidence: 0.8 + Math.random() * 0.2
    };

    return {
      success: true,
      data: analysis,
      message: `Task analyzed: ${analysis.taskComplexity} complexity`
    };
  }

  async executeDataCollectionStep(step, agent, taskData) {
    await this.delay(2000 + Math.random() * 3000);
    
    // Simulate data collection
    const mockData = {
      source: 'web_scraping',
      recordsCollected: Math.floor(Math.random() * 1000) + 100,
      dataQuality: 0.85 + Math.random() * 0.15,
      timestamp: new Date().toISOString()
    };

    return {
      success: true,
      data: mockData,
      message: `Collected ${mockData.recordsCollected} records`
    };
  }

  async executeAIProcessingStep(step, agent, taskData) {
    await this.delay(3000 + Math.random() * 4000);
    
    try {
      // Try real AI processing if available
      const aiResult = await huggingFaceService.classifyText(
        agent.task_input,
        agent.model
      );
      
      return {
        success: true,
        data: aiResult,
        message: 'AI processing completed successfully'
      };
    } catch (error) {
      // Fallback to mock processing
      return {
        success: true,
        data: {
          processed: true,
          confidence: 0.75 + Math.random() * 0.25,
          categories: ['automated', 'processed'],
          timestamp: new Date().toISOString()
        },
        message: 'AI processing completed (fallback mode)'
      };
    }
  }

  async executeProcessingStep(step, agent, taskData) {
    await this.delay(1500 + Math.random() * 2500);
    
    return {
      success: true,
      data: {
        processed: true,
        itemsProcessed: Math.floor(Math.random() * 500) + 50,
        processingTime: Math.floor(Math.random() * 5000) + 1000,
        status: 'completed'
      },
      message: 'Data processing completed'
    };
  }

  async executeCommunicationStep(step, agent, taskData) {
    await this.delay(1000 + Math.random() * 2000);
    
    return {
      success: true,
      data: {
        messagesSent: Math.floor(Math.random() * 10) + 1,
        deliveryStatus: 'delivered',
        timestamp: new Date().toISOString()
      },
      message: 'Communication tasks completed'
    };
  }

  async executeReportingStep(step, agent, taskData) {
    await this.delay(1000 + Math.random() * 1500);
    
    const report = {
      summary: `Agent ${agent.name} completed task execution`,
      metrics: {
        executionTime: Math.floor(Math.random() * 300) + 30,
        successRate: 0.85 + Math.random() * 0.15,
        resourceUsage: Math.floor(Math.random() * 100) + 20
      },
      timestamp: new Date().toISOString()
    };

    return {
      success: true,
      data: report,
      message: 'Execution report generated'
    };
  }

  async executeGenericStep(step, agent, taskData) {
    await this.delay(1000 + Math.random() * 2000);
    
    return {
      success: true,
      data: {
        stepCompleted: true,
        timestamp: new Date().toISOString()
      },
      message: `Step ${step.action} completed`
    };
  }

  async compileResults(steps, agent) {
    const successfulSteps = steps.filter(s => s.status === 'completed');
    const failedSteps = steps.filter(s => s.status === 'failed');
    
    return {
      agentName: agent.name,
      totalSteps: steps.length,
      successfulSteps: successfulSteps.length,
      failedSteps: failedSteps.length,
      successRate: successfulSteps.length / steps.length,
      executionSummary: `Completed ${successfulSteps.length}/${steps.length} steps`,
      detailedResults: steps.map(step => ({
        step: step.action,
        status: step.status,
        result: step.result?.message || 'No result'
      })),
      timestamp: new Date().toISOString()
    };
  }

  determineStepType(action) {
    const actionLower = action.toLowerCase();
    
    if (actionLower.includes('analyze') || actionLower.includes('review')) {
      return 'analysis';
    } else if (actionLower.includes('collect') || actionLower.includes('scrape') || actionLower.includes('fetch')) {
      return 'data_collection';
    } else if (actionLower.includes('classify') || actionLower.includes('generate') || actionLower.includes('ai')) {
      return 'ai_processing';
    } else if (actionLower.includes('process') || actionLower.includes('transform')) {
      return 'processing';
    } else if (actionLower.includes('send') || actionLower.includes('notify') || actionLower.includes('email')) {
      return 'communication';
    } else if (actionLower.includes('report') || actionLower.includes('summary')) {
      return 'reporting';
    }
    
    return 'execution';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getRunningAgents() {
    return Array.from(this.runningAgents.values());
  }

  getExecutionHistory() {
    return this.executionHistory.slice(-50); // Last 50 executions
  }

  getAgentStatus(agentId) {
    const running = Array.from(this.runningAgents.values())
      .find(exec => exec.agentId === agentId);
    
    if (running) {
      return { status: 'running', execution: running };
    }
    
    const lastExecution = this.executionHistory
      .filter(exec => exec.agentId === agentId)
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))[0];
    
    return { 
      status: lastExecution ? lastExecution.status : 'idle',
      lastExecution 
    };
  }
}

// Global executor instance
export const agentExecutor = new AgentExecutor();