import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ClientHeader = ({ selectedClient, onClientChange, selectedPeriod, onPeriodChange, onExport }) => {
  const [isExporting, setIsExporting] = useState(false);

  const clientOptions = [
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'retailplus', label: 'RetailPlus Inc.' },
    { value: 'healthfirst', label: 'HealthFirst Medical' },
    { value: 'financegroup', label: 'Finance Group LLC' }
  ];

  const periodOptions = [
    { value: 'current-month', label: 'Current Month (July 2025)' },
    { value: 'last-month', label: 'Last Month (June 2025)' },
    { value: 'current-quarter', label: 'Q3 2025' },
    { value: 'last-quarter', label: 'Q2 2025' },
    { value: 'ytd', label: 'Year to Date 2025' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Client Branding Area */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Client Performance Report</h1>
            <p className="text-muted-foreground">Comprehensive marketing analytics and insights</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Select
            label="Client"
            options={clientOptions}
            value={selectedClient}
            onChange={onClientChange}
            className="w-full sm:w-48"
          />
          
          <Select
            label="Period"
            options={periodOptions}
            value={selectedPeriod}
            onChange={onPeriodChange}
            className="w-full sm:w-52"
          />

          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            loading={isExporting}
            onClick={handleExport}
            className="w-full sm:w-auto"
          >
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;