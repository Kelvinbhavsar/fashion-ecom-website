import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const OrderStatusIndicator = ({ 
  status = 'pending', 
  orderId, 
  onStatusChange, 
  isEditable = false,
  showProgress = true,
  size = 'default' 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const statusConfig = {
    pending: {
      label: 'Pending',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      description: 'Order received, awaiting processing'
    },
    confirmed: {
      label: 'Confirmed',
      icon: 'CheckCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      description: 'Order confirmed and being prepared'
    },
    processing: {
      label: 'Processing',
      icon: 'Package',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      description: 'Items being prepared for dispatch'
    },
    shipped: {
      label: 'Shipped',
      icon: 'Truck',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      description: 'Order dispatched and in transit'
    },
    delivered: {
      label: 'Delivered',
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      description: 'Order successfully delivered'
    },
    cancelled: {
      label: 'Cancelled',
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      description: 'Order has been cancelled'
    },
    refunded: {
      label: 'Refunded',
      icon: 'RotateCcw',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-muted-foreground/20',
      description: 'Order refunded successfully'
    }
  };

  const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
  const currentConfig = statusConfig?.[status] || statusConfig?.pending;

  const handleStatusUpdate = (newStatus) => {
    setSelectedStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(orderId, newStatus);
    }
    setIsEditing(false);
  };

  const getProgressPercentage = () => {
    if (status === 'cancelled' || status === 'refunded') return 0;
    const currentIndex = statusOrder?.indexOf(status);
    return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder?.length) * 100 : 0;
  };

  const isStatusCompleted = (checkStatus) => {
    const currentIndex = statusOrder?.indexOf(status);
    const checkIndex = statusOrder?.indexOf(checkStatus);
    return currentIndex >= checkIndex;
  };

  if (size === 'compact') {
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${currentConfig?.bgColor?.replace('/10', '')}`} />
        <span className={`text-xs font-medium ${currentConfig?.color}`}>
          {currentConfig?.label}
        </span>
      </div>
    );
  }

  if (size === 'icon') {
    return (
      <div 
        className={`w-8 h-8 rounded-full ${currentConfig?.bgColor} ${currentConfig?.borderColor} border flex items-center justify-center`}
        title={`${currentConfig?.label}: ${currentConfig?.description}`}
      >
        <Icon name={currentConfig?.icon} size={16} className={currentConfig?.color} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full ${currentConfig?.bgColor} ${currentConfig?.borderColor} border flex items-center justify-center`}>
            <Icon name={currentConfig?.icon} size={20} className={currentConfig?.color} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-semibold ${currentConfig?.color}`}>
                {currentConfig?.label}
              </span>
              {isEditable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="h-6 px-2"
                >
                  <Icon name="Edit2" size={12} />
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentConfig?.description}
            </p>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      {showProgress && status !== 'cancelled' && status !== 'refunded' && (
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${currentConfig?.bgColor?.replace('/10', '')}`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-between">
            {statusOrder?.map((stepStatus) => {
              const stepConfig = statusConfig?.[stepStatus];
              const isCompleted = isStatusCompleted(stepStatus);
              const isCurrent = stepStatus === status;
              
              return (
                <div key={stepStatus} className="flex flex-col items-center space-y-1">
                  <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    isCompleted 
                      ? `${stepConfig?.bgColor?.replace('/10', '')} ${stepConfig?.borderColor?.replace('/20', '')}`
                      : 'bg-muted border-muted-foreground/20'
                  }`} />
                  <span className={`text-xs font-medium ${
                    isCurrent ? stepConfig?.color : 'text-muted-foreground'
                  }`}>
                    {stepConfig?.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Status Editor */}
      {isEditing && isEditable && (
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm font-medium text-foreground mb-2">Update Status:</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(statusConfig)?.map(([statusKey, config]) => (
              <Button
                key={statusKey}
                variant={statusKey === selectedStatus ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusUpdate(statusKey)}
                className="justify-start"
              >
                <Icon name={config?.icon} size={14} className="mr-2" />
                {config?.label}
              </Button>
            ))}
          </div>
          <div className="flex space-x-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatusIndicator;