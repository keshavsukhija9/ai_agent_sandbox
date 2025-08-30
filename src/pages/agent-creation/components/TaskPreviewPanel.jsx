import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskPreviewPanel = ({ 
  previewData, 
  isVisible, 
  onClose, 
  onCreateAgent, 
  isCreating 
}) => {
  if (!isVisible || !previewData) return null;

  const { taskBreakdown, estimatedSteps, complexity, suggestedSkills } = previewData;

  const complexityColors = {
    Low: 'text-success',
    Medium: 'text-warning', 
    High: 'text-error'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Task Preview</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Review the generated task breakdown before creating your agent
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Task Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/20 rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Complexity</span>
                </div>
                <span className={`text-lg font-semibold ${complexityColors?.[complexity]}`}>
                  {complexity}
                </span>
              </div>
              
              <div className="p-4 bg-muted/20 rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Est. Steps</span>
                </div>
                <span className="text-lg font-semibold text-foreground">{estimatedSteps}</span>
              </div>
              
              <div className="p-4 bg-muted/20 rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Skills Needed</span>
                </div>
                <span className="text-lg font-semibold text-foreground">{suggestedSkills?.length}</span>
              </div>
            </div>

            {/* Task Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Task Breakdown</h3>
              <div className="space-y-3">
                {taskBreakdown?.map((step, index) => (
                  <div key={index} className="flex space-x-4 p-4 border border-border rounded-md">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{step?.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{step?.description}</p>
                      {step?.requirements && (
                        <div className="flex flex-wrap gap-2">
                          {step?.requirements?.map((req, reqIndex) => (
                            <span 
                              key={reqIndex}
                              className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-1 text-xs rounded ${
                        step?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                        step?.difficulty === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                      }`}>
                        {step?.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Skills */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedSkills?.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-md">
                    <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                      <Icon name={skill?.icon} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{skill?.name}</h4>
                      <p className="text-xs text-muted-foreground">{skill?.description}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs text-muted-foreground">{skill?.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Flow */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Execution Flow</h3>
              <div className="relative">
                {taskBreakdown?.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      {index < taskBreakdown?.length - 1 && (
                        <div className="w-px h-12 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-foreground">{step?.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Est. time: {step?.estimatedTime || '5-10 minutes'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            This preview is generated based on your task description
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Back to Edit
            </Button>
            <Button 
              onClick={onCreateAgent}
              loading={isCreating}
              iconName="Plus"
              iconPosition="left"
            >
              {isCreating ? 'Creating Agent...' : 'Create Agent'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPreviewPanel;