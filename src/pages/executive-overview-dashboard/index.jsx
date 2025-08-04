import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import DashboardHeader from './components/DashboardHeader';
import KPICard from './components/KPICard';
import RevenueChart from './components/RevenueChart';
import ClientHealthScorecard from './components/ClientHealthScorecard';
import RevenueBreakdownChart from './components/RevenueBreakdownChart';
import BarChart from './components/BarChart';
import DataTable from './components/DataTable';

const ExecutiveOverviewDashboard = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [clientFilter, setClientFilter] = useState('all');
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);

  // Enhanced KPI data with more metrics
  const kpiData = [
    {
      title: "Total Revenue",
      value: 2847500,
      change: 12.5,
      changeType: "positive",
      icon: "DollarSign",
      currency: true
    },
    {
      title: "Active Users",
      value: 45234,
      change: 8.3,
      changeType: "positive",
      icon: "Users"
    },
    {
      title: "Conversions",
      value: 2845,
      change: 15.7,
      changeType: "positive",
      icon: "Target"
    },
    {
      title: "Growth Rate",
      value: 23.4,
      change: 4.2,
      changeType: "positive",
      icon: "TrendingUp",
      percentage: true
    }
  ];

  // Revenue and client trend data
  const revenueChartData = [
    { month: "Jan", revenue: 2100000, clients: 42 },
    { month: "Feb", revenue: 2250000, clients: 45 },
    { month: "Mar", revenue: 2180000, clients: 44 },
    { month: "Apr", revenue: 2420000, clients: 48 },
    { month: "May", revenue: 2650000, clients: 52 },
    { month: "Jun", revenue: 2580000, clients: 51 },
    { month: "Jul", revenue: 2750000, clients: 54 },
    { month: "Aug", revenue: 2847500, clients: 56 }
  ];

  // Bar chart data for comparison metrics
  const barChartData = [
    { category: "Paid Ads", current: 1250000, previous: 1100000 },
    { category: "SEO", current: 850000, previous: 820000 },
    { category: "Social Media", current: 425000, previous: 380000 },
    { category: "Content", current: 212500, previous: 195000 },
    { category: "Analytics", current: 110000, previous: 98000 }
  ];

  // Client health data
  const clientHealthData = [
    {
      id: 1,
      name: "TechCorp Solutions",
      industry: "Technology",
      healthScore: 92,
      monthlyRevenue: 485000,
      lastContact: "2025-01-30",
      status: "Active"
    },
    {
      id: 2,
      name: "RetailPlus Inc.",
      industry: "E-commerce",
      healthScore: 78,
      monthlyRevenue: 325000,
      lastContact: "2025-01-28",
      status: "Active"
    },
    {
      id: 3,
      name: "HealthFirst Medical",
      industry: "Healthcare",
      healthScore: 85,
      monthlyRevenue: 420000,
      lastContact: "2025-02-01",
      status: "Active"
    },
    {
      id: 4,
      name: "Finance Group LLC",
      industry: "Financial Services",
      healthScore: 67,
      monthlyRevenue: 280000,
      lastContact: "2025-01-25",
      status: "At Risk"
    },
    {
      id: 5,
      name: "EduTech Academy",
      industry: "Education",
      healthScore: 88,
      monthlyRevenue: 195000,
      lastContact: "2025-02-02",
      status: "Active"
    }
  ];

  // Revenue breakdown data
  const revenueBreakdownData = [
    { name: "Paid Advertising", value: 1250000, percentage: 43.9 },
    { name: "SEO Services", value: 850000, percentage: 29.9 },
    { name: "Social Media", value: 425000, percentage: 14.9 },
    { name: "Content Marketing", value: 212500, percentage: 7.5 },
    { name: "Analytics & Reporting", value: 110000, percentage: 3.9 }
  ];

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    console.log('Date range changed to:', range);
  };

  const handleClientFilterChange = (filter) => {
    setClientFilter(filter);
    console.log('Client filter changed to:', filter);
  };

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    console.log('Currency changed to:', curr);
  };

  const handleExport = async (format) => {
    setLoading(true);
    try {
      console.log(`Processing ${format} request`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <NavigationHeader />
      <main className="pt-16" data-dashboard-content>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* Dashboard Header */}
          <DashboardHeader
            onDateRangeChange={handleDateRangeChange}
            onClientFilterChange={handleClientFilterChange}
            onCurrencyChange={handleCurrencyChange}
            onExport={handleExport}
            loading={loading}
          />

          {/* KPI Cards Row - Enhanced Grid System */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {kpiData?.map((kpi, index) => (
              <div key={index} className="transform transition-all duration-300 hover:scale-105">
                <KPICard
                  title={kpi?.title}
                  value={kpi?.value}
                  change={kpi?.change}
                  changeType={kpi?.changeType}
                  icon={kpi?.icon}
                  currency={kpi?.currency}
                  percentage={kpi?.percentage}
                />
              </div>
            ))}
          </div>

          {/* Primary Charts Row - Enhanced Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Revenue Line Chart */}
            <div className="transform transition-all duration-300 hover:shadow-lg">
              <RevenueChart data={revenueChartData} />
            </div>

            {/* Bar Chart for Service Comparison */}
            <div className="transform transition-all duration-300 hover:shadow-lg">
              <BarChart data={barChartData} />
            </div>
          </div>

          {/* Secondary Charts Row - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Revenue Breakdown Pie Chart */}
            <div className="lg:col-span-4 transform transition-all duration-300 hover:shadow-lg">
              <RevenueBreakdownChart data={revenueBreakdownData} />
            </div>

            {/* Client Health Scorecard */}
            <div className="lg:col-span-8 transform transition-all duration-300 hover:shadow-lg">
              <ClientHealthScorecard clients={clientHealthData} />
            </div>
          </div>

          {/* Data Table - Enhanced Container */}
          <div className="transform transition-all duration-300 hover:shadow-lg">
            <DataTable data={clientHealthData} />
          </div>

          {/* Key Insights Section - Enhanced Design */}
          <div className="bg-gradient-to-r from-card via-card to-muted/5 rounded-xl border border-border p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Key Insights & Recommendations</span>
              </h3>
              <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                AI Generated
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4">
                <div className="group p-4 sm:p-5 bg-gradient-to-r from-success/10 to-success/5 rounded-xl border border-success/20 hover:border-success/40 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-success rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center space-x-2">
                        <span>Revenue Growth</span>
                        <span className="text-success text-sm">+12.5%</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Monthly revenue increased significantly compared to last month, driven primarily by new client acquisitions and improved conversion rates across all service categories.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-4 sm:p-5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center space-x-2">
                        <span>User Engagement</span>
                        <span className="text-primary text-sm">+8.3%</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Active user base grew substantially with improved retention rates across all client segments, indicating strong service satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="group p-4 sm:p-5 bg-gradient-to-r from-warning/10 to-warning/5 rounded-xl border border-warning/20 hover:border-warning/40 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-warning rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center space-x-2">
                        <span>Client Health Alert</span>
                        <span className="text-warning text-sm">67%</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Finance Group LLC shows declining health score. Immediate account review and strategic intervention recommended to prevent churn.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-4 sm:p-5 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center space-x-2">
                        <span>Conversion Optimization</span>
                        <span className="text-accent text-sm">+15.7%</span>
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Conversion rates improved significantly through enhanced targeting and campaign optimization strategies, exceeding quarterly goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveOverviewDashboard;