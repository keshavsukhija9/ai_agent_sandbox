import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileTabNavigation = ({ activeTab, setActiveTab, hasPreview, onPreviewOpen }) => {
  const tabs = [
    { id: 'task', label: 'Task', icon: 'FileText' },
    { id: 'config', label: 'Config', icon: 'Settings' }
  ];

  return (
    <div className="lg:hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-card">
        {tabs?.map(tab => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Preview Button - Fixed at bottom on mobile */}
      {hasPreview && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <Button
            onClick={onPreviewOpen}
            className="w-full"
            iconName="Eye"
            iconPosition="left"
          >
            View Task Preview
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileTabNavigation;