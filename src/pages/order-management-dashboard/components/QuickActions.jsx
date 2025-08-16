import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction, orderStats }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const quickActionItems = [
    {
      id: 'new-orders',
      title: 'Process New Orders',
      description: 'Review and confirm pending orders',
      icon: 'ShoppingCart',
      color: 'bg-warning/10 text-warning border-warning/20',
      count: orderStats?.pending || 23,
      action: () => onAction('filter', { status: 'pending' })
    },
    {
      id: 'ready-to-ship',
      title: 'Ready to Ship',
      description: 'Orders prepared for dispatch',
      icon: 'Truck',
      color: 'bg-primary/10 text-primary border-primary/20',
      count: orderStats?.processing || 32,
      action: () => onAction('filter', { status: 'processing' })
    },
    {
      id: 'urgent-orders',
      title: 'High Priority Orders',
      description: 'Orders requiring immediate attention',
      icon: 'AlertTriangle',
      color: 'bg-error/10 text-error border-error/20',
      count: orderStats?.urgent || 8,
      action: () => onAction('filter', { priority: 'high' })
    },
    {
      id: 'customer-inquiries',
      title: 'Customer Inquiries',
      description: 'Pending customer communications',
      icon: 'MessageCircle',
      color: 'bg-accent/10 text-accent border-accent/20',
      count: orderStats?.inquiries || 15,
      action: () => onAction('communications')
    }
  ];

  const bulkActions = [
    {
      id: 'export-orders',
      title: 'Export Orders',
      description: 'Download order data for accounting',
      icon: 'Download',
      action: async () => {
        setIsExporting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsExporting(false);
        onAction('export', 'all');
      }
    },
    {
      id: 'send-notifications',
      title: 'Send Notifications',
      description: 'Bulk WhatsApp/Email updates',
      icon: 'Send',
      action: () => setShowNotifications(true)
    },
    {
      id: 'inventory-sync',
      title: 'Sync Inventory',
      description: 'Update product availability',
      icon: 'RefreshCw',
      action: () => onAction('sync-inventory')
    },
    {
      id: 'generate-reports',
      title: 'Generate Reports',
      description: 'Create business analytics reports',
      icon: 'FileText',
      action: () => onAction('generate-reports')
    }
  ];

  const notificationTemplates = [
    {
      id: 'order-confirmed',
      title: 'Order Confirmation',
      description: 'Send confirmation to new orders',
      icon: 'CheckCircle'
    },
    {
      id: 'shipping-update',
      title: 'Shipping Updates',
      description: 'Notify customers about dispatch',
      icon: 'Truck'
    },
    {
      id: 'delivery-reminder',
      title: 'Delivery Reminder',
      description: 'Remind about pending deliveries',
      icon: 'Clock'
    },
    {
      id: 'feedback-request',
      title: 'Feedback Request',
      description: 'Request reviews from delivered orders',
      icon: 'Star'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Action Cards */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Zap" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActionItems?.map((item) => (
              <button
                key={item?.id}
                onClick={item?.action}
                className={`p-4 rounded-lg border-2 text-left transition-smooth hover:shadow-soft ${item?.color}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={20} />
                    <div>
                      <h4 className="font-semibold text-sm">{item?.title}</h4>
                      <p className="text-xs opacity-80 mt-1">{item?.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{item?.count}</div>
                    <div className="text-xs opacity-60">items</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Bulk Operations */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Bulk Operations</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {bulkActions?.map((action) => (
              <Button
                key={action?.id}
                variant="outline"
                onClick={action?.action}
                disabled={action?.id === 'export-orders' && isExporting}
                className="h-auto p-4 flex flex-col items-center space-y-2 text-center"
              >
                <Icon 
                  name={action?.icon} 
                  size={24} 
                  className={isExporting && action?.id === 'export-orders' ? 'animate-spin' : ''}
                />
                <div>
                  <div className="font-medium text-sm">{action?.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{action?.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Activity" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            {[
              {
                action: 'New order received',
                details: 'Order #KR2025001 from Priya Sharma',
                time: '2 minutes ago',
                icon: 'ShoppingCart',
                color: 'text-success'
              },
              {
                action: 'Order status updated',
                details: 'Order #KR2025000 marked as shipped',
                time: '15 minutes ago',
                icon: 'Truck',
                color: 'text-primary'
              },
              {
                action: 'Customer inquiry',
                details: 'WhatsApp message from Rajesh Kumar',
                time: '32 minutes ago',
                icon: 'MessageCircle',
                color: 'text-accent'
              },
              {
                action: 'Payment confirmed',
                details: 'Order #KR2024999 payment verified',
                time: '1 hour ago',
                icon: 'CheckCircle',
                color: 'text-success'
              }
            ]?.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-smooth">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity?.color}`}>
                  <Icon name={activity?.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-card-foreground">{activity?.action}</div>
                  <div className="text-xs text-muted-foreground truncate">{activity?.details}</div>
                </div>
                <div className="text-xs text-muted-foreground">{activity?.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Notification Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-1100 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-glass"
            onClick={() => setShowNotifications(false)}
          />
          <div className="relative bg-popover border border-border rounded-lg shadow-modal w-full max-w-md mx-4">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-popover-foreground">Send Notifications</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNotifications(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {notificationTemplates?.map((template) => (
                <button
                  key={template?.id}
                  onClick={() => {
                    onAction('send-notification', template?.id);
                    setShowNotifications(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name={template?.icon} size={20} className="text-primary" />
                  <div>
                    <div className="font-medium text-popover-foreground">{template?.title}</div>
                    <div className="text-sm text-muted-foreground">{template?.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;