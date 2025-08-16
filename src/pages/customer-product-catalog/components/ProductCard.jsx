import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onQuickAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleProductClick = () => {
    navigate('/product-detail-view', { state: { product } });
  };

  const handleQuickAdd = async (e) => {
    e?.stopPropagation();
    setIsLoading(true);
    
    try {
      await onQuickAdd(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDiscountPercentage = () => {
    if (product?.originalPrice && product?.price < product?.originalPrice) {
      return Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100);
    }
    return 0;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div 
      className="group bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-modal transition-all duration-300 cursor-pointer"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Package" size={32} className="text-muted-foreground" />
          </div>
        )}
        
        <Image
          src={product?.image}
          alt={product?.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          {!product?.inStock && (
            <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-glass shadow-soft"
            onClick={(e) => {
              e?.stopPropagation();
              // Add to wishlist functionality
            }}
          >
            <Icon name="Heart" size={16} />
          </Button>
        </div>

        {/* Quick Add Button */}
        {product?.inStock && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="default"
              size="sm"
              loading={isLoading}
              onClick={handleQuickAdd}
              className="shadow-soft"
            >
              <Icon name="Plus" size={14} className="mr-1" />
              Add
            </Button>
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="p-3 space-y-2">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {product?.category}
          </span>
          {product?.rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-xs text-muted-foreground font-mono">
                {product?.rating}
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-card-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {product?.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-primary font-mono">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-sm text-muted-foreground line-through font-mono">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
        </div>

        {/* Product Description */}
        {product?.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product?.description}
          </p>
        )}

        {/* Stock Status */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              product?.inStock ? 'bg-success' : 'bg-error'
            }`} />
            <span className="text-xs text-muted-foreground">
              {product?.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          {product?.inStock && product?.stockCount && product?.stockCount < 10 && (
            <span className="text-xs text-warning font-medium">
              Only {product?.stockCount} left
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;