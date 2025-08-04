import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomBarChart = ({ data }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">
                {entry?.dataKey === 'current' ? 'Current:' : 'Previous:'}
              </span>
              <span className="font-medium text-foreground">
                {formatCurrency(entry?.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue Comparison</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-muted-foreground">Current Period</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-muted-foreground">Previous Period</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="current"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              name="Current Period"
            />
            <Bar
              dataKey="previous"
              fill="var(--color-accent)"
              radius={[4, 4, 0, 0]}
              name="Previous Period"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;