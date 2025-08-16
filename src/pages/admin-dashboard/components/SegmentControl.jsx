import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SegmentControl = () => {
  const [segments, setSegments] = useState([
    {
      id: 'bags',
      name: 'Divine Bags',
      icon: 'ShoppingBag',
      enabled: true,
      products: 45,
      revenue: 125000
    },
    {
      id: 'clothes',
      name: 'Sacred Clothes',
      icon: 'Shirt',
      enabled: true,
      products: 78,
      revenue: 245000
    },
    {
      id: 'scrunchies',
      name: 'Hair Accessories',
      icon: 'Circle',
      enabled: false,
      products: 33,
      revenue: 85000
    },
    {
      id: 'jewelry',
      name: 'Spiritual Jewelry',
      icon: 'Gem',
      enabled: true,
      products: 24,
      revenue: 180000
    }
  ]);

  const toggleSegment = (segmentId) => {
    setSegments(prev => prev?.map(segment => 
      segment?.id === segmentId 
        ? { ...segment, enabled: !segment?.enabled }
        : segment
    ));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Category Control</h3>
          <p className="text-sm text-muted-foreground">Enable or disable product categories</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-4">
        {segments?.map((segment) => (
          <div key={segment?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                segment?.enabled 
                  ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground border border-border'
              }`}>
                <Icon name={segment?.icon} size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-card-foreground">{segment?.name}</h4>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{segment?.products} products</span>
                  <span>•</span>
                  <span>{formatCurrency(segment?.revenue)} revenue</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                segment?.enabled 
                  ? 'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {segment?.enabled ? 'Active' : 'Disabled'}
              </div>
              
              <button
                onClick={() => toggleSegment(segment?.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  segment?.enabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    segment?.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {segments?.filter(s => s?.enabled)?.length} of {segments?.length} categories active
          </div>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Refresh Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SegmentControl;