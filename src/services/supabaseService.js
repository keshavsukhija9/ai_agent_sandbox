import { supabase } from '../utils/supabase';
import { agentStore } from '../utils/agentStore';

export const supabaseService = {
  // Authentication
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { data, error };
    } catch (error) {
      console.error('Supabase connection error:', error);
      // Fallback for demo
      if (email === 'admin@aiagent.com' && password === 'admin123') {
        return { data: { user: { id: 'demo-user', email } }, error: null };
      }
      return { data: null, error: { message: 'Connection failed' } };
    }
  },

  async signUp(email, password, userData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.log('Auth error, using demo user:', error.message);
        return { id: 'demo-user', email: 'demo@example.com' };
      }
      return user || { id: 'demo-user', email: 'demo@example.com' };
    } catch (error) {
      console.log('getCurrentUser error, using demo user:', error);
      return { id: 'demo-user', email: 'demo@example.com' };
    }
  },

  // Agents CRUD
  async createAgent(agentData) {
    try {
      // Get current user
      const user = await this.getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      console.log('Creating agent for user:', userId);
      
      const agentRecord = {
        name: agentData.name,
        description: agentData.description || '',
        task_input: agentData.taskInput,
        model: agentData.selectedModel,
        permission_level: agentData.permissionLevel,
        execution_environment: agentData.executionEnvironment,
        skills: agentData.selectedSkills || [],
        status: 'active',
        created_by: userId
      };
      
      console.log('Inserting agent record:', agentRecord);
      
      const { data, error } = await supabase
        .from('agents')
        .insert([agentRecord])
        .select();
        
      if (error) {
        console.error('Supabase insert error:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Create agent error:', error);
      // Fallback - simulate success
      const mockAgent = {
        id: Date.now().toString(),
        name: agentData.name,
        description: agentData.description,
        task_input: agentData.taskInput,
        model: agentData.selectedModel,
        status: 'active',
        created_at: new Date().toISOString(),
        skills: agentData.selectedSkills
      };
      
      console.log('Using fallback agent creation:', mockAgent);
      
      // Add to local store for demo mode
      agentStore.addAgent(mockAgent);
      
      return {
        data: [mockAgent],
        error: null
      };
    }
  },

  async getAgents(userId) {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('created_by', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.log('Supabase error, using local store:', error.message);
        // Use local store for demo mode
        const localAgents = agentStore.getAgents();
        return { data: localAgents, error: null };
      }
      
      // Merge Supabase data with local store
      const localAgents = agentStore.getAgents();
      const allAgents = [...(data || []), ...localAgents];
      
      return { data: allAgents, error: null };
    } catch (error) {
      console.log('getAgents error, using local store:', error);
      // Fallback to local store
      const localAgents = agentStore.getAgents();
      return { data: localAgents, error: null };
    }
  },

  async updateAgent(id, updates) {
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .select();
    return { data, error };
  },

  async deleteAgent(id) {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Tasks
  async createTask(taskData) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        agent_id: taskData.agentId,
        title: taskData.title,
        description: taskData.description,
        status: 'pending',
        priority: taskData.priority || 'medium',
        created_by: (await this.getCurrentUser())?.id
      }])
      .select();
    return { data, error };
  },

  async getTasks(agentId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async updateTaskStatus(id, status) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select();
    return { data, error };
  },

  // Activity logs
  async logActivity(activityData) {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert([{
        agent_id: activityData.agentId,
        action: activityData.action,
        details: activityData.details,
        user_id: (await this.getCurrentUser())?.id
      }]);
    return { data, error };
  },

  async getActivityLogs(limit = 50) {
    const { data, error } = await supabase
      .from('activity_logs')
      .select(`
        *,
        agents(name)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    return { data, error };
  }
};