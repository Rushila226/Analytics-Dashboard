import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ControlPanel = ({ 
  refreshInterval, 
  onRefreshIntervalChange, 
  onEmergencyPause, 
  onRefreshData,
  connectionStatus = 'connected',
  lastUpdated 
}) => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const refreshOptions = [
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' }
  ];

  const getConnectionStatus = () => {
    switch (connectionStatus) {
      case 'connected':
        return { color: 'text-green-600', icon: 'Wifi', label: 'Connected' };
      case 'connecting':
        return { color: 'text-amber-600', icon: 'Loader', label: 'Connecting' };
      case 'disconnected':
        return { color: 'text-red-600', icon: 'WifiOff', label: 'Disconnected' };
      default:
        return { color: 'text-muted-foreground', icon: 'Wifi', label: 'Unknown' };
    }
  };

  const status = getConnectionStatus();

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Never';
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInSeconds = Math.floor((now - updated) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return updated?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleEmergencyPause = () => {
    setIsEmergencyMode(true);
    onEmergencyPause && onEmergencyPause();
    setTimeout(() => setIsEmergencyMode(false), 3000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Connection Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={status.icon} 
              size={16} 
              className={`${status.color} ${connectionStatus === 'connecting' ? 'animate-spin' : ''}`} 
            />
            <span className={`text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {formatLastUpdated(lastUpdated)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Refresh Interval */}
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <Select
              options={refreshOptions}
              value={refreshInterval}
              onChange={onRefreshIntervalChange}
              placeholder="Refresh rate"
              className="w-32"
            />
          </div>

          {/* Manual Refresh */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshData}
            iconName="RefreshCw"
            iconSize={14}
          >
            Refresh
          </Button>

          {/* Emergency Pause */}
          <Button
            variant={isEmergencyMode ? "destructive" : "outline"}
            size="sm"
            onClick={handleEmergencyPause}
            iconName={isEmergencyMode ? "Square" : "Pause"}
            iconSize={14}
            className={isEmergencyMode ? "animate-pulse" : ""}
          >
            {isEmergencyMode ? "PAUSED" : "Emergency Pause"}
          </Button>
        </div>
      </div>

      {/* Environment Status Indicators */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">API Status: Healthy</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Data Pipeline: Active</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Queue: 3 pending</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Environment: Production | Region: US-East
        </div>
      </div>

      {isEmergencyMode && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-red-600" />
            <span className="text-sm font-medium text-red-800">
              Emergency pause activated - All campaigns temporarily paused
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;