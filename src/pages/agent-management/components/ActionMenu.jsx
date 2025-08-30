import React, { useState, useRef, useEffect } from 'react';

import Icon from '../../../components/AppIcon';

const ActionMenu = ({ agent, isOpen, onClose, onAction, position }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !agent) return null;

  const menuItems = [
    {
      id: 'view',
      label: 'View Details',
      icon: 'Eye',
      action: () => onAction(agent, 'view')
    },
    {
      id: 'edit',
      label: 'Edit Agent',
      icon: 'Edit',
      action: () => onAction(agent, 'edit')
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: 'Copy',
      action: () => onAction(agent, 'duplicate')
    },
    { type: 'divider' },
    {
      id: 'start',
      label: agent?.status === 'active' ? 'Pause Agent' : 'Start Agent',
      icon: agent?.status === 'active' ? 'Pause' : 'Play',
      action: () => onAction(agent, agent?.status === 'active' ? 'pause' : 'start')
    },
    {
      id: 'restart',
      label: 'Restart Agent',
      icon: 'RotateCcw',
      action: () => onAction(agent, 'restart')
    },
    { type: 'divider' },
    {
      id: 'logs',
      label: 'View Logs',
      icon: 'FileText',
      action: () => onAction(agent, 'logs')
    },
    {
      id: 'export',
      label: 'Export Config',
      icon: 'Download',
      action: () => onAction(agent, 'export')
    },
    { type: 'divider' },
    {
      id: 'delete',
      label: 'Delete Agent',
      icon: 'Trash2',
      action: () => onAction(agent, 'delete'),
      destructive: true
    }
  ];

  return (
    <div
      ref={menuRef}
      className="absolute bg-popover border border-border rounded-md elevation-strong py-2 min-w-[180px] z-50"
      style={{
        top: position?.top || 0,
        left: position?.left || 0,
        transform: 'translateX(-100%)'
      }}
    >
      {menuItems?.map((item, index) => {
        if (item?.type === 'divider') {
          return <div key={index} className="border-t border-border my-2" />;
        }

        return (
          <button
            key={item?.id}
            onClick={() => {
              item?.action();
              onClose();
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted/50 transition-colors ${
              item?.destructive 
                ? 'text-error hover:text-error hover:bg-error/10' :'text-popover-foreground'
            }`}
          >
            <Icon name={item?.icon} size={16} />
            <span>{item?.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ActionMenu;