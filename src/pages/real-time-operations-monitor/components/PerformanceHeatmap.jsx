import React from 'react';
import Button from '../../../components/ui/Button';



const PerformanceHeatmap = ({ data = [], onCellClick, isLoading = false }) => {
  const timeSlots = [
    '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
    '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
  ];
  
  const channels = [
    'Google Ads', 'Facebook Ads', 'Instagram', 'LinkedIn'
  ];

  const getIntensityColor = (value) => {
    if (value >= 0.8) return 'bg-green-600';
    if (value >= 0.6) return 'bg-green-400';
    if (value >= 0.4) return 'bg-yellow-400';
    if (value >= 0.2) return 'bg-orange-400';
    if (value > 0) return 'bg-red-400';
    return 'bg-gray-200';
  };

  const getIntensityValue = (channel, timeSlot) => {
    const item = data?.find(d => d?.channel === channel && d?.timeSlot === timeSlot);
    return item ? item?.performance : 0;
  };

  const formatTooltip = (channel, timeSlot, value) => {
    return `${channel} at ${timeSlot}: ${(value * 100)?.toFixed(1)}% performance`;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-13 gap-1">
            {[...Array(104)]?.map((_, index) => (
              <div key={index} className="h-8 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Performance Heatmap</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Low</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded"></div>
              <div className="w-3 h-3 bg-orange-400 rounded"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded"></div>
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <div className="w-3 h-3 bg-green-600 rounded"></div>
            </div>
            <span>High</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconSize={14}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Time slot headers */}
          <div className="grid grid-cols-13 gap-1 mb-2">
            <div></div> {/* Empty cell for channel labels */}
            {timeSlots?.map((slot) => (
              <div key={slot} className="text-xs text-center text-muted-foreground font-medium">
                {slot}
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          {channels?.map((channel) => (
            <div key={channel} className="grid grid-cols-13 gap-1 mb-1">
              <div className="text-xs text-right text-muted-foreground font-medium py-2 pr-2">
                {channel}
              </div>
              {timeSlots?.map((timeSlot) => {
                const value = getIntensityValue(channel, timeSlot);
                return (
                  <button
                    key={`${channel}-${timeSlot}`}
                    className={`h-8 rounded transition-micro hover:opacity-80 ${getIntensityColor(value)}`}
                    onClick={() => onCellClick && onCellClick({ channel, timeSlot, value })}
                    title={formatTooltip(channel, timeSlot, value)}
                  >
                    <span className="sr-only">
                      {formatTooltip(channel, timeSlot, value)}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default PerformanceHeatmap;