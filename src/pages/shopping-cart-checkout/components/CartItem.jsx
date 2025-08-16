import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, isMobile = false }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    await onUpdateQuantity(item?.id, newQuantity);
    setTimeout(() => setIsUpdating(false), 200);
  };

  const handleRemove = () => {
    onRemove(item?.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  if (isMobile) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex space-x-3">
          <div className="w-16 h-16 bg-surface rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item?.image || `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop`}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-card-foreground truncate">
              {item?.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {item?.category} • {item?.size || 'Standard'}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-bold text-primary">
                {formatPrice(item?.price)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-error hover:text-error hover:bg-error/10"
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item?.quantity - 1)}
              disabled={item?.quantity <= 1 || isUpdating}
              className="w-8 h-8 p-0"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className={`text-sm font-medium min-w-[2rem] text-center ${isUpdating ? 'opacity-50' : ''}`}>
              {item?.quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item?.quantity + 1)}
              disabled={isUpdating}
              className="w-8 h-8 p-0"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Subtotal</p>
            <p className="text-sm font-bold text-foreground">
              {formatPrice(item?.price * item?.quantity)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-surface rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item?.image || `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop`}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-card-foreground">
            {item?.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {item?.category} • {item?.size || 'Standard'} • SKU: {item?.sku || `KR${item?.id}`}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
              In Stock
            </span>
            {item?.isBlessed && (
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                Blessed Item
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Unit Price</p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(item?.price)}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item?.quantity - 1)}
              disabled={item?.quantity <= 1 || isUpdating}
              className="w-8 h-8 p-0"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className={`text-sm font-medium min-w-[3rem] text-center px-2 py-1 border border-border rounded ${isUpdating ? 'opacity-50' : ''}`}>
              {item?.quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item?.quantity + 1)}
              disabled={isUpdating}
              className="w-8 h-8 p-0"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>
          
          <div className="text-right min-w-[6rem]">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="text-lg font-bold text-foreground">
              {formatPrice(item?.price * item?.quantity)}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-error hover:text-error hover:bg-error/10"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;