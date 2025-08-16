import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesChart = () => {
  const [chartType, setChartType] = useState('bar');
  const [dateRange, setDateRange] = useState('7days');

  const salesData = [
    { name: 'Mon', bags: 12, clothes: 8, scrunchies: 15, jewelry: 5 },
    { name: 'Tue', bags: 19, clothes: 12, scrunchies: 10, jewelry: 8 },
    { name: 'Wed', bags: 15, clothes: 18, scrunchies: 12, jewelry: 6 },
    { name: 'Thu', bags: 22, clothes: 14, scrunchies: 8, jewelry: 10 },
    { name: 'Fri', bags: 28, clothes: 20, scrunchies: 18, jewelry: 12 },
    { name: 'Sat', bags: 35, clothes: 25, scrunchies: 22, jewelry: 15 },
    { name: 'Sun', bags: 30, clothes: 22, scrunchies: 20, jewelry: 14 }
  ];

  const categoryData = [
    { name: 'Divine Bags', value: 161, color: '#1E40AF' },
    { name: 'Sacred Clothes', value: 119, color: '#F59E0B' },
    { name: 'Hair Accessories', value: 105, color: '#7C3AED' },
    { name: 'Spiritual Jewelry', value: 70, color: '#10B981' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value * 299); // Assuming average price
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground capitalize">{entry?.dataKey}:</span>
              <span className="font-medium text-popover-foreground">{entry?.value} units</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground">{data?.name}</p>
          <p className="text-xs text-muted-foreground">
            {data?.value} units ({((data?.value / categoryData?.reduce((sum, item) => sum + item?.value, 0)) * 100)?.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Sales Performance</h3>
          <p className="text-sm text-muted-foreground">Product category sales trends</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={dateRange === '7days' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDateRange('7days')}
              className="h-8 px-3 text-xs"
            >
              7 Days
            </Button>
            <Button
              variant={dateRange === '30days' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDateRange('30days')}
              className="h-8 px-3 text-xs"
            >
              30 Days
            </Button>
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('bar')}
              className="h-8 px-2"
            >
              <Icon name="BarChart3" size={14} />
            </Button>
            <Button
              variant={chartType === 'pie' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('pie')}
              className="h-8 px-2"
            >
              <Icon name="PieChart" size={14} />
            </Button>
          </div>
        </div>
      </div>
      <div className="h-80">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="bags" fill="#1E40AF" radius={[2, 2, 0, 0]} />
              <Bar dataKey="clothes" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="scrunchies" fill="#7C3AED" radius={[2, 2, 0, 0]} />
              <Bar dataKey="jewelry" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryData?.map((category, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: category?.color }}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-card-foreground truncate">
                  {category?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {category?.value} units
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;