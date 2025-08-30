import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  pageSize, 
  totalItems, 
  onPageChange, 
  onPageSizeChange 
}) => {
  const pageSizeOptions = [
    { value: '10', label: '10 per page' },
    { value: '25', label: '25 per page' },
    { value: '50', label: '50 per page' },
    { value: '100', label: '100 per page' }
  ];

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-card border border-border rounded-lg">
        <div className="text-sm text-muted-foreground">
          Showing {totalItems} {totalItems === 1 ? 'agent' : 'agents'}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Show:</span>
          <div className="w-32">
            <Select
              options={pageSizeOptions}
              value={pageSize?.toString()}
              onChange={(value) => onPageSizeChange(parseInt(value))}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-card border border-border rounded-lg">
      {/* Results Info */}
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} {totalItems === 1 ? 'agent' : 'agents'}
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon name="ChevronLeft" size={16} className="mr-1" />
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center space-x-1">
          {getVisiblePages()?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-sm text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Page Info */}
        <div className="sm:hidden text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>
      {/* Page Size Selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Show:</span>
        <div className="w-32">
          <Select
            options={pageSizeOptions}
            value={pageSize?.toString()}
            onChange={(value) => onPageSizeChange(parseInt(value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;