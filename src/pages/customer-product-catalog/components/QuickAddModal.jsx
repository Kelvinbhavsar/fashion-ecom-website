import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickAddModal = ({ product, isOpen, onClose, onConfirm }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleConfirm = async () => {
    if (product?.variants && product?.variants?.length > 0 && !selectedVariant) {
      return;
    }

    setIsAdding(true);
    try {
      await onConfirm({
        ...selectedVariant,
        quantity
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const variantOptions = product?.variants?.map(variant => ({
    value: variant?.id,
    label: `${variant?.size || ''} ${variant?.color || ''}`?.trim(),
    description: variant?.price ? formatPrice(variant?.price) : null
  })) || [];

  const selectedVariantData = product?.variants?.find(v => v?.id === selectedVariant?.value);
  const finalPrice = selectedVariantData?.price || product?.price;

  return (
    <div className="fixed inset-0 z-1100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-glass"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-popover border border-border rounded-lg shadow-modal max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-popover-foreground">Quick Add to Cart</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Product Info */}
          <div className="flex space-x-3">
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-popover-foreground truncate">
                {product?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {product?.category}
              </p>
              <p className="text-lg font-bold text-primary font-mono">
                {formatPrice(finalPrice)}
              </p>
            </div>
          </div>

          {/* Variants Selection */}
          {product?.variants && product?.variants?.length > 0 && (
            <div>
              <Select
                label="Select Variant"
                placeholder="Choose size, color, etc."
                options={variantOptions}
                value={selectedVariant}
                onChange={setSelectedVariant}
                required
              />
            </div>
          )}

          {/* Quantity Selection */}
          <div>
            <label className="block text-sm font-medium text-popover-foreground mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Icon name="Minus" size={16} />
              </Button>
              <span className="text-lg font-semibold text-popover-foreground font-mono w-8 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum 10 items per order
            </p>
          </div>

          {/* Total Price */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total ({quantity} {quantity === 1 ? 'item' : 'items'}):
              </span>
              <span className="text-lg font-bold text-primary font-mono">
                {formatPrice(finalPrice * quantity)}
              </span>
            </div>
          </div>

          {/* Stock Warning */}
          {product?.stockCount && product?.stockCount < 10 && (
            <div className="flex items-center space-x-2 p-2 bg-warning/10 border border-warning/20 rounded-lg">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-warning">
                Only {product?.stockCount} items left in stock
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            loading={isAdding}
            disabled={product?.variants && product?.variants?.length > 0 && !selectedVariant}
            className="flex-1"
          >
            <Icon name="ShoppingBag" size={16} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;