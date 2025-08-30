import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExecutionTimeline = ({ selectedNode, timelinePosition, onTimelineChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Mock timeline data
  const timelineEvents = [
    {
      id: 1,
      timestamp: 0,
      event: 'Task Started',
      nodeId: 'root',
      type: 'start',
      description: 'Web scraping analysis task initiated'
    },
    {
      id: 2,
      timestamp: 10,
      event: 'Browser Initialized',
      nodeId: 'task-1',
      type: 'progress',
      description: 'Headless browser instance created'
    },
    {
      id: 3,
      timestamp: 25,
      event: 'Navigation Started',
      nodeId: 'task-2',
      type: 'progress',
      description: 'Navigating to target websites'
    },
    {
      id: 4,
      timestamp: 45,
      event: 'Data Extraction',
      nodeId: 'task-3',
      type: 'progress',
      description: 'Extracting product information'
    },
    {
      id: 5,
      timestamp: 70,
      event: 'Processing Data',
      nodeId: 'task-4',
      type: 'progress',
      description: 'Cleaning and structuring data'
    },
    {
      id: 6,
      timestamp: 100,
      event: 'Task Completed',
      nodeId: 'root',
      type: 'complete',
      description: 'All tasks completed successfully'
    }
  ];

  const speedOptions = [0.5, 1, 1.5, 2, 3];

  useEffect(() => {
    let interval;
    if (isPlaying && timelinePosition < 100) {
      interval = setInterval(() => {
        onTimelineChange(prev => {
          const newPosition = Math.min(100, prev + (playbackSpeed * 0.5));
          if (newPosition >= 100) {
            setIsPlaying(false);
          }
          return newPosition;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timelinePosition, playbackSpeed, onTimelineChange]);

  const handlePlayPause = () => {
    if (timelinePosition >= 100) {
      onTimelineChange(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = () => {
    const currentIndex = speedOptions?.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speedOptions?.length;
    setPlaybackSpeed(speedOptions?.[nextIndex]);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'start': return 'Play';
      case 'progress': return 'Activity';
      case 'complete': return 'CheckCircle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'start': return 'text-primary';
      case 'progress': return 'text-warning';
      case 'complete': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (percentage) => {
    const totalMinutes = 30; // Mock total duration
    const minutes = Math.floor((percentage / 100) * totalMinutes);
    const seconds = Math.floor(((percentage / 100) * totalMinutes * 60) % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const currentEvents = timelineEvents?.filter(event => event?.timestamp <= timelinePosition);
  const nextEvent = timelineEvents?.find(event => event?.timestamp > timelinePosition);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Timeline Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Execution Timeline</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {formatTime(timelinePosition)} / {formatTime(100)}
            </span>
          </div>
        </div>
      </div>
      {/* Timeline Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePlayPause}
          >
            <Icon 
              name={isPlaying ? 'Pause' : (timelinePosition >= 100 ? 'RotateCcw' : 'Play')} 
              size={16} 
            />
          </Button>

          {/* Speed Control */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSpeedChange}
          >
            {playbackSpeed}x
          </Button>

          {/* Timeline Scrubber */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={timelinePosition}
                onChange={(e) => onTimelineChange(Number(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${timelinePosition}%, var(--color-muted) ${timelinePosition}%, var(--color-muted) 100%)`
                }}
              />
              
              {/* Event Markers */}
              {timelineEvents?.map(event => (
                <div
                  key={event?.id}
                  className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-card cursor-pointer"
                  style={{ 
                    left: `${event?.timestamp}%`,
                    backgroundColor: event?.timestamp <= timelinePosition ? 'var(--color-primary)' : 'var(--color-muted-foreground)'
                  }}
                  title={event?.event}
                  onClick={() => onTimelineChange(event?.timestamp)}
                />
              ))}
            </div>
          </div>

          {/* Jump Controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onTimelineChange(0)}
              disabled={timelinePosition === 0}
            >
              <Icon name="SkipBack" size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onTimelineChange(100)}
              disabled={timelinePosition === 100}
            >
              <Icon name="SkipForward" size={14} />
            </Button>
          </div>
        </div>
      </div>
      {/* Timeline Events */}
      <div className="max-h-64 overflow-y-auto">
        <div className="p-4 space-y-3">
          {currentEvents?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Clock" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No events at current timeline position</p>
            </div>
          ) : (
            <>
              {currentEvents?.map((event, index) => (
                <div key={event?.id} className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full ${getEventColor(event?.type)} bg-current/10`}>
                    <Icon name={getEventIcon(event?.type)} size={12} className="text-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">{event?.event}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(event?.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event?.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {nextEvent && (
                <div className="flex items-start space-x-3 opacity-50">
                  <div className="p-1.5 rounded-full text-muted-foreground bg-muted/50">
                    <Icon name={getEventIcon(nextEvent?.type)} size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        {nextEvent?.event}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(nextEvent?.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upcoming: {nextEvent?.description}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutionTimeline;