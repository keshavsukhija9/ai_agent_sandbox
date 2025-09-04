// Backend service integration for enterprise functionality
const BACKEND_URL = 'http://localhost:3001';

export class BackendService {
  constructor() {
    this.baseURL = BACKEND_URL;
  }

  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();
      console.log('✅ Backend connection successful:', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      return { success: false, error: error.message };
    }
  }

  async executeAgent(agent) {
    try {
      console.log('🚀 Executing agent via backend:', agent.name);
      
      const response = await fetch(`${this.baseURL}/api/agents/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agent })
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Backend execution completed:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Backend execution failed:', error);
      throw error;
    }
  }

  async scrapeWebsite(url, options = {}) {
    try {
      console.log('🕷️ Scraping via backend:', url);
      
      const response = await fetch(`${this.baseURL}/api/scraping/website`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, ...options })
      });

      if (!response.ok) {
        throw new Error(`Scraping error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Scraping completed:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Scraping failed:', error);
      throw error;
    }
  }

  async analyzeWithAI(text, type = 'sentiment') {
    try {
      console.log('🤖 AI analysis via backend:', type);
      
      const response = await fetch(`${this.baseURL}/api/ai/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, type })
      });

      if (!response.ok) {
        throw new Error(`AI analysis error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ AI analysis completed:', result);
      
      return result;
    } catch (error) {
      console.error('❌ AI analysis failed:', error);
      throw error;
    }
  }

  async monitorCompetitorPrices(urls) {
    try {
      console.log('💰 Monitoring competitor prices via backend');
      
      const response = await fetch(`${this.baseURL}/api/scraping/competitor-prices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ urls })
      });

      if (!response.ok) {
        throw new Error(`Price monitoring error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Price monitoring completed:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Price monitoring failed:', error);
      throw error;
    }
  }
}

export const backendService = new BackendService();