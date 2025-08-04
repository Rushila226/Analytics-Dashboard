import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';

const AdvancedFilters = ({ isOpen, onClose, onApply }) => {
  const [demographics, setDemographics] = useState({
    ageGroups: [],
    genders: [],
    incomeRanges: []
  });
  
  const [devices, setDevices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [customSegments, setCustomSegments] = useState([]);

  const ageGroupOptions = [
    { value: '18-24', label: '18-24 years' },
    { value: '25-34', label: '25-34 years' },
    { value: '35-44', label: '35-44 years' },
    { value: '45-54', label: '45-54 years' },
    { value: '55-64', label: '55-64 years' },
    { value: '65+', label: '65+ years' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const incomeOptions = [
    { value: 'under-25k', label: 'Under $25K' },
    { value: '25k-50k', label: '$25K - $50K' },
    { value: '50k-75k', label: '$50K - $75K' },
    { value: '75k-100k', label: '$75K - $100K' },
    { value: '100k-150k', label: '$100K - $150K' },
    { value: 'over-150k', label: 'Over $150K' }
  ];

  const deviceOptions = [
    { value: 'desktop', label: 'Desktop' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'smart-tv', label: 'Smart TV' }
  ];

  const locationOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' }
  ];

  const segmentOptions = [
    { value: 'new-customers', label: 'New Customers' },
    { value: 'returning-customers', label: 'Returning Customers' },
    { value: 'high-value', label: 'High Value Customers' },
    { value: 'cart-abandoners', label: 'Cart Abandoners' },
    { value: 'email-subscribers', label: 'Email Subscribers' },
    { value: 'social-followers', label: 'Social Media Followers' }
  ];

  const handleApplyFilters = () => {
    const filters = {
      demographics,
      devices,
      locations,
      customSegments
    };
    onApply(filters);
    onClose();
  };

  const handleResetFilters = () => {
    setDemographics({ ageGroups: [], genders: [], incomeRanges: [] });
    setDevices([]);
    setLocations([]);
    setCustomSegments([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Advanced Filters
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Segment your campaign data by demographics, devices, and custom audiences
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demographics */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Demographics
                </h3>

                {/* Age Groups */}
                <div className="mb-6">
                  <Select
                    label="Age Groups"
                    options={ageGroupOptions}
                    value={demographics?.ageGroups}
                    onChange={(value) => setDemographics(prev => ({ ...prev, ageGroups: value }))}
                    multiple
                    searchable
                    placeholder="Select age groups"
                  />
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <Select
                    label="Gender"
                    options={genderOptions}
                    value={demographics?.genders}
                    onChange={(value) => setDemographics(prev => ({ ...prev, genders: value }))}
                    multiple
                    placeholder="Select genders"
                  />
                </div>

                {/* Income Range */}
                <div className="mb-6">
                  <Select
                    label="Income Range"
                    options={incomeOptions}
                    value={demographics?.incomeRanges}
                    onChange={(value) => setDemographics(prev => ({ ...prev, incomeRanges: value }))}
                    multiple
                    searchable
                    placeholder="Select income ranges"
                  />
                </div>
              </div>

              {/* Devices */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Smartphone" size={20} />
                  Device Types
                </h3>
                <Select
                  options={deviceOptions}
                  value={devices}
                  onChange={setDevices}
                  multiple
                  placeholder="Select device types"
                />
              </div>
            </div>

            {/* Geographic & Custom Segments */}
            <div className="space-y-6">
              {/* Geographic */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size={20} />
                  Geographic Location
                </h3>
                <Select
                  options={locationOptions}
                  value={locations}
                  onChange={setLocations}
                  multiple
                  searchable
                  placeholder="Select locations"
                />
              </div>

              {/* Custom Segments */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Target" size={20} />
                  Custom Segments
                </h3>
                <Select
                  options={segmentOptions}
                  value={customSegments}
                  onChange={setCustomSegments}
                  multiple
                  searchable
                  placeholder="Select custom segments"
                />
              </div>

              {/* Quick Presets */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Zap" size={20} />
                  Quick Presets
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDemographics({ ageGroups: ['25-34', '35-44'], genders: [], incomeRanges: ['50k-100k'] });
                      setDevices(['mobile']);
                    }}
                    className="justify-start"
                  >
                    Mobile Millennials
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDemographics({ ageGroups: ['45-54', '55-64'], genders: [], incomeRanges: ['75k-150k'] });
                      setDevices(['desktop']);
                    }}
                    className="justify-start"
                  >
                    Desktop High-Income
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCustomSegments(['returning-customers', 'high-value']);
                      setLocations(['us', 'ca']);
                    }}
                    className="justify-start"
                  >
                    Loyal North America
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset All
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleApplyFilters}
              iconName="Filter"
              iconPosition="left"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;