import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  sparklineData = [], 
  threshold,
  status = 'normal',
  unit = '',
  isLoading = false 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-amber-500 bg-amber-50';
      case 'good': return 'border-green-500 bg-green-50';
      default: return 'border-border bg-card';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 h-32">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg p-4 border-2 transition-micro ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </div>
        {status !== 'normal' && (
          <div className={`w-2 h-2 rounded-full ${
            status === 'critical' ? 'bg-red-500' : 
            status === 'warning' ? 'bg-amber-500' : 'bg-green-500'
          }`} />
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-foreground">
            {value}{unit}
          </div>
          {change && (
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
              <Icon name={getChangeIcon()} size={12} />
              <span>{change}</span>
            </div>
          )}
        </div>
        
        {sparklineData?.length > 0 && (
          <div className="w-16 h-8">
            <svg width="64" height="32" className="overflow-visible">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                points={sparklineData?.map((point, index) => 
                  `${(index / (sparklineData?.length - 1)) * 60},${32 - (point / Math.max(...sparklineData)) * 28}`
                )?.join(' ')}
                className={getChangeColor()}
              />
            </svg>
          </div>
        )}
      </div>
      {threshold && (
        <div className="mt-2 text-xs text-muted-foreground">
          Threshold: {threshold}{unit}
        </div>
      )}
    </div>
  );
};

export default MetricCard;