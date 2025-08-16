import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionBar = ({ 
  selectedCount, 
  onBulkAction, 
  onClearSelection 
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'activate', label: 'Activate Products' },
    { value: 'deactivate', label: 'Deactivate Products' },
    { value: 'mark_out_of_stock', label: 'Mark Out of Stock' },
    { value: 'update_category', label: 'Update Category' },
    { value: 'update_price', label: 'Update Prices' },
    { value: 'duplicate', label: 'Duplicate Products' },
    { value: 'export', label: 'Export Selected' },
    { value: 'delete', label: 'Delete Products' }
  ];

  const handleBulkAction = async () => {
    if (!selectedAction || selectedCount === 0) return;

    setIsProcessing(true);
    
    try {
      await onBulkAction(selectedAction);
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'activate': return 'CheckCircle';
      case 'deactivate': return 'XCircle';
      case 'mark_out_of_stock': return 'AlertTriangle';
      case 'update_category': return 'Tag';
      case 'update_price': return 'DollarSign';
      case 'duplicate': return 'Copy';
      case 'export': return 'Download';
      case 'delete': return 'Trash2';
      default: return 'Settings';
    }
  };

  const getActionVariant = (action) => {
    if (action === 'delete') return 'destructive';
    if (action === 'activate') return 'success';
    if (action === 'deactivate' || action === 'mark_out_of_stock') return 'warning';
    return 'default';
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-1000">
      <div className="bg-popover border border-border rounded-lg shadow-modal backdrop-blur-glass p-4">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">
                {selectedCount}
              </span>
            </div>
            <span className="text-sm font-medium text-popover-foreground">
              {selectedCount} {selectedCount === 1 ? 'product' : 'products'} selected
            </span>
          </div>

          {/* Action Selector */}
          <div className="flex items-center space-x-2">
            <Select
              placeholder="Choose action"
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              className="min-w-48"
            />

            <Button
              variant={selectedAction ? getActionVariant(selectedAction) : 'default'}
              size="sm"
              onClick={handleBulkAction}
              disabled={!selectedAction || isProcessing}
              loading={isProcessing}
              iconName={selectedAction ? getActionIcon(selectedAction) : 'Play'}
              iconPosition="left"
            >
              Apply
            </Button>
          </div>

          {/* Clear Selection */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Quick Actions:</span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedAction('activate');
              handleBulkAction();
            }}
            disabled={isProcessing}
          >
            <Icon name="CheckCircle" size={14} className="mr-1 text-success" />
            Activate
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedAction('deactivate');
              handleBulkAction();
            }}
            disabled={isProcessing}
          >
            <Icon name="XCircle" size={14} className="mr-1 text-warning" />
            Deactivate
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedAction('duplicate');
              handleBulkAction();
            }}
            disabled={isProcessing}
          >
            <Icon name="Copy" size={14} className="mr-1" />
            Duplicate
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedAction('export');
              handleBulkAction();
            }}
            disabled={isProcessing}
          >
            <Icon name="Download" size={14} className="mr-1" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;