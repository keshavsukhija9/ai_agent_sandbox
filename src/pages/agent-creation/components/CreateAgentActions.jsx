import React from 'react';
import Button from '../../../components/ui/Button';

const CreateAgentActions = ({ 
  onCreateAgent, 
  onSaveTemplate, 
  isCreating, 
  isSaving, 
  canCreate,
  className = ''
}) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Button
        variant="outline"
        onClick={onSaveTemplate}
        loading={isSaving}
        disabled={!canCreate || isCreating}
        iconName="Save"
        iconPosition="left"
        className="flex-1 sm:flex-none"
      >
        {isSaving ? 'Saving...' : 'Save as Template'}
      </Button>
      
      <Button
        onClick={onCreateAgent}
        loading={isCreating}
        disabled={!canCreate || isSaving}
        iconName="Plus"
        iconPosition="left"
        className="flex-1 sm:flex-none"
      >
        {isCreating ? 'Creating Agent...' : 'Create Agent'}
      </Button>
    </div>
  );
};

export default CreateAgentActions;