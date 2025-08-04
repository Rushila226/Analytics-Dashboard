import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import AlertQueue from './components/AlertQueue';
import PerformanceHeatmap from './components/PerformanceHeatmap';
import ControlPanel from './components/ControlPanel';

const RealTimeOperationsMonitor = () => {
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock real-time metrics data
  const [metrics] = useState([
    {
      title: "Live Spend Rate",
      value: "$2,847",
      change: "+12.3%",
      changeType: "positive",
      icon: "DollarSign",
      sparklineData: [2100, 2200, 2400, 2300, 2500, 2600, 2847],
      threshold: "$3,000",
      status: "normal",
      unit: "/hr"
    },
    {
      title: "Impression Velocity",
      value: "847K",
      change: "+8.7%",
      changeType: "positive",
      icon: "Eye",
      sparklineData: [780, 790, 820, 830, 840, 845, 847],
      threshold: "1M",
      status: "good",
      unit: "/hr"
    },
    {
      title: "Click-Through Rate",
      value: "3.24",
      change: "-0.15%",
      changeType: "negative",
      icon: "MousePointer",
      sparklineData: [3.4, 3.35, 3.3, 3.28, 3.26, 3.25, 3.24],
      threshold: "3.0",
      status: "warning",
      unit: "%"
    },
    {
      title: "Conversion Rate",
      value: "2.87",
      change: "+0.23%",
      changeType: "positive",
      icon: "Target",
      sparklineData: [2.6, 2.65, 2.7, 2.75, 2.8, 2.85, 2.87],
      threshold: "2.5",
      status: "good",
      unit: "%"
    },
    {
      title: "Cost Per Click",
      value: "$1.23",
      change: "-$0.05",
      changeType: "positive",
      icon: "CreditCard",
      sparklineData: [1.35, 1.32, 1.28, 1.26, 1.25, 1.24, 1.23],
      threshold: "$1.50",
      status: "good"
    },
    {
      title: "Quality Score",
      value: "8.4",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      sparklineData: [8.1, 8.15, 8.2, 8.25, 8.3, 8.35, 8.4],
      threshold: "7.0",
      status: "good",
      unit: "/10"
    }
  ]);

  // Mock activity feed data
  const [activities] = useState([
    {
      id: 1,
      type: "bid_change",
      severity: "info",
      title: "Bid Adjustment Applied",
      description: "Increased CPC bid by 15% for high-performing keywords",
      campaign: "Holiday Sale 2024",
      timestamp: new Date(Date.now() - 120000),
      metrics: { "Previous Bid": "$1.20", "New Bid": "$1.38" }
    },
    {
      id: 2,
      type: "threshold_breach",
      severity: "warning",
      title: "CTR Below Threshold",
      description: "Click-through rate dropped below 3.0% threshold",
      campaign: "Brand Awareness Q4",
      timestamp: new Date(Date.now() - 300000),
      metrics: { "Current CTR": "2.87%", "Threshold": "3.0%" }
    },
    {
      id: 3,
      type: "conversion",
      severity: "success",
      title: "High-Value Conversion",
      description: "Conversion worth $2,450 recorded from Google Ads",
      campaign: "Premium Products",
      timestamp: new Date(Date.now() - 480000),
      metrics: { "Value": "$2,450", "Source": "Google Ads" }
    },
    {
      id: 4,
      type: "budget_alert",
      severity: "warning",
      title: "Budget 80% Consumed",
      description: "Daily budget is 80% consumed with 6 hours remaining",
      campaign: "Flash Sale Weekend",
      timestamp: new Date(Date.now() - 600000),
      metrics: { "Spent": "$800", "Budget": "$1,000" }
    },
    {
      id: 5,
      type: "performance_alert",
      severity: "critical",
      title: "Performance Drop Detected",
      description: "Significant drop in conversion rate over the last hour",
      campaign: "Lead Generation",
      timestamp: new Date(Date.now() - 900000),
      metrics: { "Previous": "4.2%", "Current": "2.1%" }
    }
  ]);

  // Mock alerts data
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "budget_exceeded",
      severity: "critical",
      priority: "high",
      title: "Budget Exceeded",
      description: "Campaign has exceeded daily budget by 15%. Immediate action required.",
      campaign: "Black Friday Sale",
      timestamp: new Date(Date.now() - 180000),
      metrics: { "Budget": "$1,000", "Spent": "$1,150" }
    },
    {
      id: 2,
      type: "performance_drop",
      severity: "warning",
      priority: "medium",
      title: "Performance Decline",
      description: "Conversion rate has dropped 25% compared to yesterday\'s average.",
      campaign: "Product Launch",
      timestamp: new Date(Date.now() - 420000),
      metrics: { "Yesterday": "3.2%", "Today": "2.4%" }
    },
    {
      id: 3,
      type: "traffic_spike",
      severity: "info",
      priority: "low",
      title: "Traffic Spike Detected",
      description: "Unusual traffic increase detected. Monitor for quality and conversion impact.",
      campaign: "Viral Content",
      timestamp: new Date(Date.now() - 720000),
      metrics: { "Normal": "1.2K/hr", "Current": "3.8K/hr" }
    }
  ]);

  // Mock heatmap data
  const [heatmapData] = useState([
    { channel: 'Google Ads', timeSlot: '08:00', performance: 0.85 },
    { channel: 'Google Ads', timeSlot: '10:00', performance: 0.92 },
    { channel: 'Google Ads', timeSlot: '12:00', performance: 0.78 },
    { channel: 'Google Ads', timeSlot: '14:00', performance: 0.88 },
    { channel: 'Google Ads', timeSlot: '16:00', performance: 0.95 },
    { channel: 'Google Ads', timeSlot: '18:00', performance: 0.82 },
    { channel: 'Facebook Ads', timeSlot: '08:00', performance: 0.72 },
    { channel: 'Facebook Ads', timeSlot: '10:00', performance: 0.68 },
    { channel: 'Facebook Ads', timeSlot: '12:00', performance: 0.85 },
    { channel: 'Facebook Ads', timeSlot: '14:00', performance: 0.90 },
    { channel: 'Facebook Ads', timeSlot: '16:00', performance: 0.87 },
    { channel: 'Facebook Ads', timeSlot: '18:00', performance: 0.93 },
    { channel: 'Instagram', timeSlot: '08:00', performance: 0.65 },
    { channel: 'Instagram', timeSlot: '10:00', performance: 0.70 },
    { channel: 'Instagram', timeSlot: '12:00', performance: 0.88 },
    { channel: 'Instagram', timeSlot: '14:00', performance: 0.92 },
    { channel: 'Instagram', timeSlot: '16:00', performance: 0.89 },
    { channel: 'Instagram', timeSlot: '18:00', performance: 0.95 },
    { channel: 'LinkedIn', timeSlot: '08:00', performance: 0.45 },
    { channel: 'LinkedIn', timeSlot: '10:00', performance: 0.78 },
    { channel: 'LinkedIn', timeSlot: '12:00', performance: 0.82 },
    { channel: 'LinkedIn', timeSlot: '14:00', performance: 0.85 },
    { channel: 'LinkedIn', timeSlot: '16:00', performance: 0.75 },
    { channel: 'LinkedIn', timeSlot: '18:00', performance: 0.55 }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate connection status changes occasionally
      if (Math.random() < 0.05) {
        setConnectionStatus(prev => prev === 'connected' ? 'connecting' : 'connected');
      }
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleRefreshIntervalChange = (newInterval) => {
    setRefreshInterval(newInterval);
  };

  const handleEmergencyPause = () => {
    console.log('Emergency pause activated - All campaigns paused');
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const handleAlertDismiss = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert.id !== alertId));
  };

  const handleAlertResolve = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert.id !== alertId));
  };

  const handleHeatmapCellClick = (cellData) => {
    console.log('Heatmap cell clicked:', cellData);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Real-Time Operations Monitor
            </h1>
            <p className="text-muted-foreground">
              Live campaign performance tracking with immediate anomaly detection for proactive optimization
            </p>
          </div>

          {/* Control Panel */}
          <div className="mb-8">
            <ControlPanel
              refreshInterval={refreshInterval}
              onRefreshIntervalChange={handleRefreshIntervalChange}
              onEmergencyPause={handleEmergencyPause}
              onRefreshData={handleRefreshData}
              connectionStatus={connectionStatus}
              lastUpdated={lastUpdated}
            />
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                sparklineData={metric?.sparklineData}
                threshold={metric?.threshold}
                status={metric?.status}
                unit={metric?.unit}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Live Activity Feed
                </h2>
                <ActivityFeed activities={activities} isLoading={isLoading} />
              </div>
            </div>

            {/* Alert Queue */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6">
                <AlertQueue
                  alerts={alerts}
                  onDismiss={handleAlertDismiss}
                  onResolve={handleAlertResolve}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Performance Heatmap */}
          <div className="mb-8">
            <PerformanceHeatmap
              data={heatmapData}
              onCellClick={handleHeatmapCellClick}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeOperationsMonitor;