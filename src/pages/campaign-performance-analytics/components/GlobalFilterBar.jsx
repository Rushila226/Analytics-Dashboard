import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GlobalFilterBar = ({ onFiltersChange }) => {
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [selectedChannels, setSelectedChannels] = useState(['all']);
  const [dateRange, setDateRange] = useState('last-30-days');
  const [comparisonMode, setComparisonMode] = useState(false);

  const campaignOptions = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'summer-sale-2024', label: 'Summer Sale 2024' },
    { value: 'black-friday-prep', label: 'Black Friday Prep' },
    { value: 'brand-awareness-q3', label: 'Brand Awareness Q3' },
    { value: 'product-launch-mobile', label: 'Product Launch - Mobile' },
    { value: 'retargeting-abandoned-cart', label: 'Retargeting - Abandoned Cart' }
  ];

  const channelOptions = [
    { value: 'all', label: 'All Channels' },
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'facebook', label: 'Facebook Ads' },
    { value: 'linkedin', label: 'LinkedIn Ads' },
    { value: 'email', label: 'Email Marketing' },
    { value: 'instagram', label: 'Instagram Ads' },
    { value: 'youtube', label: 'YouTube Ads' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleApplyFilters = () => {
    const filters = {
      campaign: selectedCampaign,
      channels: selectedChannels,
      dateRange,
      comparisonMode
    };
    onFiltersChange(filters);
  };

  const handleResetFilters = () => {
    setSelectedCampaign('all');
    setSelectedChannels(['all']);
    setDateRange('last-30-days');
    setComparisonMode(false);
    onFiltersChange({
      campaign: 'all',
      channels: ['all'],
      dateRange: 'last-30-days',
      comparisonMode: false
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        {/* Campaign Selector */}
        <div className="flex-1 min-w-0">
          <Select
            label="Campaign"
            options={campaignOptions}
            value={selectedCampaign}
            onChange={setSelectedCampaign}
            searchable
          />
        </div>

        {/* Channel Multi-Select */}
        <div className="flex-1 min-w-0">
          <Select
            label="Channels"
            options={channelOptions}
            value={selectedChannels}
            onChange={setSelectedChannels}
            multiple
            searchable
          />
        </div>

        {/* Date Range */}
        <div className="flex-1 min-w-0">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>

        {/* Comparison Mode Toggle */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-foreground mb-2">
            Compare Periods
          </label>
          <Button
            variant={comparisonMode ? "default" : "outline"}
            onClick={() => setComparisonMode(!comparisonMode)}
            iconName={comparisonMode ? "ToggleRight" : "ToggleLeft"}
            iconPosition="left"
            className="h-10"
          >
            {comparisonMode ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="default"
            onClick={handleApplyFilters}
            iconName="Filter"
            iconPosition="left"
            className="h-10"
          >
            Apply
          </Button>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            iconName="RotateCcw"
            className="h-10"
          >
            Reset
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(selectedCampaign !== 'all' || selectedChannels?.length > 1 || selectedChannels?.[0] !== 'all' || comparisonMode) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {selectedCampaign !== 'all' && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
              <span>Campaign: {campaignOptions?.find(c => c?.value === selectedCampaign)?.label}</span>
              <button
                onClick={() => setSelectedCampaign('all')}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}

          {selectedChannels?.length > 1 || selectedChannels?.[0] !== 'all' ? (
            selectedChannels?.filter(ch => ch !== 'all')?.map(channel => (
              <div key={channel} className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-md text-xs">
                <span>{channelOptions?.find(c => c?.value === channel)?.label}</span>
                <button
                  onClick={() => setSelectedChannels(prev => prev?.filter(c => c !== channel))}
                  className="hover:bg-accent/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))
          ) : null}

          {comparisonMode && (
            <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-md text-xs">
              <span>Comparison Mode</span>
              <button
                onClick={() => setComparisonMode(false)}
                className="hover:bg-success/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalFilterBar;