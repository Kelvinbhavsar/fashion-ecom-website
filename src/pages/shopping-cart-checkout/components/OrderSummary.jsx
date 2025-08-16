import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, deliveryCharge = 0, className = '' }) => {
  const subtotal = cartItems?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  const totalItems = cartItems?.reduce((total, item) => total + item?.quantity, 0);
  const finalTotal = subtotal + deliveryCharge;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 pb-4 border-b border-border">
        <Icon name="ShoppingBag" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Order Summary</h2>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
          <span className="text-sm font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Delivery Charges</span>
            <Icon name="Info" size={14} className="text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
          </span>
        </div>

        {deliveryCharge === 0 && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Gift" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Free delivery on all Krishna accessories!
              </span>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-foreground">Total Amount</span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Estimated Delivery</span>
        </div>
        <p className="text-sm text-muted-foreground">
          3-5 business days for blessed items\n
          1-3 business days for regular accessories
        </p>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Heart" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-accent">Special Care Instructions</p>
            <p className="text-xs text-muted-foreground mt-1">
              All Krishna accessories are handled with devotion and care. Blessed items are wrapped in sacred cloth for protection during transit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;