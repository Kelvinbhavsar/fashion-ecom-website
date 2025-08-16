import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const CartBadge = ({ className = '' }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [recentItems, setRecentItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartData = () => {
      const savedCart = localStorage.getItem('krishna-cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart?.reduce((total, item) => total + item?.quantity, 0);
        const totalPrice = cart?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
        
        if (totalItems !== cartCount) {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 300);
        }
        
        setCartCount(totalItems);
        setCartTotal(totalPrice);
        setRecentItems(cart?.slice(-3));
      } else {
        setCartCount(0);
        setCartTotal(0);
        setRecentItems([]);
      }
    };

    updateCartData();

    // Listen for cart updates
    const handleStorageChange = (e) => {
      if (e?.key === 'krishna-cart') {
        updateCartData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handleCartUpdate = () => updateCartData();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [cartCount]);

  const handleCartClick = () => {
    navigate('/shopping-cart-checkout');
    setShowQuickView(false);
  };

  const handleQuickViewToggle = (e) => {
    e?.stopPropagation();
    setShowQuickView(!showQuickView);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Cart Button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCartClick}
          className="relative group"
        >
          <Icon 
            name="ShoppingBag" 
            size={20} 
            className="transition-smooth group-hover:scale-110" 
          />
          
          {/* Cart Count Badge */}
          {cartCount > 0 && (
            <span className={`absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center transition-smooth ${
              isAnimating ? 'scale-125' : 'scale-100'
            }`}>
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Button>

        {/* Quick View Toggle */}
        {cartCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleQuickViewToggle}
            className="absolute -bottom-1 -right-1 w-4 h-4 p-0 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-smooth"
          >
            <Icon name={showQuickView ? "ChevronUp" : "ChevronDown"} size={10} />
          </Button>
        )}
      </div>
      {/* Quick View Dropdown */}
      {showQuickView && cartCount > 0 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-1100 backdrop-blur-glass">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-popover-foreground">Shopping Cart</h3>
              <span className="text-xs text-muted-foreground font-mono">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Recent Items */}
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {recentItems?.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Package" size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-popover-foreground truncate">
                      {item?.name || 'Divine Product'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item?.quantity} × {formatPrice(item?.price || 299)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-2 border-t border-border">
              <span className="text-sm font-medium text-popover-foreground">Total:</span>
              <span className="text-sm font-bold text-primary font-mono">
                {formatPrice(cartTotal)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuickView(false)}
                className="flex-1"
              >
                Continue Shopping
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleCartClick}
                className="flex-1"
              >
                View Cart
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop for mobile */}
      {showQuickView && (
        <div 
          className="fixed inset-0 z-1000 bg-transparent"
          onClick={() => setShowQuickView(false)}
        />
      )}
    </div>
  );
};

export default CartBadge;