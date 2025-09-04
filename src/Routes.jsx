import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import AuthCallback from "components/AuthCallback";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/agent-creation" element={<ProtectedRoute><AgentCreation /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/agent-management" element={<ProtectedRoute><AgentManagement /></ProtectedRoute>} />
        <Route path="/task-tree-visualization" element={<ProtectedRoute><TaskTreeVisualization /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
