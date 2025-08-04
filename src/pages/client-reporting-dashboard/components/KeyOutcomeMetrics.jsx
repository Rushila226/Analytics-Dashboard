import React from 'react';
import Icon from '../../../components/AppIcon';

const KeyOutcomeMetrics = () => {
  const metrics = [
    {
      id: 1,
      title: "Revenue Impact",
      value: "$847,250",
      change: "+23.4%",
      trend: "up",
      goal: "$800,000",
      goalAchieved: true,
      description: "Total attributed revenue from campaigns",
      icon: "DollarSign",
      color: "text-success"
    },
    {
      id: 2,
      title: "Lead Generation",
      value: "2,847",
      change: "+18.7%",
      trend: "up",
      goal: "2,500",
      goalAchieved: true,
      description: "Qualified leads generated this period",
      icon: "Users",
      color: "text-primary"
    },
    {
      id: 3,
      title: "Brand Awareness Lift",
      value: "34.2%",
      change: "+12.1%",
      trend: "up",
      goal: "30%",
      goalAchieved: true,
      description: "Increase in brand recognition metrics",
      icon: "TrendingUp",
      color: "text-accent"
    },
    {
      id: 4,
      title: "Campaign ROI",
      value: "4.2x",
      change: "+0.8x",
      trend: "up",
      goal: "3.5x",
      goalAchieved: true,
      description: "Return on advertising spend",
      icon: "Target",
      color: "text-warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${metric?.color}`}>
              <Icon name={metric?.icon} size={24} />
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={metric?.trend === 'up' ? 'text-success' : 'text-error'}
              />
              <span className={`text-sm font-medium ${metric?.trend === 'up' ? 'text-success' : 'text-error'}`}>
                {metric?.change}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{metric?.title}</h3>
            <p className="text-3xl font-bold text-foreground">{metric?.value}</p>
            <p className="text-xs text-muted-foreground">{metric?.description}</p>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Goal: {metric?.goal}</span>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={metric?.goalAchieved ? 'CheckCircle' : 'Clock'} 
                  size={12} 
                  className={metric?.goalAchieved ? 'text-success' : 'text-warning'}
                />
                <span className={metric?.goalAchieved ? 'text-success' : 'text-warning'}>
                  {metric?.goalAchieved ? 'Achieved' : 'In Progress'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyOutcomeMetrics;