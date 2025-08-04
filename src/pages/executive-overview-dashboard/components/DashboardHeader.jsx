import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver/dist/FileSaver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DashboardHeader = ({ onDateRangeChange, onClientFilterChange, onCurrencyChange, onExport, loading }) => {
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exportLoading, setExportLoading] = useState(false);

  const dateRangeOptions = [
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const clientOptions = [
    { value: 'all', label: 'All Clients' },
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'retailplus', label: 'RetailPlus Inc.' },
    { value: 'healthfirst', label: 'HealthFirst Medical' },
    { value: 'financegroup', label: 'Finance Group LLC' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD (C$)' }
  ];

  const handleDateRangeChange = (value) => {
    setSelectedDateRange(value);
    if (onDateRangeChange) onDateRangeChange(value);
  };

  const handleClientFilterChange = (value) => {
    setSelectedClient(value);
    if (onClientFilterChange) onClientFilterChange(value);
  };

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
    if (onCurrencyChange) onCurrencyChange(value);
  };

  const exportToExcel = async () => {
    setExportLoading(true);
    try {
      // Enhanced data for export with more comprehensive information
      const kpiData = [
        { Metric: 'Total Revenue', Value: '$2,847,500', Change: '+12.5%', Status: 'Positive' },
        { Metric: 'Active Users', Value: '45,234', Change: '+8.3%', Status: 'Positive' },
        { Metric: 'Conversions', Value: '2,845', Change: '+15.7%', Status: 'Positive' },
        { Metric: 'Growth Rate', Value: '23.4%', Change: '+4.2%', Status: 'Positive' }
      ];

      const clientData = [
        { Client: 'TechCorp Solutions', Revenue: '$485,000', HealthScore: '92%', Industry: 'Technology', Status: 'Active', LastContact: '2025-01-30' },
        { Client: 'RetailPlus Inc.', Revenue: '$325,000', HealthScore: '78%', Industry: 'E-commerce', Status: 'Active', LastContact: '2025-01-28' },
        { Client: 'HealthFirst Medical', Revenue: '$420,000', HealthScore: '85%', Industry: 'Healthcare', Status: 'Active', LastContact: '2025-02-01' },
        { Client: 'Finance Group LLC', Revenue: '$280,000', HealthScore: '67%', Industry: 'Financial Services', Status: 'At Risk', LastContact: '2025-01-25' },
        { Client: 'EduTech Academy', Revenue: '$195,000', HealthScore: '88%', Industry: 'Education', Status: 'Active', LastContact: '2025-02-02' }
      ];

      const revenueBreakdown = [
        { Service: 'Paid Advertising', Revenue: '$1,250,000', Percentage: '43.9%' },
        { Service: 'SEO Services', Revenue: '$850,000', Percentage: '29.9%' },
        { Service: 'Social Media', Revenue: '$425,000', Percentage: '14.9%' },
        { Service: 'Content Marketing', Revenue: '$212,500', Percentage: '7.5%' },
        { Service: 'Analytics & Reporting', Revenue: '$110,000', Percentage: '3.9%' }
      ];

      // Create workbook with multiple sheets
      const wb = XLSX?.utils?.book_new();
      
      // Add KPI sheet
      const kpiWs = XLSX?.utils?.json_to_sheet(kpiData);
      XLSX?.utils?.book_append_sheet(wb, kpiWs, 'KPI Metrics');
      
      // Add Client Data sheet
      const clientWs = XLSX?.utils?.json_to_sheet(clientData);
      XLSX?.utils?.book_append_sheet(wb, clientWs, 'Client Overview');
      
      // Add Revenue Breakdown sheet
      const revenueWs = XLSX?.utils?.json_to_sheet(revenueBreakdown);
      XLSX?.utils?.book_append_sheet(wb, revenueWs, 'Revenue Breakdown');
      
      // Export file
      const excelBuffer = XLSX?.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      const timestamp = new Date()?.toISOString()?.split('T')?.[0];
      saveAs(data, `executive-overview-report-${timestamp}.xlsx`);
      
      // Show success message
      console.log('Excel export completed successfully');
    } catch (error) {
      console.error('Excel export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const exportToPDF = async () => {
    setExportLoading(true);
    try {
      // Target the main dashboard content
      const element = document.querySelector('[data-dashboard-content]') || document.querySelector('main');
      if (!element) {
        console.error('Dashboard content not found');
        return;
      }

      // Configure html2canvas for better quality
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element?.scrollWidth,
        height: element?.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      const imgData = canvas?.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calculate dimensions
      const pdfWidth = pdf?.internal?.pageSize?.getWidth();
      const pdfHeight = pdf?.internal?.pageSize?.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas?.height * imgWidth) / canvas?.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add header
      pdf?.setFontSize(20);
      pdf?.text('Executive Overview Dashboard', 20, 25);
      pdf?.setFontSize(12);
      pdf?.text(`Generated on: ${new Date()?.toLocaleDateString()}`, 20, 35);
      
      // Add main content
      pdf?.addImage(imgData, 'PNG', 0, 45, imgWidth, imgHeight - 45);
      heightLeft -= (pdfHeight - 45);

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf?.addPage();
        pdf?.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const timestamp = new Date()?.toISOString()?.split('T')?.[0];
      pdf?.save(`executive-overview-report-${timestamp}.pdf`);
      
      console.log('PDF export completed successfully');
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export failed. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const handleRefresh = () => {
    // Trigger data refresh
    if (onExport) {
      onExport('refresh');
    }
    // Reload the page as fallback
    setTimeout(() => {
      window.location?.reload();
    }, 100);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-lg mb-6">
      <div className="flex flex-col space-y-4">
        {/* Title Section - Enhanced */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Executive Overview
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Strategic insights and portfolio performance monitoring with real-time analytics
            </p>
          </div>
          
          {/* Export Buttons - Enhanced Mobile Design */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                onClick={handleRefresh}
                disabled={loading || exportLoading}
                className="flex-1 sm:flex-none hover:bg-primary/10 transition-all duration-200"
              >
                <span className="sm:inline">Refresh</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="FileSpreadsheet"
                onClick={exportToExcel}
                disabled={exportLoading || loading}
                className="flex-1 sm:flex-none hover:bg-success/10 hover:text-success hover:border-success transition-all duration-200"
              >
                <span className="sm:inline">Excel</span>
              </Button>
            </div>
            
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              onClick={exportToPDF}
              disabled={exportLoading || loading}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200 shadow-md"
            >
              <span className="sm:inline">PDF Report</span>
            </Button>
          </div>
        </div>
        
        {/* Filters Section - Enhanced Responsive Design */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          <div className="flex flex-col space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date Range</label>
                <Select
                  options={dateRangeOptions}
                  value={selectedDateRange}
                  onChange={handleDateRangeChange}
                  placeholder="Select date range"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Client Filter</label>
                <Select
                  options={clientOptions}
                  value={selectedClient}
                  onChange={handleClientFilterChange}
                  placeholder="Filter clients"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Currency</label>
                <Select
                  options={currencyOptions}
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                  placeholder="Currency"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Status Bar - Enhanced */}
        <div className="pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-primary" />
                <span>Last updated: {new Date()?.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Activity" size={14} className="text-success" />
                <span>Auto-refresh: 30 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-accent" />
                <span>Data encrypted & secure</span>
              </div>
            </div>
            
            {(loading || exportLoading) && (
              <div className="flex items-center space-x-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                <Icon name="Loader2" size={14} className="animate-spin" />
                <span>
                  {exportLoading ? 'Generating report...' : 'Refreshing data...'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;