import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyAddToCart = ({ 
  product = {},
  onAddToCart,
  onBuyNow,
  isLoading = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const defaultProduct = {
    name: "Divine Krishna Bag Collection",
    price: 1299,
    originalPrice: 1899,
    availability: "in_stock",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop"
  };

  const productData = { ...defaultProduct, ...product };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement?.scrollHeight;
      
      // Show sticky cart when user scrolls past the main product info
      // and hide when near the bottom to avoid overlapping with footer
      const showThreshold = windowHeight * 0.8;
      const hideThreshold = documentHeight - windowHeight - 200;
      
      setIsVisible(scrollPosition > showThreshold && scrollPosition < hideThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + change)));
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: productData?.id || 'divine-bag-001',
      name: productData?.name,
      price: productData?.price,
      quantity,
      image: productData?.image
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (onBuyNow) {
      onBuyNow();
    }
  };

  const isOutOfStock = productData?.availability === 'out_of_stock';

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-1000 bg-background/95 backdrop-blur-glass border-t border-border shadow-modal lg:hidden">
      <div className="px-4 py-3">
        <div className="flex items-center space-x-3">
          {/* Product Image & Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface flex-shrink-0">
              <img
                src={productData?.image}
                alt={productData?.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">
                {productData?.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(productData?.price)}
                </span>
                {productData?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(productData?.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center border border-border rounded-lg bg-surface">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || isOutOfStock}
              className="w-8 h-8 rounded-r-none"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className="px-2 py-1 text-sm font-medium text-foreground min-w-[2rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10 || isOutOfStock}
              className="w-8 h-8 rounded-l-none"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isLoading}
              loading={isLoading}
              iconName="ShoppingBag"
              className="px-3"
            >
              Add
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleBuyNow}
              disabled={isOutOfStock || isLoading}
              iconName="Zap"
              className="px-3"
            >
              Buy
            </Button>
          </div>
        </div>

        {/* Out of Stock Message */}
        {isOutOfStock && (
          <div className="mt-2 text-center">
            <span className="text-xs text-error font-medium">
              Currently out of stock
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyAddToCart;