import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const VisualizationControls = ({ 
  filters, 
  onFiltersChange, 
  timelinePosition, 
  onTimelineChange,
  selectedAgent,
  onAgentChange 
}) => {
  const agentOptions = [
    { value: 'web-scraper-1', label: 'Web Scraper Agent #1' },
    { value: 'data-processor-2', label: 'Data Processor Agent #2' },
    { value: 'content-analyzer-3', label: 'Content Analyzer Agent #3' },
    { value: 'automation-bot-4', label: 'Automation Bot Agent #4' }
  ];

  const layoutOptions = [
    { value: 'tree', label: 'Tree Layout' },
    { value: 'radial', label: 'Radial Layout' },
    { value: 'force', label: 'Force Layout' },
    { value: 'hierarchical', label: 'Hierarchical Layout' }
  ];

  const handleFilterChange = (filterKey, value) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value
    });
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting visualization as ${format}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Agent Selection */}
      <div>
        <Select
          label="Select Agent"
          options={agentOptions}
          value={selectedAgent}
          onChange={onAgentChange}
          className="w-full"
        />
      </div>
      {/* Layout Options */}
      <div>
        <Select
          label="Layout Type"
          options={layoutOptions}
          value={filters?.layout || 'tree'}
          onChange={(value) => handleFilterChange('layout', value)}
          className="w-full"
        />
      </div>
      {/* Status Filters */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Status Filters</h4>
        <div className="space-y-2">
          <Checkbox
            label="Show Completed"
            checked={filters?.showCompleted}
            onChange={(e) => handleFilterChange('showCompleted', e?.target?.checked)}
          />
          <Checkbox
            label="Show Running"
            checked={filters?.showRunning}
            onChange={(e) => handleFilterChange('showRunning', e?.target?.checked)}
          />
          <Checkbox
            label="Show Pending"
            checked={filters?.showPending}
            onChange={(e) => handleFilterChange('showPending', e?.target?.checked)}
          />
          <Checkbox
            label="Show Failed"
            checked={filters?.showFailed}
            onChange={(e) => handleFilterChange('showFailed', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Timeline Control */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Timeline</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onTimelineChange(Math.max(0, timelinePosition - 10))}
              disabled={timelinePosition <= 0}
            >
              <Icon name="SkipBack" size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onTimelineChange(Math.min(100, timelinePosition + 10))}
              disabled={timelinePosition >= 100}
            >
              <Icon name="SkipForward" size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onTimelineChange(0)}
            >
              <Icon name="RotateCcw" size={14} />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{timelinePosition}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${timelinePosition}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Display Options */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Display Options</h4>
        <div className="space-y-2">
          <Checkbox
            label="Show Node Labels"
            checked={filters?.showLabels !== false}
            onChange={(e) => handleFilterChange('showLabels', e?.target?.checked)}
          />
          <Checkbox
            label="Show Execution Time"
            checked={filters?.showTiming}
            onChange={(e) => handleFilterChange('showTiming', e?.target?.checked)}
          />
          <Checkbox
            label="Animate Transitions"
            checked={filters?.animate !== false}
            onChange={(e) => handleFilterChange('animate', e?.target?.checked)}
          />
          <Checkbox
            label="Real-time Updates"
            checked={filters?.realTime}
            onChange={(e) => handleFilterChange('realTime', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Export Options */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Export</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('png')}
          >
            <Icon name="Image" size={14} className="mr-2" />
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('svg')}
          >
            <Icon name="FileImage" size={14} className="mr-2" />
            SVG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
          >
            <Icon name="FileText" size={14} className="mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('json')}
          >
            <Icon name="Download" size={14} className="mr-2" />
            JSON
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationControls;