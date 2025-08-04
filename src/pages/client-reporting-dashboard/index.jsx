import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import ClientHeader from './components/ClientHeader';
import KeyOutcomeMetrics from './components/KeyOutcomeMetrics';
import BusinessImpactChart from './components/BusinessImpactChart';
import SummaryPanel from './components/SummaryPanel';
import GoalTracking from './components/GoalTracking';

const ClientReportingDashboard = () => {
  const [selectedClient, setSelectedClient] = useState('techcorp');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedClient, selectedPeriod]);

  const handleClientChange = (clientId) => {
    setIsLoading(true);
    setSelectedClient(clientId);
  };

  const handlePeriodChange = (period) => {
    setIsLoading(true);
    setSelectedPeriod(period);
  };

  const handleExport = async () => {
    // Simulate PDF export
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Exporting PDF report for client:', selectedClient, 'period:', selectedPeriod);
        resolve();
      }, 2000);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="pt-16">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-card border-b border-border p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg"></div>
                  <div>
                    <div className="h-8 bg-muted rounded w-64 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-48"></div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="h-10 bg-muted rounded w-48"></div>
                  <div className="h-10 bg-muted rounded w-52"></div>
                  <div className="h-10 bg-muted rounded w-32"></div>
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-6">
              {/* Metrics Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4]?.map((i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-6 shadow-card">
                    <div className="h-12 bg-muted rounded mb-4"></div>
                    <div className="h-8 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                ))}
              </div>

              {/* Chart and Panel Skeleton */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <div className="xl:col-span-2">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                    <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                    <div className="h-80 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3]?.map((i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-6 shadow-card">
                      <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goal Tracking Skeleton */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                <div className="h-6 bg-muted rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[1, 2, 3, 4]?.map((i) => (
                    <div key={i} className="p-4 bg-muted rounded-lg">
                      <div className="h-16 bg-card rounded mb-4"></div>
                      <div className="h-2 bg-card rounded mb-4"></div>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3]?.map((j) => (
                          <div key={j} className="h-12 bg-card rounded"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="pt-16">
        <ClientHeader
          selectedClient={selectedClient}
          onClientChange={handleClientChange}
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          onExport={handleExport}
        />

        <div className="p-6">
          {/* Key Outcome Metrics */}
          <KeyOutcomeMetrics />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Business Impact Chart - 8 columns equivalent */}
            <div className="xl:col-span-2">
              <BusinessImpactChart />
            </div>

            {/* Summary Panel - 4 columns equivalent */}
            <div>
              <SummaryPanel />
            </div>
          </div>

          {/* Goal Tracking */}
          <GoalTracking />
        </div>
      </div>
    </div>
  );
};

export default ClientReportingDashboard;