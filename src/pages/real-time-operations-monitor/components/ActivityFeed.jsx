import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [], isLoading = false }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'campaign_start': return 'Play';
      case 'campaign_pause': return 'Pause';
      case 'bid_change': return 'DollarSign';
      case 'budget_alert': return 'AlertTriangle';
      case 'performance_alert': return 'TrendingDown';
      case 'conversion': return 'Target';
      case 'threshold_breach': return 'AlertCircle';
      default: return 'Activity';
    }
  };

  const getActivityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'success': return 'text-green-600 bg-green-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - activityTime) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return activityTime?.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-card rounded-lg animate-pulse">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {activities?.map((activity) => (
        <div
          key={activity?.id}
          className="flex items-start space-x-3 p-3 bg-card border border-border rounded-lg hover:bg-muted/50 transition-micro"
        >
          <div className={`p-2 rounded-full ${getActivityColor(activity?.severity)}`}>
            <Icon name={getActivityIcon(activity?.type)} size={14} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activity?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity?.description}
                </p>
                {activity?.campaign && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Campaign: {activity?.campaign}
                  </p>
                )}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {formatTimestamp(activity?.timestamp)}
              </span>
            </div>
            
            {activity?.metrics && (
              <div className="flex items-center space-x-4 mt-2 text-xs">
                {Object.entries(activity?.metrics)?.map(([key, value]) => (
                  <span key={key} className="text-muted-foreground">
                    {key}: <span className="font-medium">{value}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {activities?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Activity" size={32} className="mx-auto mb-2 opacity-50" />
          <p>No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;