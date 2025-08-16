import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  onClearFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const priceRanges = [
    { value: '0-500', label: 'Under ₹500', min: 0, max: 500 },
    { value: '500-1000', label: '₹500 - ₹1,000', min: 500, max: 1000 },
    { value: '1000-2000', label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
    { value: '2000-5000', label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { value: '5000+', label: 'Above ₹5,000', min: 5000, max: Infinity }
  ];

  const availabilityOptions = [
    { value: 'in-stock', label: 'In Stock Only' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'low-stock', label: 'Low Stock (< 10)' }
  ];

  const handleLocalFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      sortBy: 'newest',
      priceRange: [],
      availability: [],
      inStock: false,
      onSale: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = () => {
    return localFilters?.priceRange?.length > 0 || 
           localFilters?.availability?.length > 0 || 
           localFilters?.inStock || 
           localFilters?.onSale ||
           localFilters?.sortBy !== 'newest';
  };

  return (
    <div className="fixed inset-0 z-1100 lg:relative lg:inset-auto">
      {/* Mobile Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-glass lg:hidden"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-popover border-t border-border rounded-t-lg lg:relative lg:bottom-auto lg:border lg:rounded-lg lg:shadow-modal max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-popover-foreground" />
            <h3 className="text-lg font-semibold text-popover-foreground">Filters</h3>
            {hasActiveFilters() && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={18} />
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Sort By */}
          <div>
            <Select
              label="Sort By"
              options={sortOptions}
              value={localFilters?.sortBy}
              onChange={(value) => handleLocalFilterChange('sortBy', value)}
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-popover-foreground mb-3">
              Price Range
            </label>
            <div className="space-y-2">
              {priceRanges?.map((range) => (
                <Checkbox
                  key={range?.value}
                  label={range?.label}
                  checked={localFilters?.priceRange?.includes(range?.value) || false}
                  onChange={(e) => {
                    const currentRanges = localFilters?.priceRange || [];
                    const newRanges = e?.target?.checked
                      ? [...currentRanges, range?.value]
                      : currentRanges?.filter(r => r !== range?.value);
                    handleLocalFilterChange('priceRange', newRanges);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-popover-foreground mb-3">
              Availability
            </label>
            <div className="space-y-2">
              {availabilityOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={localFilters?.availability?.includes(option?.value) || false}
                  onChange={(e) => {
                    const currentAvailability = localFilters?.availability || [];
                    const newAvailability = e?.target?.checked
                      ? [...currentAvailability, option?.value]
                      : currentAvailability?.filter(a => a !== option?.value);
                    handleLocalFilterChange('availability', newAvailability);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <label className="block text-sm font-medium text-popover-foreground mb-3">
              Quick Filters
            </label>
            <div className="space-y-2">
              <Checkbox
                label="In Stock Only"
                checked={localFilters?.inStock || false}
                onChange={(e) => handleLocalFilterChange('inStock', e?.target?.checked)}
              />
              <Checkbox
                label="On Sale"
                checked={localFilters?.onSale || false}
                onChange={(e) => handleLocalFilterChange('onSale', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-4 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleApplyFilters}
            className="flex-1"
          >
            <Icon name="Check" size={16} className="mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;