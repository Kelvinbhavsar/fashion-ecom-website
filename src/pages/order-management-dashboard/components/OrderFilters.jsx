import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderFilters = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: '',
    location: '',
    priority: 'all'
  });

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: 156 },
    { value: 'pending', label: 'Pending', count: 23 },
    { value: 'confirmed', label: 'Confirmed', count: 45 },
    { value: 'processing', label: 'Processing', count: 32 },
    { value: 'shipped', label: 'Shipped', count: 28 },
    { value: 'delivered', label: 'Delivered', count: 24 },
    { value: 'cancelled', label: 'Cancelled', count: 4 }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      status: 'all',
      dateRange: 'all',
      minAmount: '',
      maxAmount: '',
      location: '',
      priority: 'all'
    };
    setFilters(clearedFilters);
    if (onFilterChange) {
      onFilterChange(clearedFilters);
    }
  };

  const getActiveFilterCount = () => {
    return Object.entries(filters)?.filter(([key, value]) => {
      if (key === 'search' || key === 'minAmount' || key === 'maxAmount' || key === 'location') {
        return value !== '';
      }
      return value !== 'all';
    })?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-card-foreground">Order Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
            >
              <Icon name="X" size={16} className="mr-1" />
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="text"
            placeholder="Search by customer name, phone, or order ID..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {statusOptions?.map((status) => (
            <button
              key={status?.value}
              onClick={() => handleFilterChange('status', status?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth border ${
                filters?.status === status?.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-surface text-foreground border-border hover:bg-muted'
              }`}
            >
              <span>{status?.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                filters?.status === status?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {status?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4 border-t border-border">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Date Range</label>
            <div className="flex flex-wrap gap-2">
              {dateRangeOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('dateRange', option?.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth border ${
                    filters?.dateRange === option?.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-surface text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Minimum Amount (₹)"
              placeholder="0"
              value={filters?.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
            />
            <Input
              type="number"
              label="Maximum Amount (₹)"
              placeholder="No limit"
              value={filters?.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
            />
          </div>

          {/* Location & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Customer Location"
              placeholder="City, State, or PIN code"
              value={filters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
            />
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Priority Level</label>
              <div className="flex flex-wrap gap-2">
                {priorityOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleFilterChange('priority', option?.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth border ${
                      filters?.priority === option?.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-surface text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {option?.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;