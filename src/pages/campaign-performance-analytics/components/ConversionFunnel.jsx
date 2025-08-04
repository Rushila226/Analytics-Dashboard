import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ConversionFunnel = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');

  const funnelData = [
    {
      stage: 'Impressions',
      value: 2450000,
      percentage: 100,
      dropOff: 0,
      color: 'bg-blue-500',
      icon: 'Eye'
    },
    {
      stage: 'Clicks',
      value: 73500,
      percentage: 3.0,
      dropOff: 97.0,
      color: 'bg-blue-600',
      icon: 'MousePointer'
    },
    {
      stage: 'Landing Page Views',
      value: 68250,
      percentage: 2.8,
      dropOff: 0.2,
      color: 'bg-blue-700',
      icon: 'Monitor'
    },
    {
      stage: 'Add to Cart',
      value: 12285,
      percentage: 0.5,
      dropOff: 2.3,
      color: 'bg-blue-800',
      icon: 'ShoppingCart'
    },
    {
      stage: 'Checkout Started',
      value: 8599,
      percentage: 0.35,
      dropOff: 0.15,
      color: 'bg-blue-900',
      icon: 'CreditCard'
    },
    {
      stage: 'Purchase Completed',
      value: 2548,
      percentage: 0.10,
      dropOff: 0.25,
      color: 'bg-green-600',
      icon: 'CheckCircle'
    }
  ];

  const campaignOptions = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'summer-sale', label: 'Summer Sale 2024' },
    { value: 'black-friday', label: 'Black Friday Prep' },
    { value: 'brand-awareness', label: 'Brand Awareness Q3' }
  ];

  const channelOptions = [
    { value: 'all', label: 'All Channels' },
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'facebook', label: 'Facebook Ads' },
    { value: 'linkedin', label: 'LinkedIn Ads' },
    { value: 'email', label: 'Email Marketing' }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000)?.toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000)?.toFixed(1)}K`;
    }
    return num?.toLocaleString();
  };

  const getStageWidth = (percentage) => {
    return Math.max(percentage, 5); // Minimum width for visibility
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Conversion Funnel Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Stage-by-stage conversion tracking with drop-off identification
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={campaignOptions}
            value={selectedCampaign}
            onChange={setSelectedCampaign}
            className="w-full sm:w-40"
          />
          <Select
            options={channelOptions}
            value={selectedChannel}
            onChange={setSelectedChannel}
            className="w-full sm:w-40"
          />
          <Button
            variant="outline"
            iconName="BarChart3"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Detailed Analysis
          </Button>
        </div>
      </div>
      {/* Funnel Visualization */}
      <div className="space-y-4 mb-6">
        {funnelData?.map((stage, index) => (
          <div key={stage?.stage} className="relative">
            {/* Stage Bar */}
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={`p-2 rounded-lg ${stage?.color} text-white flex-shrink-0`}>
                <Icon name={stage?.icon} size={20} />
              </div>

              {/* Funnel Bar */}
              <div className="flex-1 relative">
                <div className="bg-muted rounded-lg h-12 relative overflow-hidden">
                  <div
                    className={`${stage?.color} h-full rounded-lg transition-all duration-500 flex items-center justify-between px-4`}
                    style={{ width: `${getStageWidth(stage?.percentage * 10)}%` }}
                  >
                    <span className="text-white font-medium text-sm">
                      {stage?.stage}
                    </span>
                    <span className="text-white font-semibold">
                      {formatNumber(stage?.value)}
                    </span>
                  </div>
                </div>

                {/* Percentage and Drop-off */}
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-muted-foreground">
                    {stage?.percentage?.toFixed(2)}% of total traffic
                  </span>
                  {stage?.dropOff > 0 && (
                    <span className="text-error font-medium">
                      -{stage?.dropOff?.toFixed(2)}% drop-off
                    </span>
                  )}
                </div>
              </div>

              {/* Conversion Rate */}
              {index > 0 && (
                <div className="text-right flex-shrink-0 w-20">
                  <div className="text-sm font-semibold text-foreground">
                    {((stage?.value / funnelData?.[index - 1]?.value) * 100)?.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    conversion
                  </div>
                </div>
              )}
            </div>

            {/* Drop-off Arrow */}
            {index < funnelData?.length - 1 && stage?.dropOff > 0 && (
              <div className="flex items-center justify-center my-2">
                <div className="flex items-center gap-2 text-xs text-error bg-error/10 px-2 py-1 rounded-full">
                  <Icon name="ArrowDown" size={12} />
                  <span>{stage?.dropOff?.toFixed(1)}% lost</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {((funnelData?.[funnelData?.length - 1]?.value / funnelData?.[0]?.value) * 100)?.toFixed(2)}%
          </div>
          <div className="text-sm text-muted-foreground">Overall Conversion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {Math.max(...funnelData?.slice(1)?.map(stage => stage?.dropOff))?.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">Highest Drop-off Stage</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            ${((funnelData?.[funnelData?.length - 1]?.value * 45.20) / 1000)?.toFixed(0)}K
          </div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border">
        <Button variant="outline" size="sm" iconName="TrendingUp">
          Optimize Drop-offs
        </Button>
        <Button variant="outline" size="sm" iconName="Target">
          A/B Test Stages
        </Button>
        <Button variant="outline" size="sm" iconName="FileText">
          Export Report
        </Button>
        <Button variant="outline" size="sm" iconName="Share">
          Share Analysis
        </Button>
      </div>
    </div>
  );
};

export default ConversionFunnel;