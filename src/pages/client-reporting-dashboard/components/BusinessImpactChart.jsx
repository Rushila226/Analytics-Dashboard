import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const BusinessImpactChart = () => {
  const data = [
    { month: 'Jan', revenue: 245000, leads: 1200, campaigns: 'Brand Launch' },
    { month: 'Feb', revenue: 267000, leads: 1350, campaigns: 'Valentine\'s Campaign' },
    { month: 'Mar', revenue: 298000, leads: 1580, campaigns: 'Spring Collection' },
    { month: 'Apr', revenue: 334000, leads: 1720, campaigns: 'Easter Promotion' },
    { month: 'May', revenue: 389000, leads: 1950, campaigns: 'Mother\'s Day Special' },
    { month: 'Jun', revenue: 445000, leads: 2180, campaigns: 'Summer Launch' },
    { month: 'Jul', revenue: 523000, leads: 2450, campaigns: 'Mid-Year Sale' }
  ];

  const milestones = [
    { month: 'Mar', label: 'Spring Collection Launch', value: 298000 },
    { month: 'May', label: 'Mother\'s Day Campaign Peak', value: 389000 },
    { month: 'Jul', label: 'Mid-Year Sale Success', value: 523000 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-modal">
          <p className="font-medium text-foreground">{label} 2025</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-success">
              Revenue: ${payload?.[0]?.value?.toLocaleString()}
            </p>
            <p className="text-sm text-primary">
              Leads: {payload?.[1]?.value?.toLocaleString()}
            </p>
            {data?.campaigns && (
              <p className="text-xs text-muted-foreground mt-2">
                Campaign: {data?.campaigns}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Business Impact Over Time</h3>
          <p className="text-sm text-muted-foreground">Revenue growth and lead generation trends with campaign milestones</p>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Leads</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="revenue"
              orientation="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
            />
            <YAxis 
              yAxisId="leads"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000)?.toFixed(1)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-success)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
            />
            <Line
              yAxisId="leads"
              type="monotone"
              dataKey="leads"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />

            {/* Milestone markers */}
            {milestones?.map((milestone, index) => (
              <ReferenceLine
                key={index}
                x={milestone?.month}
                stroke="var(--color-accent)"
                strokeDasharray="2 2"
                label={{
                  value: milestone?.label,
                  position: 'top',
                  fontSize: 10,
                  fill: 'var(--color-accent)'
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Seasonal Trends Note */}
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Seasonal Insights:</strong> Strong Q2 performance driven by Mother's Day campaign (+30% revenue spike). 
          Summer campaigns showing sustained growth with 23% month-over-month improvement in lead quality.
        </p>
      </div>
    </div>
  );
};

export default BusinessImpactChart;