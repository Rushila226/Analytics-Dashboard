import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsStrip = () => {
  const metrics = [
    {
      id: 'roi',
      label: 'Campaign ROI',
      value: '324%',
      change: '+12.5%',
      trend: 'up',
      benchmark: 'Above Target',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      id: 'spend',
      label: 'Total Spend',
      value: '$47,892',
      change: '+8.2%',
      trend: 'up',
      benchmark: 'Within Budget',
      icon: 'DollarSign',
      color: 'primary'
    },
    {
      id: 'conversion',
      label: 'Conversion Rate',
      value: '3.47%',
      change: '-0.3%',
      trend: 'down',
      benchmark: 'Below Target',
      icon: 'Target',
      color: 'warning'
    },
    {
      id: 'cpa',
      label: 'Cost Per Acquisition',
      value: '$28.45',
      change: '-5.1%',
      trend: 'down',
      benchmark: 'Improved',
      icon: 'Users',
      color: 'success'
    }
  ];

  const getColorClasses = (color, trend) => {
    const colorMap = {
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        icon: 'text-success'
      },
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        icon: 'text-primary'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        icon: 'text-warning'
      },
      error: {
        bg: 'bg-error/10',
        text: 'text-error',
        icon: 'text-error'
      }
    };

    return colorMap?.[color] || colorMap?.primary;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'ArrowUp' : 'ArrowDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => {
        const colors = getColorClasses(metric?.color, metric?.trend);
        
        return (
          <div
            key={metric?.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-micro"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${colors?.bg}`}>
                <Icon 
                  name={metric?.icon} 
                  size={20} 
                  className={colors?.icon}
                />
              </div>
              <div className="flex items-center gap-1">
                <Icon 
                  name={getTrendIcon(metric?.trend)} 
                  size={16} 
                  className={getTrendColor(metric?.trend)}
                />
                <span className={`text-sm font-medium ${getTrendColor(metric?.trend)}`}>
                  {metric?.change}
                </span>
              </div>
            </div>
            {/* Value */}
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {metric?.value}
              </h3>
              <p className="text-sm text-muted-foreground">
                {metric?.label}
              </p>
            </div>
            {/* Benchmark */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${colors?.bg?.replace('/10', '')}`} />
              <span className="text-xs text-muted-foreground">
                {metric?.benchmark}
              </span>
            </div>
            {/* Mini Chart Placeholder */}
            <div className="mt-4 h-8 bg-muted/30 rounded flex items-end justify-between px-1">
              {[...Array(12)]?.map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-t ${colors?.bg?.replace('/10', '/30')}`}
                  style={{
                    height: `${Math.random() * 100}%`,
                    minHeight: '20%'
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsStrip;