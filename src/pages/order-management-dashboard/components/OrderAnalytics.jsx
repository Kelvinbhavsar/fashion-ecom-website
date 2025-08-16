import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderAnalytics = ({ orders }) => {
  const [activeTab, setActiveTab] = useState('revenue');
  const [timeRange, setTimeRange] = useState('week');

  // Mock analytics data
  const revenueData = [
    { name: 'Mon', amount: 12500, orders: 15 },
    { name: 'Tue', amount: 18200, orders: 22 },
    { name: 'Wed', amount: 15800, orders: 19 },
    { name: 'Thu', amount: 22100, orders: 28 },
    { name: 'Fri', amount: 19600, orders: 24 },
    { name: 'Sat', amount: 25400, orders: 32 },
    { name: 'Sun', amount: 21300, orders: 26 }
  ];

  const categoryData = [
    { name: 'Divine Bags', value: 45, color: '#1E40AF' },
    { name: 'Sacred Clothes', value: 78, color: '#F59E0B' },
    { name: 'Hair Accessories', value: 33, color: '#7C3AED' },
    { name: 'Spiritual Jewelry', value: 24, color: '#10B981' },
    { name: 'Holy Books', value: 18, color: '#EF4444' }
  ];

  const statusData = [
    { name: 'Pending', value: 23, color: '#F59E0B' },
    { name: 'Confirmed', value: 45, color: '#1E40AF' },
    { name: 'Processing', value: 32, color: '#7C3AED' },
    { name: 'Shipped', value: 28, color: '#10B981' },
    { name: 'Delivered', value: 24, color: '#059669' },
    { name: 'Cancelled', value: 4, color: '#EF4444' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const totalRevenue = revenueData?.reduce((sum, item) => sum + item?.amount, 0);
  const totalOrders = revenueData?.reduce((sum, item) => sum + item?.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  const tabs = [
    { id: 'revenue', label: 'Revenue Trends', icon: 'TrendingUp' },
    { id: 'categories', label: 'Category Breakdown', icon: 'PieChart' },
    { id: 'status', label: 'Order Status', icon: 'BarChart3' }
  ];

  const timeRanges = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={24} className="text-primary" />
            <div>
              <h3 className="text-xl font-semibold text-card-foreground">Order Analytics</h3>
              <p className="text-sm text-muted-foreground">Business insights and performance metrics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {timeRanges?.map((range) => (
              <Button
                key={range?.id}
                variant={timeRange === range?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range?.id)}
              >
                {range?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary font-mono">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={14} className="text-success mr-1" />
              <span className="text-xs text-success font-medium">+12.5%</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary font-mono">{totalOrders}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={14} className="text-success mr-1" />
              <span className="text-xs text-success font-medium">+8.3%</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent font-mono">
              {formatPrice(avgOrderValue)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Order Value</div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={14} className="text-success mr-1" />
              <span className="text-xs text-success font-medium">+5.7%</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success font-mono">94.2%</div>
            <div className="text-sm text-muted-foreground">Fulfillment Rate</div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={14} className="text-success mr-1" />
              <span className="text-xs text-success font-medium">+2.1%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="px-6 pt-6">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth flex-1 justify-center ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Chart Content */}
      <div className="p-6">
        {activeTab === 'revenue' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-card-foreground">Revenue & Order Trends</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-popover)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      color: 'var(--color-popover-foreground)'
                    }}
                    formatter={(value, name) => [
                      name === 'amount' ? formatPrice(value) : value,
                      name === 'amount' ? 'Revenue' : 'Orders'
                    ]}
                  />
                  <Bar dataKey="amount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-card-foreground">Sales by Category</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        color: 'var(--color-popover-foreground)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {categoryData?.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category?.color }}
                      />
                      <span className="font-medium text-card-foreground">{category?.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-card-foreground">{category?.value}</div>
                      <div className="text-xs text-muted-foreground">
                        {((category?.value / categoryData?.reduce((sum, item) => sum + item?.value, 0)) * 100)?.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-card-foreground">Order Status Distribution</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statusData?.map((status, index) => (
                <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: `${status?.color}20` }}>
                    <span className="text-xl font-bold" style={{ color: status?.color }}>
                      {status?.value}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-card-foreground">{status?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {((status?.value / statusData?.reduce((sum, item) => sum + item?.value, 0)) * 100)?.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderAnalytics;