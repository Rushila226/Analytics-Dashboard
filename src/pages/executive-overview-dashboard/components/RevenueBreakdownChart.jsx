/*import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const RevenueBreakdownChart = ({ data }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-success)',
    'var(--color-warning)',
    'var(--color-secondary)'
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground mb-1">{data?.payload?.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(data?.value)} ({data?.payload?.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-sm text-muted-foreground">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue by Service Type</h3>
        <div className="text-sm text-muted-foreground">
          Total: {formatCurrency(data?.reduce((sum, item) => sum + item?.value, 0))}
        </div>
      </div>
      <div className="h-80 flex justify-center items-center">
        <div className="w-full max-w-[400px] h-full"></div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueBreakdownChart;
*/
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const RevenueBreakdownChart = ({ data }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-success)',
    'var(--color-warning)',
    'var(--color-secondary)',
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground mb-1">{data.payload.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(data.value)} ({data.payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue by Service Type</h3>
        <div className="text-sm text-muted-foreground">
          Total: {formatCurrency(data?.reduce((sum, item) => sum + item?.value, 0))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {data?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueBreakdownChart;
