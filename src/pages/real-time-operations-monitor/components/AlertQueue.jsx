import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertQueue = ({ alerts = [], onDismiss, onResolve, isLoading = false }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'budget_exceeded': return 'DollarSign';
      case 'performance_drop': return 'TrendingDown';
      case 'conversion_anomaly': return 'Target';
      case 'traffic_spike': return 'TrendingUp';
      case 'system_error': return 'AlertTriangle';
      case 'threshold_breach': return 'AlertCircle';
      default: return 'Bell';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-amber-500 bg-amber-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-border bg-card';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-amber-100 text-amber-800',
      low: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors?.[priority] || colors?.low}`}>
        {priority?.toUpperCase() || 'LOW'}
      </span>
    );
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    return alertTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)]?.map((_, index) => (
          <div key={index} className="p-4 bg-card border border-border rounded-lg animate-pulse">
            <div className="flex items-start justify-between mb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-5 bg-muted rounded w-12"></div>
            </div>
            <div className="h-3 bg-muted rounded w-full mb-3"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Alert Queue</h3>
        <span className="text-sm text-muted-foreground">
          {alerts?.length} active alerts
        </span>
      </div>
      {alerts?.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 border rounded-lg transition-micro ${getAlertColor(alert.severity)}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name={getAlertIcon(alert.type)} size={16} className="text-foreground" />
              <span className="font-medium text-foreground">{alert.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              {getPriorityBadge(alert.priority)}
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(alert.timestamp)}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {alert.description}
          </p>
          
          {alert.campaign && (
            <p className="text-xs text-muted-foreground mb-3">
              Campaign: <span className="font-medium">{alert.campaign}</span>
            </p>
          )}
          
          {alert.metrics && (
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(alert.metrics)?.map(([key, value]) => (
                <span key={key} className="text-xs bg-background px-2 py-1 rounded">
                  {key}: <span className="font-medium">{value}</span>
                </span>
              ))}
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onResolve && onResolve(alert.id)}
              iconName="Check"
              iconSize={14}
            >
              Resolve
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss && onDismiss(alert.id)}
              iconName="X"
              iconSize={14}
            >
              Dismiss
            </Button>
          </div>
        </div>
      ))}
      {alerts?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="CheckCircle" size={32} className="mx-auto mb-2 opacity-50" />
          <p>No active alerts</p>
          <p className="text-xs mt-1">All systems operating normally</p>
        </div>
      )}
    </div>
  );
};

export default AlertQueue;