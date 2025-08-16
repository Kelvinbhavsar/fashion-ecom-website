import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderConfirmation = ({ orderData, onClose }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Generate order number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    setOrderNumber(`KR${timestamp?.toString()?.slice(-6)}${randomNum?.toString()?.padStart(3, '0')}`);
    
    // Set current time
    const now = new Date();
    setCurrentTime(now?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }));
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <div className="fixed inset-0 z-1100 flex items-center justify-center p-4 bg-background/80 backdrop-blur-glass">
      <div className="bg-card border border-border rounded-lg shadow-modal max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Success Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Order Placed Successfully!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your Krishna accessories order has been submitted
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">Order Number:</span>
              <span className="text-sm font-mono font-bold text-primary">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">Order Time:</span>
              <span className="text-sm text-muted-foreground">{currentTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">Total Amount:</span>
              <span className="text-sm font-bold text-foreground">
                {formatPrice(orderData?.total)}
              </span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Delivery Information</h3>
            <div className="bg-surface rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{orderData?.customerInfo?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{orderData?.customerInfo?.phone}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={14} className="text-muted-foreground mt-0.5" />
                <span className="text-sm text-foreground">
                  {orderData?.customerInfo?.address}, {orderData?.customerInfo?.city} - {orderData?.customerInfo?.pincode}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary">What happens next?</p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• We'll contact you within 2 hours to confirm your order</li>
                  <li>• Payment details will be shared via WhatsApp/Email</li>
                  <li>• Your items will be blessed and carefully packed</li>
                  <li>• Delivery within 3-5 business days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="MessageCircle" size={16} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent">Need Help?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Contact us on WhatsApp: +91 98765 43210\n
                  Email: orders@krishnabagha.com
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              Continue Shopping
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                const orderText = `Order Confirmation\nOrder #: ${orderNumber}\nTime: ${currentTime}\nAmount: ${formatPrice(orderData?.total)}`;
                if (navigator.share) {
                  navigator.share({
                    title: 'Krishna Bagha Order',
                    text: orderText
                  });
                } else {
                  navigator.clipboard?.writeText(orderText);
                }
              }}
              iconName="Share"
              iconPosition="left"
              className="flex-1"
            >
              Share Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;