import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis } from 'recharts';
import Icon from '../../../components/AppIcon';

const SummaryPanel = () => {
  const keyWins = [
    {
      id: 1,
      title: "Record Monthly Revenue",
      description: "Achieved highest monthly revenue of $523K in July, exceeding target by 23%",
      impact: "High",
      icon: "Trophy"
    },
    {
      id: 2,
      title: "Lead Quality Improvement",
      description: "Conversion rate increased to 34.2% through audience refinement",
      impact: "High",
      icon: "Target"
    },
    {
      id: 3,
      title: "Cost Efficiency Gains",
      description: "Reduced cost per acquisition by 18% while maintaining lead volume",
      impact: "Medium",
      icon: "TrendingDown"
    }
  ];

  const optimizationActions = [
    {
      id: 1,
      action: "Audience Segmentation",
      result: "+15% CTR improvement",
      status: "completed"
    },
    {
      id: 2,
      action: "Creative A/B Testing",
      result: "+22% engagement boost",
      status: "completed"
    },
    {
      id: 3,
      action: "Budget Reallocation",
      result: "+12% ROAS increase",
      status: "completed"
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Expand High-Performing Segments",
      priority: "High",
      timeline: "Next 2 weeks",
      expectedImpact: "+25% lead volume"
    },
    {
      id: 2,
      title: "Launch Retargeting Campaign",
      priority: "Medium",
      timeline: "Next month",
      expectedImpact: "+15% conversion rate"
    },
    {
      id: 3,
      title: "Seasonal Content Strategy",
      priority: "Medium",
      timeline: "Q4 2025",
      expectedImpact: "+20% brand awareness"
    }
  ];

  const channelData = [
    { name: 'Google Ads', value: 35, color: '#3B82F6' },
    { name: 'Facebook', value: 28, color: '#10B981' },
    { name: 'LinkedIn', value: 22, color: '#F59E0B' },
    { name: 'Email', value: 15, color: '#EF4444' }
  ];

  const performanceData = [
    { metric: 'CTR', value: 3.4 },
    { metric: 'CVR', value: 12.8 },
    { metric: 'CPC', value: 2.1 },
    { metric: 'ROAS', value: 4.2 }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Wins */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Award" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Key Wins</h3>
        </div>
        <div className="space-y-4">
          {keyWins?.map((win) => (
            <div key={win?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className={`w-8 h-8 rounded-full bg-card flex items-center justify-center ${getImpactColor(win?.impact)}`}>
                <Icon name={win?.icon} size={16} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground">{win?.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{win?.description}</p>
                <span className={`inline-block text-xs font-medium mt-2 ${getImpactColor(win?.impact)}`}>
                  {win?.impact} Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Channel Performance Mini Chart */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Channel Distribution</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                dataKey="value"
              >
                {channelData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {channelData?.map((channel, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: channel?.color }}
              ></div>
              <span className="text-xs text-muted-foreground">{channel?.name}: {channel?.value}%</span>
            </div>
          ))}
        </div>
      </div>
      {/* Optimization Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Actions Taken</h3>
        </div>
        <div className="space-y-3">
          {optimizationActions?.map((action) => (
            <div key={action?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-foreground">{action?.action}</h4>
                <p className="text-xs text-success">{action?.result}</p>
              </div>
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
          ))}
        </div>
      </div>
      {/* Performance Metrics Mini Chart */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <XAxis dataKey="metric" fontSize={10} />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Next Period Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
        </div>
        <div className="space-y-4">
          {recommendations?.map((rec) => (
            <div key={rec?.id} className="p-3 bg-muted rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{rec?.title}</h4>
                <span className={`text-xs font-medium ${getPriorityColor(rec?.priority)}`}>
                  {rec?.priority}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Timeline: {rec?.timeline}</p>
                <p className="text-xs text-success">Expected: {rec?.expectedImpact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;