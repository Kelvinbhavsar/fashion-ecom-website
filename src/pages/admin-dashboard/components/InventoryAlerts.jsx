import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryAlerts = () => {
  const navigate = useNavigate();
  const [alerts] = useState([
    {
      id: 1,
      product: 'Krishna Divine Bag - Blue',
      sku: 'KDB-001',
      currentStock: 3,
      minStock: 10,
      category: 'bags',
      priority: 'high',
      lastRestocked: new Date('2025-01-10')
    },
    {
      id: 2,
      product: 'Sacred White Cloth - Medium',
      sku: 'SWC-002',
      currentStock: 7,
      minStock: 15,
      category: 'clothes',
      priority: 'medium',
      lastRestocked: new Date('2025-01-12')
    },
    {
      id: 3,
      product: 'Spiritual Hair Scrunchie Set',
      sku: 'SHS-003',
      currentStock: 1,
      minStock: 20,
      category: 'scrunchies',
      priority: 'critical',
      lastRestocked: new Date('2025-01-08')
    },
    {
      id: 4,
      product: 'Golden Krishna Jewelry',
      sku: 'GKJ-004',
      currentStock: 5,
      minStock: 8,
      category: 'jewelry',
      priority: 'medium',
      lastRestocked: new Date('2025-01-14')
    }
  ]);

  const getPriorityConfig = (priority) => {
    const configs = {
      critical: {
        color: 'text-error',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        icon: 'AlertTriangle'
      },
      high: {
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        icon: 'AlertCircle'
      },
      medium: {
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/20',
        icon: 'Info'
      }
    };
    return configs?.[priority] || configs?.medium;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      bags: 'ShoppingBag',
      clothes: 'Shirt',
      scrunchies: 'Circle',
      jewelry: 'Gem'
    };
    return icons?.[category] || 'Package';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short'
    })?.format(date);
  };

  const handleRestockProduct = (productId) => {
    navigate(`/admin-product-management?action=restock&product=${productId}`);
  };

  const handleViewInventory = () => {
    navigate('/admin-product-management?tab=inventory');
  };

  const sortedAlerts = alerts?.sort((a, b) => {
    const priorityOrder = { critical: 3, high: 2, medium: 1 };
    return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Inventory Alerts</h3>
          <p className="text-sm text-muted-foreground">Low stock notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <span className="text-xs text-muted-foreground">
              {alerts?.filter(a => a?.priority === 'critical')?.length} Critical
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleViewInventory}>
            <Icon name="Package" size={14} className="mr-2" />
            View All
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {sortedAlerts?.map((alert) => {
          const priorityConfig = getPriorityConfig(alert?.priority);
          
          return (
            <div 
              key={alert?.id} 
              className={`p-4 rounded-lg border transition-smooth hover:shadow-soft ${priorityConfig?.bgColor} ${priorityConfig?.borderColor}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${priorityConfig?.bgColor} ${priorityConfig?.borderColor} border`}>
                      <Icon name={getCategoryIcon(alert?.category)} size={16} className={priorityConfig?.color} />
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${priorityConfig?.bgColor}`}>
                      <Icon name={priorityConfig?.icon} size={12} className={priorityConfig?.color} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-card-foreground truncate">
                      {alert?.product}
                    </h4>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span className="font-mono">SKU: {alert?.sku}</span>
                      <span>•</span>
                      <span>Last restocked: {formatDate(alert?.lastRestocked)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Stock:</span>
                        <span className={`text-xs font-bold font-mono ${priorityConfig?.color}`}>
                          {alert?.currentStock}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          / {alert?.minStock} min
                        </span>
                      </div>
                      
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            alert?.currentStock <= alert?.minStock * 0.3 
                              ? 'bg-error' 
                              : alert?.currentStock <= alert?.minStock * 0.6 
                                ? 'bg-warning' :'bg-success'
                          }`}
                          style={{ 
                            width: `${Math.min((alert?.currentStock / alert?.minStock) * 100, 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestockProduct(alert?.id)}
                  className="ml-3 flex-shrink-0"
                >
                  <Icon name="Plus" size={14} className="mr-1" />
                  Restock
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              {alerts?.length} products need attention
            </span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-error" />
                <span className="text-xs text-muted-foreground">Critical</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-xs text-muted-foreground">High</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleViewInventory}>
            Manage Inventory
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryAlerts;