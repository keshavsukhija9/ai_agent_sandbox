import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'error', label: 'Error' },
    { value: 'idle', label: 'Idle' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const performanceOptions = [
    { value: 'all', label: 'All Performance' },
    { value: 'excellent', label: 'Excellent (90%+)' },
    { value: 'good', label: 'Good (70-89%)' },
    { value: 'poor', label: 'Poor (<70%)' }
  ];

  const skillCategoryOptions = [
    { value: 'all', label: 'All Skills' },
    { value: 'web-scraping', label: 'Web Scraping' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'automation', label: 'Automation' },
    { value: 'communication', label: 'Communication' },
    { value: 'research', label: 'Research' },
    { value: 'content-generation', label: 'Content Generation' }
  ];

  const hasActiveFilters = () => {
    return filters?.search || 
           filters?.status !== 'all' || 
           filters?.dateRange !== 'all' || 
           filters?.performance !== 'all' || 
           filters?.skillCategory !== 'all';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search agents by name or task..."
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div className="min-w-[140px]">
            <Select
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => onFilterChange('status', value)}
              placeholder="Status"
            />
          </div>

          {/* Date Range Filter */}
          <div className="min-w-[140px]">
            <Select
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => onFilterChange('dateRange', value)}
              placeholder="Date Range"
            />
          </div>

          {/* Performance Filter */}
          <div className="min-w-[160px]">
            <Select
              options={performanceOptions}
              value={filters?.performance}
              onChange={(value) => onFilterChange('performance', value)}
              placeholder="Performance"
            />
          </div>

          {/* Skill Category Filter */}
          <div className="min-w-[160px]">
            <Select
              options={skillCategoryOptions}
              value={filters?.skillCategory}
              onChange={(value) => onFilterChange('skillCategory', value)}
              placeholder="Skills"
            />
          </div>
        </div>

        {/* Results and Clear */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="text-sm text-muted-foreground">
            {resultCount} {resultCount === 1 ? 'agent' : 'agents'} found
          </div>
          
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={14} className="mr-1" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {filters?.search && (
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <Icon name="Search" size={12} className="mr-1" />
              Search: "{filters?.search}"
              <button
                onClick={() => onFilterChange('search', '')}
                className="ml-2 hover:text-primary/70"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.status !== 'all' && (
            <div className="inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
              Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              <button
                onClick={() => onFilterChange('status', 'all')}
                className="ml-2 hover:text-secondary/70"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.dateRange !== 'all' && (
            <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              Date: {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}
              <button
                onClick={() => onFilterChange('dateRange', 'all')}
                className="ml-2 hover:text-accent/70"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.performance !== 'all' && (
            <div className="inline-flex items-center px-3 py-1 bg-success/10 text-success rounded-full text-sm">
              Performance: {performanceOptions?.find(opt => opt?.value === filters?.performance)?.label}
              <button
                onClick={() => onFilterChange('performance', 'all')}
                className="ml-2 hover:text-success/70"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.skillCategory !== 'all' && (
            <div className="inline-flex items-center px-3 py-1 bg-warning/10 text-warning rounded-full text-sm">
              Skills: {skillCategoryOptions?.find(opt => opt?.value === filters?.skillCategory)?.label}
              <button
                onClick={() => onFilterChange('skillCategory', 'all')}
                className="ml-2 hover:text-warning/70"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;