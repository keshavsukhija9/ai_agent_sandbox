import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/agent-creation': { label: 'Create Agent', icon: 'Plus', parent: '/dashboard' },
    '/agent-management': { label: 'Manage Agents', icon: 'Settings', parent: '/dashboard' },
    '/task-tree-visualization': { label: 'Task Tree Visualization', icon: 'GitBranch', parent: '/dashboard' },
  };

  const generateBreadcrumbs = () => {
    const currentPath = location?.pathname;
    const currentRoute = routeMap?.[currentPath];
    
    if (!currentRoute) return [];

    const breadcrumbs = [];
    let path = currentPath;
    
    while (path && routeMap?.[path]) {
      const route = routeMap?.[path];
      breadcrumbs?.unshift({
        label: route?.label,
        icon: route?.icon,
        path: path,
        isActive: path === currentPath
      });
      path = route?.parent;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground" 
              />
            )}
            
            {crumb?.isActive ? (
              <div className="flex items-center space-x-2 text-foreground font-medium">
                <Icon name={crumb?.icon} size={16} />
                <span>{crumb?.label}</span>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(crumb?.path)}
                className="h-auto p-1 text-muted-foreground hover:text-foreground"
              >
                <div className="flex items-center space-x-2">
                  <Icon name={crumb?.icon} size={16} />
                  <span>{crumb?.label}</span>
                </div>
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;