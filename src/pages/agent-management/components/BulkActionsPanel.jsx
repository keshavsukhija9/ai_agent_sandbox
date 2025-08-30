import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActionsPanel = ({ 
  selectedAgents, 
  onBulkAction, 
  onClearSelection 
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleBulkAction = (action) => {
    if (action === 'delete') {
      if (!isConfirmingDelete) {
        setIsConfirmingDelete(true);
        setTimeout(() => setIsConfirmingDelete(false), 3000);
        return;
      }
    }
    
    onBulkAction(action, selectedAgents);
    setIsConfirmingDelete(false);
  };

  if (selectedAgents?.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg elevation-strong p-4 min-w-[400px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="CheckSquare" size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                {selectedAgents?.length} agent{selectedAgents?.length !== 1 ? 's' : ''} selected
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose an action to apply to selected agents
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('start')}
            className="flex items-center space-x-2"
          >
            <Icon name="Play" size={14} />
            <span>Start</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('pause')}
            className="flex items-center space-x-2"
          >
            <Icon name="Pause" size={14} />
            <span>Pause</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('restart')}
            className="flex items-center space-x-2"
          >
            <Icon name="RotateCcw" size={14} />
            <span>Restart</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('duplicate')}
            className="flex items-center space-x-2"
          >
            <Icon name="Copy" size={14} />
            <span>Duplicate</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('export')}
            className="flex items-center space-x-2"
          >
            <Icon name="Download" size={14} />
            <span>Export</span>
          </Button>

          <Button
            variant={isConfirmingDelete ? "destructive" : "outline"}
            size="sm"
            onClick={() => handleBulkAction('delete')}
            className="flex items-center space-x-2"
          >
            <Icon name={isConfirmingDelete ? "AlertTriangle" : "Trash2"} size={14} />
            <span>{isConfirmingDelete ? "Confirm Delete" : "Delete"}</span>
          </Button>
        </div>

        {isConfirmingDelete && (
          <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <p className="text-sm text-error">
                This action cannot be undone. Click "Confirm Delete" again to proceed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionsPanel;