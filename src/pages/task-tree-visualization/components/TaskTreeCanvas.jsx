import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskTreeCanvas = ({ selectedAgent, onNodeSelect, selectedNode, filters, timelinePosition }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });

  // Mock task tree data
  const taskTreeData = {
    id: 'root',
    name: 'Web Scraping Analysis',
    type: 'root',
    status: 'completed',
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() - 1800000),
    duration: 1800000,
    description: 'Extract and analyze product data from e-commerce websites',
    children: [
      {
        id: 'task-1',
        name: 'Initialize Browser',
        type: 'setup',
        status: 'completed',
        startTime: new Date(Date.now() - 3600000),
        endTime: new Date(Date.now() - 3540000),
        duration: 60000,
        description: 'Launch headless browser with required configurations',
        output: 'Browser initialized successfully with Chrome 119',
        children: [
          {
            id: 'subtask-1-1',
            name: 'Load Extensions',
            type: 'config',
            status: 'completed',
            startTime: new Date(Date.now() - 3555000),
            endTime: new Date(Date.now() - 3545000),
            duration: 10000,
            description: 'Load required browser extensions for scraping',
            output: 'Extensions loaded: AdBlock, UserAgent Switcher'
          },
          {
            id: 'subtask-1-2',
            name: 'Set User Agent',
            type: 'config',
            status: 'completed',
            startTime: new Date(Date.now() - 3545000),
            endTime: new Date(Date.now() - 3540000),
            duration: 5000,
            description: 'Configure browser user agent string',
            output: 'User agent set to: Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          }
        ]
      },
      {
        id: 'task-2',
        name: 'Navigate to Target Sites',
        type: 'navigation',
        status: 'completed',
        startTime: new Date(Date.now() - 3540000),
        endTime: new Date(Date.now() - 3300000),
        duration: 240000,
        description: 'Visit target e-commerce websites and handle navigation',
        output: 'Successfully navigated to 5 target websites',
        children: [
          {
            id: 'subtask-2-1',
            name: 'Handle Cookie Consent',
            type: 'interaction',
            status: 'completed',
            startTime: new Date(Date.now() - 3535000),
            endTime: new Date(Date.now() - 3520000),
            duration: 15000,
            description: 'Accept cookie consent dialogs on websites',
            output: 'Cookie consent handled for all sites'
          },
          {
            id: 'subtask-2-2',
            name: 'Wait for Page Load',
            type: 'wait',
            status: 'completed',
            startTime: new Date(Date.now() - 3520000),
            endTime: new Date(Date.now() - 3300000),
            duration: 220000,
            description: 'Wait for dynamic content to load completely',
            output: 'All pages loaded successfully'
          }
        ]
      },
      {
        id: 'task-3',
        name: 'Extract Product Data',
        type: 'extraction',
        status: 'running',
        startTime: new Date(Date.now() - 3300000),
        endTime: null,
        duration: null,
        description: 'Extract product information using CSS selectors',
        children: [
          {
            id: 'subtask-3-1',
            name: 'Parse Product Titles',
            type: 'parsing',
            status: 'completed',
            startTime: new Date(Date.now() - 3295000),
            endTime: new Date(Date.now() - 3200000),
            duration: 95000,
            description: 'Extract product titles from page elements',
            output: '247 product titles extracted'
          },
          {
            id: 'subtask-3-2',
            name: 'Extract Pricing Data',
            type: 'parsing',
            status: 'running',
            startTime: new Date(Date.now() - 3200000),
            endTime: null,
            duration: null,
            description: 'Extract price information and currency data',
            output: 'Processing... 156/247 prices extracted'
          },
          {
            id: 'subtask-3-3',
            name: 'Capture Product Images',
            type: 'media',
            status: 'pending',
            startTime: null,
            endTime: null,
            duration: null,
            description: 'Download and process product images',
            output: null
          }
        ]
      },
      {
        id: 'task-4',
        name: 'Data Processing',
        type: 'processing',
        status: 'pending',
        startTime: null,
        endTime: null,
        duration: null,
        description: 'Clean and structure extracted data',
        children: [
          {
            id: 'subtask-4-1',
            name: 'Data Validation',
            type: 'validation',
            status: 'pending',
            startTime: null,
            endTime: null,
            duration: null,
            description: 'Validate extracted data for completeness',
            output: null
          },
          {
            id: 'subtask-4-2',
            name: 'Format Output',
            type: 'formatting',
            status: 'pending',
            startTime: null,
            endTime: null,
            duration: null,
            description: 'Format data into structured JSON output',
            output: null
          }
        ]
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#059669';
      case 'running': return '#F59E0B';
      case 'failed': return '#DC2626';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case 'root': return 'GitBranch';
      case 'setup': return 'Settings';
      case 'navigation': return 'Navigation';
      case 'extraction': return 'Download';
      case 'processing': return 'Cpu';
      case 'config': return 'Wrench';
      case 'interaction': return 'MousePointer';
      case 'wait': return 'Clock';
      case 'parsing': return 'FileText';
      case 'media': return 'Image';
      case 'validation': return 'CheckCircle';
      case 'formatting': return 'FileOutput';
      default: return 'Circle';
    }
  };

  const flattenTree = (node, level = 0, parent = null) => {
    const flattened = [{
      ...node,
      level,
      parent,
      x: 0,
      y: 0
    }];

    if (node?.children) {
      node?.children?.forEach(child => {
        flattened?.push(...flattenTree(child, level + 1, node?.id));
      });
    }

    return flattened;
  };

  const filterNodes = (nodes) => {
    if (!filters?.showCompleted) {
      nodes = nodes?.filter(node => node?.status !== 'completed');
    }
    if (!filters?.showPending) {
      nodes = nodes?.filter(node => node?.status !== 'pending');
    }
    if (!filters?.showFailed) {
      nodes = nodes?.filter(node => node?.status !== 'failed');
    }
    return nodes;
  };

  const createVisualization = useCallback(() => {
    const svg = d3?.select(svgRef?.current);
    svg?.selectAll("*")?.remove();

    let nodes = filterNodes(flattenTree(taskTreeData));
    
    // Create hierarchical layout
    const treeLayout = d3?.tree()?.size([dimensions?.height - 100, dimensions?.width - 200])?.separation((a, b) => a?.parent === b?.parent ? 1 : 2);

    const hierarchy = d3?.hierarchy(taskTreeData);
    const treeData = treeLayout(hierarchy);

    // Create zoom behavior
    const zoom = d3?.zoom()?.scaleExtent([0.1, 3])?.on('zoom', (event) => {
        const { x, y, k } = event?.transform;
        setTransform({ x, y, k });
        g?.attr('transform', event?.transform);
      });

    svg?.call(zoom);

    const g = svg?.append('g')?.attr('transform', `translate(${transform?.x},${transform?.y}) scale(${transform?.k})`);

    // Create links
    const links = treeData?.links();
    g?.selectAll('.link')?.data(links)?.enter()?.append('path')?.attr('class', 'link')?.attr('d', d3?.linkHorizontal()?.x(d => d?.y + 100)?.y(d => d?.x + 50))?.style('fill', 'none')?.style('stroke', '#E5E7EB')?.style('stroke-width', 2);

    // Create nodes
    const nodeGroups = g?.selectAll('.node')?.data(treeData?.descendants())?.enter()?.append('g')?.attr('class', 'node')?.attr('transform', d => `translate(${d?.y + 100},${d?.x + 50})`)?.style('cursor', 'pointer')?.on('click', (event, d) => {
        onNodeSelect(d?.data);
      });

    // Node circles
    nodeGroups?.append('circle')?.attr('r', 20)?.style('fill', d => getStatusColor(d?.data?.status))?.style('stroke', '#FFFFFF')?.style('stroke-width', 3)?.style('opacity', d => selectedNode?.id === d?.data?.id ? 1 : 0.8);

    // Node icons (simplified as text for now)
    nodeGroups?.append('text')?.attr('text-anchor', 'middle')?.attr('dy', '0.35em')?.style('fill', '#FFFFFF')?.style('font-size', '12px')?.style('font-weight', 'bold')?.text(d => d?.data?.type?.charAt(0)?.toUpperCase());

    // Node labels
    nodeGroups?.append('text')?.attr('x', 30)?.attr('dy', '0.35em')?.style('fill', '#111827')?.style('font-size', '14px')?.style('font-weight', '500')?.text(d => d?.data?.name);

    // Status indicators
    nodeGroups?.append('text')?.attr('x', 30)?.attr('y', 15)?.style('fill', '#6B7280')?.style('font-size', '12px')?.text(d => d?.data?.status);

  }, [dimensions, filters, selectedNode, onNodeSelect, transform]);

  useEffect(() => {
    const handleResize = () => {
      if (svgRef?.current) {
        const rect = svgRef?.current?.parentElement?.getBoundingClientRect();
        setDimensions({ width: rect?.width, height: rect?.height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    createVisualization();
  }, [createVisualization]);

  const handleZoomIn = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.transform,
      d3?.zoomTransform(svg?.node())?.scale(transform?.k * 1.2)
    );
  };

  const handleZoomOut = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.transform,
      d3?.zoomTransform(svg?.node())?.scale(transform?.k * 0.8)
    );
  };

  const handleResetZoom = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.transform,
      d3?.zoomIdentity
    );
  };

  return (
    <div className="relative w-full h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <Icon name="ZoomIn" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <Icon name="ZoomOut" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleResetZoom}
          title="Reset Zoom"
        >
          <Icon name="RotateCcw" size={16} />
        </Button>
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="bg-background"
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-4 elevation-moderate">
        <h4 className="text-sm font-medium text-foreground mb-3">Status Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Running</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-xs text-muted-foreground">Failed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTreeCanvas;