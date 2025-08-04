import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import RealTimeOperationsMonitor from './pages/real-time-operations-monitor';
import ClientReportingDashboard from './pages/client-reporting-dashboard';
import CampaignPerformanceAnalytics from './pages/campaign-performance-analytics';
import ExecutiveOverviewDashboard from './pages/executive-overview-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CampaignPerformanceAnalytics />} />
        <Route path="/real-time-operations-monitor" element={<RealTimeOperationsMonitor />} />
        <Route path="/client-reporting-dashboard" element={<ClientReportingDashboard />} />
        <Route path="/campaign-performance-analytics" element={<CampaignPerformanceAnalytics />} />
        <Route path="/executive-overview-dashboard" element={<ExecutiveOverviewDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
