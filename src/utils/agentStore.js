// Local agent store for demo mode
class AgentStore {
  constructor() {
    this.agents = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem('demo_agents');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('demo_agents', JSON.stringify(this.agents));
    } catch (error) {
      console.error('Failed to save agents to storage:', error);
    }
  }

  addAgent(agent) {
    this.agents.push(agent);
    this.saveToStorage();
    console.log('Agent added to local store:', agent);
  }

  getAgents() {
    return this.agents;
  }

  deleteAgent(agentId) {
    this.agents = this.agents.filter(a => a.id !== agentId);
    this.saveToStorage();
  }

  clear() {
    this.agents = [];
    this.saveToStorage();
  }
}

export const agentStore = new AgentStore();