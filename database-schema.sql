-- Supabase Database Schema for AI Agent Sandbox

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  task_input TEXT NOT NULL,
  model VARCHAR(100) NOT NULL,
  permission_level VARCHAR(50) NOT NULL,
  execution_environment VARCHAR(50) NOT NULL,
  skills JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'active',
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  result JSONB,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for agents
CREATE POLICY "Users can view their own agents" ON agents
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create agents" ON agents
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own agents" ON agents
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own agents" ON agents
  FOR DELETE USING (auth.uid() = created_by);

-- Create policies for tasks
CREATE POLICY "Users can view tasks for their agents" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM agents 
      WHERE agents.id = tasks.agent_id 
      AND agents.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can create tasks for their agents" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM agents 
      WHERE agents.id = tasks.agent_id 
      AND agents.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks for their agents" ON tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM agents 
      WHERE agents.id = tasks.agent_id 
      AND agents.created_by = auth.uid()
    )
  );

-- Create policies for activity_logs
CREATE POLICY "Users can view their activity logs" ON activity_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create activity logs" ON activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_agents_created_by ON agents(created_by);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_tasks_agent_id ON tasks(agent_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_agent_id ON activity_logs(agent_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();