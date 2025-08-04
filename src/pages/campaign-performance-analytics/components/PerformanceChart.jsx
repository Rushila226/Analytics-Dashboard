import React, { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PerformanceChart = () => {
  const [chartView, setChartView] = useState('combined');
  const [timeGranularity, setTimeGranularity] = useState('daily');

  const chartData = [
    {
      date: '2024-07-04',
      spend: 2400,
      conversions: 87,
      roas: 3.2,
      impressions: 45000,
      clicks: 1250
    },
    {
      date: '2024-07-05',
      spend: 2100,
      conversions: 92,
      roas: 3.8,
      impressions: 42000,
      clicks: 1180
    },
    {
      date: '2024-07-06',
      spend: 2800,
      conversions: 78,
      roas: 2.9,
      impressions: 48000,
      clicks: 1420
    },
    {
      date: '2024-07-07',
      spend: 2600,
      conversions: 105,
      roas: 4.1,
      impressions: 46000,
      clicks: 1350
    },
    {
      date: '2024-07-08',
      spend: 3200,
      conversions: 118,
      roas: 3.7,
      impressions: 52000,
      clicks: 1580
    },
    {
      date: '2024-07-09',
      spend: 2900,
      conversions: 95,
      roas: 3.3,
      impressions: 49000,
      clicks: 1420
    },
    {
      date: '2024-07-10',
      spend: 3400,
      conversions: 132,
      roas: 4.5,
      impressions: 55000,
      clicks: 1680
    },
    {
      date: '2024-07-11',
      spend: 3100,
      conversions: 108,
      roas: 3.9,
      impressions: 51000,
      clicks: 1520
    },
    {
      date: '2024-07-12',
      spend: 2750,
      conversions: 89,
      roas: 3.4,
      impressions: 47000,
      clicks: 1380
    },
    {
      date: '2024-07-13',
      spend: 3600,
      conversions: 145,
      roas: 4.8,
      impressions: 58000,
      clicks: 1750
    }
  ];

  const viewOptions = [
    { value: 'combined', label: 'Combined View' },
    { value: 'spend-only', label: 'Spend Only' },
    { value: 'conversions-only', label: 'Conversions Only' },
    { value: 'roas-only', label: 'ROAS Only' }
  ];

  const granularityOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value) => {
    return `$${value?.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-modal">
          <p className="font-medium text-foreground mb-2">
            {formatDate(label)}
          </p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">
                {entry?.dataKey === 'spend' ? formatCurrency(entry?.value) : 
                 entry?.dataKey === 'roas' ? `${entry?.value}x` : 
                 entry?.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Campaign Performance Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Spend, conversions, and ROAS over time with drill-down capabilities
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={granularityOptions}
            value={timeGranularity}
            onChange={setTimeGranularity}
            className="w-full sm:w-32"
          />
          <Select
            options={viewOptions}
            value={chartView}
            onChange={setChartView}
            className="w-full sm:w-40"
          />
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {(chartView === 'combined' || chartView === 'spend-only') && (
              <Bar 
                yAxisId="left"
                dataKey="spend" 
                fill="var(--color-primary)"
                name="Spend"
                radius={[2, 2, 0, 0]}
              />
            )}
            
            {(chartView === 'combined' || chartView === 'conversions-only') && (
              <Bar 
                yAxisId="left"
                dataKey="conversions" 
                fill="var(--color-success)"
                name="Conversions"
                radius={[2, 2, 0, 0]}
              />
            )}
            
            {(chartView === 'combined' || chartView === 'roas-only') && (
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="roas" 
                stroke="var(--color-accent)"
                strokeWidth={3}
                name="ROAS"
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>


      {/*<div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="MousePointer" size={16} />
            <span>Click to filter by campaign</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="ZoomIn" size={16} />
            <span>Drag to zoom</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" iconName="RotateCcw">
            Reset Zoom
          </Button>
          <Button variant="ghost" size="sm" iconName="Maximize2">
            Fullscreen
          </Button>
        </div>
      </div>*/}
    </div>
  );
};

export default PerformanceChart;