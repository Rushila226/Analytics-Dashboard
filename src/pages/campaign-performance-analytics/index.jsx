import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import GlobalFilterBar from './components/GlobalFilterBar';
import MetricsStrip from './components/MetricsStrip';
import PerformanceChart from './components/PerformanceChart';
import AlertsPanel from './components/AlertsPanel';
import ConversionFunnel from './components/ConversionFunnel';
import AdvancedFilters from './components/AdvancedFilters';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CampaignPerformanceAnalytics = () => {
  const [filters, setFilters] = useState({
    campaign: 'all',
    channels: ['all'],
    dateRange: 'last-30-days',
    comparisonMode: false
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setLastUpdated(new Date());
  };

  const handleAdvancedFiltersApply = (advancedFilters) => {
    console.log('Advanced filters applied:', advancedFilters);
    setLastUpdated(new Date());
  };

  const handleExportData = () => {
    // Mock export functionality
    console.log('Exporting campaign performance data...');
  };

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    return date?.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-16">
        <div className="max-w-[1920px] mx-auto p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Campaign Performance Analytics
              </h1>
              <p className="text-muted-foreground">
                Comprehensive multi-channel campaign monitoring and optimization insights
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Real-time Status */}
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
                <span className="text-muted-foreground">
                  Last updated: {formatLastUpdated(lastUpdated)}
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                  iconName={isRealTimeEnabled ? 'Pause' : 'Play'}
                >
                  {isRealTimeEnabled ? 'Pause' : 'Resume'}
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(true)}
                  iconName="SlidersHorizontal"
                  iconPosition="left"
                >
                  Advanced Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Global Filter Bar */}
          <GlobalFilterBar onFiltersChange={handleFiltersChange} />

          {/* Primary Metrics Strip */}
          <MetricsStrip />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
            {/* Performance Chart - 12 columns */}
            <div className="xl:col-span-3">
              <PerformanceChart />
            </div>

            {/* Alerts Panel - 4 columns */}
            <div className="xl:col-span-1">
              <AlertsPanel />
            </div>
          </div>

          {/* Conversion Funnel - Full Width */}
          <ConversionFunnel />

          {/* Additional Insights */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Performance Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best Performing Channel</span>
                  <span className="font-medium text-foreground">Google Ads</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Highest ROAS Campaign</span>
                  <span className="font-medium text-foreground">Retargeting - Cart</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Peak Performance Time</span>
                  <span className="font-medium text-foreground">2-4 PM EST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Budget Utilization</span>
                  <span className="font-medium text-success">87%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Zap" size={20} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" size="sm" fullWidth iconName="TrendingUp" iconPosition="left">
                  Optimize Low Performers
                </Button>
                <Button variant="outline" size="sm" fullWidth iconName="Copy" iconPosition="left">
                  Duplicate Best Campaign
                </Button>
                <Button variant="outline" size="sm" fullWidth iconName="DollarSign" iconPosition="left">
                  Adjust Budget Allocation
                </Button>
                <Button variant="outline" size="sm" fullWidth iconName="Target" iconPosition="left">
                  Create A/B Test
                </Button>
              </div>
            </div>

            {/* Data Quality */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Shield" size={20} />
                Data Quality
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Data Completeness</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-[95%] h-full bg-success rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-success">95%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Attribution Accuracy</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-[88%] h-full bg-success rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-success">88%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sync Status</span>
                  <div className="flex items-center gap-1">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs text-success">Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApply={handleAdvancedFiltersApply}
      />
    </div>
  );
};

export default CampaignPerformanceAnalytics;