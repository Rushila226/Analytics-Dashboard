import React from 'react';
import Icon from '../../../components/AppIcon';

const GoalTracking = () => {
  const quarterlyGoals = [
    {
      id: 1,
      title: "Q3 Revenue Target",
      current: 1847250,
      target: 2000000,
      unit: "$",
      progress: 92.4,
      status: "on-track",
      milestones: [
        { month: "July", achieved: true, value: 523000 },
        { month: "August", achieved: false, value: 580000, target: true },
        { month: "September", achieved: false, value: 744250, target: true }
      ]
    },
    {
      id: 2,
      title: "Lead Generation Goal",
      current: 7420,
      target: 8500,
      unit: "",
      progress: 87.3,
      status: "on-track",
      milestones: [
        { month: "July", achieved: true, value: 2450 },
        { month: "August", achieved: false, value: 2800, target: true },
        { month: "September", achieved: false, value: 3250, target: true }
      ]
    },
    {
      id: 3,
      title: "Brand Awareness Lift",
      current: 34.2,
      target: 40.0,
      unit: "%",
      progress: 85.5,
      status: "needs-attention",
      milestones: [
        { month: "July", achieved: true, value: 34.2 },
        { month: "August", achieved: false, value: 37.0, target: true },
        { month: "September", achieved: false, value: 40.0, target: true }
      ]
    },
    {
      id: 4,
      title: "Customer Acquisition Cost",
      current: 125,
      target: 100,
      unit: "$",
      progress: 80.0,
      status: "needs-attention",
      isReverse: true,
      milestones: [
        { month: "July", achieved: false, value: 125 },
        { month: "August", achieved: false, value: 115, target: true },
        { month: "September", achieved: false, value: 100, target: true }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'achieved': return 'text-success';
      case 'on-track': return 'text-primary';
      case 'needs-attention': return 'text-warning';
      case 'at-risk': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'achieved': return 'CheckCircle';
      case 'on-track': return 'TrendingUp';
      case 'needs-attention': return 'AlertTriangle';
      case 'at-risk': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  const getProgressColor = (progress, status) => {
    if (progress >= 95) return 'bg-success';
    if (progress >= 80) return 'bg-primary';
    if (progress >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const formatValue = (value, unit, isReverse = false) => {
    if (unit === '$') {
      return `$${value?.toLocaleString()}`;
    } else if (unit === '%') {
      return `${value}%`;
    } else {
      return value?.toLocaleString();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Q3 2025 Goal Tracking</h3>
          <p className="text-sm text-muted-foreground">Progress toward quarterly objectives with milestone markers</p>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-muted-foreground">3 of 4 on track</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quarterlyGoals?.map((goal) => (
          <div key={goal?.id} className="p-4 bg-muted rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-sm font-medium text-foreground">{goal?.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-lg font-bold text-foreground">
                    {formatValue(goal?.current, goal?.unit)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    of {formatValue(goal?.target, goal?.unit)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(goal?.status)} 
                  size={16} 
                  className={getStatusColor(goal?.status)}
                />
                <span className={`text-xs font-medium ${getStatusColor(goal?.status)}`}>
                  {goal?.progress?.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal?.progress, goal?.status)}`}
                  style={{ width: `${Math.min(goal?.progress, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-muted-foreground">Monthly Milestones</h5>
              <div className="grid grid-cols-3 gap-2">
                {goal?.milestones?.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded text-center ${
                      milestone?.achieved 
                        ? 'bg-success/10 border border-success/20' 
                        : milestone?.target 
                          ? 'bg-card border border-border' :'bg-muted border border-border'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Icon 
                        name={milestone?.achieved ? 'CheckCircle' : milestone?.target ? 'Target' : 'Clock'} 
                        size={12} 
                        className={
                          milestone?.achieved 
                            ? 'text-success' 
                            : milestone?.target 
                              ? 'text-primary' :'text-muted-foreground'
                        }
                      />
                      <span className="text-xs font-medium text-foreground">{milestone?.month}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatValue(milestone?.value, goal?.unit)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">3</p>
            <p className="text-xs text-muted-foreground">Goals On Track</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">1</p>
            <p className="text-xs text-muted-foreground">Needs Attention</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">86.3%</p>
            <p className="text-xs text-muted-foreground">Avg Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">62</p>
            <p className="text-xs text-muted-foreground">Days Remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracking;