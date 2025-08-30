import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AgentCreation from './pages/agent-creation';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import AgentManagement from './pages/agent-management';
import Register from './pages/register';
import TaskTreeVisualization from './pages/task-tree-visualization';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AgentCreation />} />
        <Route path="/agent-creation" element={<AgentCreation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agent-management" element={<AgentManagement />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task-tree-visualization" element={<TaskTreeVisualization />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
