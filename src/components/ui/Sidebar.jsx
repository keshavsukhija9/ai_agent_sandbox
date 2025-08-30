import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard',
      description: 'System overview and quick access'
    },
    {
      id: 'agents',
      label: 'Agents',
      icon: 'Bot',
      children: [
        {
          id: 'agent-creation',
          label: 'Create Agent',
          icon: 'Plus',
          path: '/agent-creation',
          description: 'Build new AI agents'
        },
        {
          id: 'agent-management',
          label: 'Manage Agents',
          icon: 'Settings',
          path: '/agent-management',
          description: 'Monitor and control agents'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      children: [
        {
          id: 'task-tree-visualization',
          label: 'Task Tree',
          icon: 'GitBranch',
          path: '/task-tree-visualization',
          description: 'Visualize agent task hierarchies'
        }
      ]
    }
  ];

  const [expandedSections, setExpandedSections] = useState({
    agents: true,
    analytics: true
  });

  const handleSectionToggle = (sectionId) => {
    if (isCollapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const isActiveSectionRoute = (children) => {
    return children?.some(child => location?.pathname === child?.path);
  };

  const renderNavItem = (item, isChild = false) => {
    const isActive = isActiveRoute(item?.path);
    const hasChildren = item?.children && item?.children?.length > 0;
    const isExpanded = expandedSections?.[item?.id];
    const isSectionActive = isActiveSectionRoute(item?.children);

    if (hasChildren) {
      return (
        <div key={item?.id} className="space-y-1">
          <button
            onClick={() => handleSectionToggle(item?.id)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md nav-item-hover ${
              isSectionActive
                ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={item?.icon} size={18} />
              {!isCollapsed && <span>{item?.label}</span>}
            </div>
            {!isCollapsed && (
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`}
              />
            )}
          </button>
          {!isCollapsed && isExpanded && (
            <div className="ml-6 space-y-1">
              {item?.children?.map(child => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item?.id}
        onClick={() => handleNavigation(item?.path)}
        className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md nav-item-hover ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : isChild
            ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        title={isCollapsed ? item?.description : undefined}
      >
        <Icon name={item?.icon} size={18} />
        {!isCollapsed && <span>{item?.label}</span>}
      </button>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-card border-r border-border sidebar-transition z-1000 ${
          isCollapsed ? 'w-16' : 'w-60'
        } ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map(item => renderNavItem(item))}
          </nav>

          {/* Collapse Toggle */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-full"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
                size={18} 
              />
            </Button>
          </div>
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-1100 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={onToggle} />
        <aside className="fixed left-0 top-16 bottom-0 w-60 bg-card border-r border-border sidebar-transition">
          <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigationItems?.map(item => renderNavItem(item))}
            </nav>

            {/* Close Button */}
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={onToggle}
                className="w-full"
                iconName="X"
                iconPosition="left"
              >
                Close Menu
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;