import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'add-product',
      title: 'Add New Product',
      description: 'Create a new divine product',
      icon: 'Plus',
      color: 'primary',
      onClick: () => navigate('/admin-product-management?action=add')
    },
    {
      id: 'manage-inventory',
      title: 'Manage Inventory',
      description: 'Update stock levels',
      icon: 'Package',
      color: 'secondary',
      onClick: () => navigate('/admin-product-management?tab=inventory')
    },
    {
      id: 'pending-orders',
      title: 'Pending Orders',
      description: 'Process customer orders',
      icon: 'Clock',
      color: 'warning',
      onClick: () => navigate('/order-management-dashboard?status=pending')
    },
    {
      id: 'customer-support',
      title: 'Customer Support',
      description: 'Handle inquiries',
      icon: 'MessageCircle',
      color: 'accent',
      onClick: () => window.open('https://wa.me/919876543210', '_blank')
    }
  ];

  const getColorClasses = (colorName) => {
    const colors = {
      primary: 'text-primary bg-primary/10 border-primary/20 hover:bg-primary/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20 hover:bg-secondary/20',
      warning: 'text-warning bg-warning/10 border-warning/20 hover:bg-warning/20',
      accent: 'text-accent bg-accent/10 border-accent/20 hover:bg-accent/20',
      success: 'text-success bg-success/10 border-success/20 hover:bg-success/20'
    };
    return colors?.[colorName] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Frequently used management tasks</p>
        </div>
        <Icon name="Zap" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.onClick}
            className={`p-4 rounded-lg border transition-smooth text-left group ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(action?.color)?.replace('hover:bg-', 'group-hover:bg-')}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-card-foreground group-hover:text-foreground transition-smooth">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {action?.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-foreground transition-smooth opacity-0 group-hover:opacity-100" 
              />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Need help? Check our admin guide
          </div>
          <Button variant="outline" size="sm">
            <Icon name="HelpCircle" size={14} className="mr-2" />
            Help Center
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;