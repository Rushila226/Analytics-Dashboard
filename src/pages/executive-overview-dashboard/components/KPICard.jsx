import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, currency, percentage }) => {
  const formatValue = (val) => {
    if (currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })?.format(val);
    }
    
    if (percentage) {
      return `${val}%`;
    }
    
    if (val >= 1000000) {
      return `${(val / 1000000)?.toFixed(1)}M`;
    }
    
    if (val >= 1000) {
      return `${(val / 1000)?.toFixed(1)}K`;
    }
    
    return val?.toLocaleString();
  };

  const getChangeColor = () => {
    return changeType === 'positive' ? 'text-success' : 'text-error';
  };

  const getChangeBgColor = () => {
    return changeType === 'positive' ? 'bg-success/15' : 'bg-error/15';
  };

  const getCardGradient = () => {
    switch (icon) {
      case 'DollarSign': return 'from-green-500/10 to-emerald-500/10';
      case 'Users': return 'from-blue-500/10 to-cyan-500/10';
      case 'Target': return 'from-purple-500/10 to-violet-500/10';
      case 'TrendingUp': return 'from-orange-500/10 to-red-500/10';
      default: return 'from-primary/10 to-accent/10';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getCardGradient()} rounded-xl border border-border p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-muted-foreground mb-1 group-hover:text-foreground transition-colors">
            {title}
          </h3>
          <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {formatValue(value)}
          </div>
        </div>
        <div className="w-12 h-12 bg-card/50 rounded-lg flex items-center justify-center border border-border/50 group-hover:scale-110 transition-transform">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${getChangeBgColor()}`}>
          <Icon 
            name={changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
            size={14} 
            className={getChangeColor()}
          />
          <span className={`text-sm font-semibold ${getChangeColor()}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        </div>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
};

export default KPICard;