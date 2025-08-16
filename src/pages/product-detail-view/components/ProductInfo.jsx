import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ 
  product = {},
  onAddToCart,
  onBuyNow,
  isLoading = false 
}) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);

  const defaultProduct = {
    name: "Divine Krishna Bag Collection",
    price: 1299,
    originalPrice: 1899,
    rating: 4.8,
    reviewCount: 156,
    availability: "in_stock",
    description: `Exquisite handcrafted bag designed specifically for Krishna devotees. Made with premium materials and adorned with traditional motifs that reflect the divine essence of Lord Krishna.\n\nPerfect for carrying your spiritual essentials, prayer items, and daily necessities while maintaining a connection to your faith.`,
    specifications: [
      { label: "Material", value: "Premium Cotton Canvas" },
      { label: "Dimensions", value: "12\" x 10\" x 4\"" },
      { label: "Weight", value: "350 grams" },
      { label: "Care", value: "Hand wash with mild detergent" },
      { label: "Origin", value: "Handcrafted in India" }
    ],
    variants: [
      {
        type: "color",
        label: "Color",
        options: [
          { id: "saffron", label: "Saffron", color: "#FF9933", available: true },
          { id: "blue", label: "Krishna Blue", color: "#1E40AF", available: true },
          { id: "white", label: "Pure White", color: "#FFFFFF", available: false }
        ]
      },
      {
        type: "size",
        label: "Size",
        options: [
          { id: "small", label: "Small", available: true },
          { id: "medium", label: "Medium", available: true },
          { id: "large", label: "Large", available: true }
        ]
      }
    ],
    features: [
      "Authentic Krishna motifs",
      "Durable construction",
      "Multiple compartments",
      "Adjustable straps",
      "Blessed by temple priests"
    ]
  };

  const productData = { ...defaultProduct, ...product };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const getAvailabilityStatus = () => {
    switch (productData?.availability) {
      case 'in_stock':
        return { label: 'In Stock', color: 'text-success', icon: 'CheckCircle' };
      case 'low_stock':
        return { label: 'Low Stock', color: 'text-warning', icon: 'AlertTriangle' };
      case 'out_of_stock':
        return { label: 'Out of Stock', color: 'text-error', icon: 'XCircle' };
      default:
        return { label: 'Available', color: 'text-success', icon: 'CheckCircle' };
    }
  };

  const handleVariantChange = (variantType, optionId) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: optionId
    }));
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
      variants: selectedVariants,
      image: productData?.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
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

  const availabilityStatus = getAvailabilityStatus();
  const discount = productData?.originalPrice ? 
    Math.round(((productData?.originalPrice - productData?.price) / productData?.originalPrice) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {productData?.name}
        </h1>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                className={i < Math.floor(productData?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
              />
            ))}
            <span className="text-sm font-medium text-foreground ml-1">
              {productData?.rating}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({productData?.reviewCount} reviews)
          </span>
        </div>
      </div>
      {/* Price & Availability */}
      <div className="space-y-3">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(productData?.price)}
          </span>
          {productData?.originalPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(productData?.originalPrice)}
              </span>
              <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                {discount}% OFF
              </span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name={availabilityStatus?.icon} size={16} className={availabilityStatus?.color} />
          <span className={`text-sm font-medium ${availabilityStatus?.color}`}>
            {availabilityStatus?.label}
          </span>
        </div>
      </div>
      {/* Product Description */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
        <div className="text-muted-foreground space-y-2">
          {productData?.description?.split('\n')?.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      {/* Variants Selection */}
      {productData?.variants?.map((variant) => (
        <div key={variant?.type}>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {variant?.label}
          </h3>
          
          {variant?.type === 'color' ? (
            <div className="flex space-x-2">
              {variant?.options?.map((option) => (
                <button
                  key={option?.id}
                  onClick={() => handleVariantChange(variant?.type, option?.id)}
                  disabled={!option?.available}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedVariants?.[variant?.type] === option?.id
                      ? 'border-primary shadow-soft scale-110'
                      : 'border-border hover:border-muted-foreground/50'
                  } ${!option?.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{ backgroundColor: option?.color }}
                  title={option?.label}
                >
                  {!option?.available && (
                    <Icon name="X" size={16} className="text-foreground mx-auto" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {variant?.options?.map((option) => (
                <button
                  key={option?.id}
                  onClick={() => handleVariantChange(variant?.type, option?.id)}
                  disabled={!option?.available}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedVariants?.[variant?.type] === option?.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:border-muted-foreground/50'
                  } ${!option?.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-r-none"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="px-4 py-2 text-sm font-medium text-foreground min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="w-10 h-10 rounded-l-none"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">
            Maximum 10 items per order
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          onClick={handleAddToCart}
          disabled={productData?.availability === 'out_of_stock' || isLoading}
          loading={isLoading}
          iconName="ShoppingBag"
          iconPosition="left"
          className="w-full"
        >
          Add to Cart
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleBuyNow}
          disabled={productData?.availability === 'out_of_stock' || isLoading}
          iconName="Zap"
          iconPosition="left"
          className="w-full"
        >
          Buy Now
        </Button>
      </div>
      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
        <ul className="space-y-2">
          {productData?.features?.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Specifications</h3>
        <div className="space-y-2">
          {productData?.specifications?.map((spec, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-border last:border-b-0">
              <span className="text-sm text-muted-foreground">{spec?.label}</span>
              <span className="text-sm font-medium text-foreground">{spec?.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;