import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = () => {
  const [activeTab, setActiveTab] = useState('alerts');

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Budget Overspend Alert',
      message: 'Summer Sale campaign has exceeded 90% of monthly budget',
      campaign: 'Summer Sale 2024',
      timestamp: '2 minutes ago',
      action: 'Adjust Budget'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Conversion Rate',
      message: 'LinkedIn campaign conversion rate dropped below 2%',
      campaign: 'Brand Awareness Q3',
      timestamp: '15 minutes ago',
      action: 'Optimize Targeting'
    },
    {
      id: 3,
      type: 'info',
      title: 'High Performance',
      message: 'Mobile retargeting campaign achieving 4.5x ROAS',
      campaign: 'Retargeting - Abandoned Cart',
      timestamp: '1 hour ago',
      action: 'Scale Up'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Click Fraud Detected',
      message: 'Unusual click patterns detected in Google Ads campaign',
      campaign: 'Product Launch - Mobile',
      timestamp: '2 hours ago',
      action: 'Review Traffic'
    }
  ];

  const topPerformers = [
    {
      id: 1,
      campaign: 'Retargeting - Abandoned Cart',
      metric: 'ROAS',
      value: '4.8x',
      change: '+12%',
      trend: 'up'
    },
    {
      id: 2,
      campaign: 'Summer Sale 2024',
      metric: 'Conversions',
      value: '1,247',
      change: '+8%',
      trend: 'up'
    },
    {
      id: 3,
      campaign: 'Product Launch - Mobile',
      metric: 'CTR',
      value: '3.2%',
      change: '+15%',
      trend: 'up'
    }
  ];

  const bottomPerformers = [
    {
      id: 1,
      campaign: 'Brand Awareness Q3',
      metric: 'Conversion Rate',
      value: '1.8%',
      change: '-23%',
      trend: 'down'
    },
    {
      id: 2,
      campaign: 'Black Friday Prep',
      metric: 'CPA',
      value: '$45.20',
      change: '+18%',
      trend: 'down'
    },
    {
      id: 3,
      campaign: 'Email Newsletter',
      metric: 'Open Rate',
      value: '12.4%',
      change: '-8%',
      trend: 'down'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Performance Monitor
          </h3>
         
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
              activeTab === 'alerts' ?'bg-card text-foreground shadow-card' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveTab('rankings')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
              activeTab === 'rankings' ?'bg-card text-foreground shadow-card' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Rankings
          </button>
        </div>
      </div>
      {/* Panel Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'alerts' ? (
          <div className="space-y-4">
            {alerts?.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start gap-3">
                  <Icon 
                    name={getAlertIcon(alert.type)} 
                    size={18} 
                    className="mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert.message}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {alert.campaign} • {alert.timestamp}
                      </span>
                      <Button variant="ghost" size="xs">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Performers */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Icon name="Trophy" size={16} className="text-success" />
                Top Performers
              </h4>
              <div className="space-y-3">
                {topPerformers?.map((performer) => (
                  <div
                    key={performer?.id}
                    className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {performer?.campaign}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {performer?.metric}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {performer?.value}
                      </p>
                      <div className="flex items-center gap-1">
                        <Icon 
                          name={getTrendIcon(performer?.trend)} 
                          size={12} 
                          className={getTrendColor(performer?.trend)}
                        />
                        <span className={`text-xs ${getTrendColor(performer?.trend)}`}>
                          {performer?.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Performers */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                Needs Attention
              </h4>
              <div className="space-y-3">
                {bottomPerformers?.map((performer) => (
                  <div
                    key={performer?.id}
                    className="flex items-center justify-between p-3 bg-error/5 border border-error/20 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {performer?.campaign}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {performer?.metric}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {performer?.value}
                      </p>
                      <div className="flex items-center gap-1">
                        <Icon 
                          name={getTrendIcon(performer?.trend)} 
                          size={12} 
                          className={getTrendColor(performer?.trend)}
                        />
                        <span className={`text-xs ${getTrendColor(performer?.trend)}`}>
                          {performer?.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Panel Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: 2 minutes ago</span>
          <Button variant="ghost" size="xs" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;