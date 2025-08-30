import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TreeNavigationSidebar = ({ onNodeSelect, selectedNode, isCollapsed, onToggle }) => {
  const [expandedNodes, setExpandedNodes] = useState({
    'root': true,
    'task-1': true,
    'task-2': false,
    'task-3': true,
    'task-4': false
  });

  // Mock tree structure for navigation
  const treeStructure = {
    id: 'root',
    name: 'Web Scraping Analysis',
    type: 'root',
    status: 'completed',
    children: [
      {
        id: 'task-1',
        name: 'Initialize Browser',
        type: 'setup',
        status: 'completed',
        children: [
          {
            id: 'subtask-1-1',
            name: 'Load Extensions',
            type: 'config',
            status: 'completed'
          },
          {
            id: 'subtask-1-2',
            name: 'Set User Agent',
            type: 'config',
            status: 'completed'
          }
        ]
      },
      {
        id: 'task-2',
        name: 'Navigate to Target Sites',
        type: 'navigation',
        status: 'completed',
        children: [
          {
            id: 'subtask-2-1',
            name: 'Handle Cookie Consent',
            type: 'interaction',
            status: 'completed'
          },
          {
            id: 'subtask-2-2',
            name: 'Wait for Page Load',
            type: 'wait',
            status: 'completed'
          }
        ]
      },
      {
        id: 'task-3',
        name: 'Extract Product Data',
        type: 'extraction',
        status: 'running',
        children: [
          {
            id: 'subtask-3-1',
            name: 'Parse Product Titles',
            type: 'parsing',
            status: 'completed'
          },
          {
            id: 'subtask-3-2',
            name: 'Extract Pricing Data',
            type: 'parsing',
            status: 'running'
          },
          {
            id: 'subtask-3-3',
            name: 'Capture Product Images',
            type: 'media',
            status: 'pending'
          }
        ]
      },
      {
        id: 'task-4',
        name: 'Data Processing',
        type: 'processing',
        status: 'pending',
        children: [
          {
            id: 'subtask-4-1',
            name: 'Data Validation',
            type: 'validation',
            status: 'pending'
          },
          {
            id: 'subtask-4-2',
            name: 'Format Output',
            type: 'formatting',
            status: 'pending'
          }
        ]
      }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'running': return 'Play';
      case 'failed': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'running': return 'text-warning';
      case 'failed': return 'text-error';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const handleNodeToggle = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev?.[nodeId]
    }));
  };

  const handleNodeClick = (node) => {
    onNodeSelect(node);
  };

  const renderTreeNode = (node, level = 0) => {
    const isExpanded = expandedNodes?.[node?.id];
    const hasChildren = node?.children && node?.children?.length > 0;
    const isSelected = selectedNode?.id === node?.id;

    return (
      <div key={node?.id} className="select-none">
        <div
          className={`flex items-center space-x-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted/50 ${
            isSelected ? 'bg-primary/10 text-primary' : 'text-foreground'
          }`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => handleNodeClick(node)}
        >
          {hasChildren && !isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 p-0"
              onClick={(e) => {
                e?.stopPropagation();
                handleNodeToggle(node?.id);
              }}
            >
              <Icon 
                name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
                size={12} 
              />
            </Button>
          )}
          
          {!hasChildren && !isCollapsed && (
            <div className="w-4 h-4" />
          )}

          <Icon 
            name={getStatusIcon(node?.status)} 
            size={14} 
            className={getStatusColor(node?.status)}
          />

          {!isCollapsed && (
            <span className="text-sm font-medium truncate flex-1">
              {node?.name}
            </span>
          )}
        </div>
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1">
            {node?.children?.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-card border-r border-border h-full flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <h3 className="text-sm font-semibold text-foreground">Task Tree</h3>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-8 h-8"
        >
          <Icon 
            name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
            size={16} 
          />
        </Button>
      </div>

      {/* Tree Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        {renderTreeNode(treeStructure)}
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Total Tasks</span>
              <span className="font-medium text-foreground">10</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-medium text-success">6</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Running</span>
              <span className="font-medium text-warning">1</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Pending</span>
              <span className="font-medium text-muted-foreground">3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeNavigationSidebar;