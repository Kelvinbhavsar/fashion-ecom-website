import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RelatedProducts = ({ currentProductId = "divine-bag-001" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: "divine-bag-002",
      name: "Sacred Krishna Tote Bag",
      price: 999,
      originalPrice: 1499,
      rating: 4.7,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&sat=20",
      category: "Bags",
      isNew: false,
      discount: 33
    },
    {
      id: "divine-cloth-001",
      name: "Krishna Devotee Kurta",
      price: 1599,
      originalPrice: 2299,
      rating: 4.9,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=240",
      category: "Clothes",
      isNew: true,
      discount: 30
    },
    {
      id: "divine-scrunchie-001",
      name: "Spiritual Hair Scrunchie Set",
      price: 299,
      originalPrice: 499,
      rating: 4.6,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=60",
      category: "Scrunchies",
      isNew: false,
      discount: 40
    },
    {
      id: "divine-bag-003",
      name: "Temple Visit Shoulder Bag",
      price: 1199,
      originalPrice: 1699,
      rating: 4.8,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&brightness=-10",
      category: "Bags",
      isNew: false,
      discount: 29
    },
    {
      id: "divine-cloth-002",
      name: "Divine Dupatta Collection",
      price: 899,
      originalPrice: 1299,
      rating: 4.5,
      reviewCount: 78,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=300",
      category: "Clothes",
      isNew: true,
      discount: 31
    },
    {
      id: "divine-bag-004",
      name: "Meditation Carry Bag",
      price: 799,
      originalPrice: 1199,
      rating: 4.4,
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&contrast=20",
      category: "Bags",
      isNew: false,
      discount: 33
    }
  ];

  const itemsPerSlide = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const handleProductClick = (productId) => {
    // In a real app, this would navigate to the product detail page
    // For now, we'll just scroll to top to simulate navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    
    const cartItem = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      quantity: 1,
      image: product?.image
    };

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('krishna-cart') || '[]');
    
    // Check if item already exists
    const existingItemIndex = existingCart?.findIndex(item => item?.id === product?.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart?.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('krishna-cart', JSON.stringify(existingCart));
    
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev >= relatedProducts?.length - itemsPerSlide?.mobile ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev <= 0 ? relatedProducts?.length - itemsPerSlide?.mobile : prev - 1
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Discover more divine accessories for your spiritual journey
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="w-8 h-8"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="w-8 h-8"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      {/* Products Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentSlide * (100 / itemsPerSlide?.mobile)}%)`,
          }}
        >
          {relatedProducts?.map((product) => (
            <div
              key={product?.id}
              className="w-1/2 sm:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
            >
              <div 
                className="bg-surface rounded-lg border border-border overflow-hidden group cursor-pointer transition-smooth hover:shadow-modal hover:border-primary/20"
                onClick={() => handleProductClick(product?.id)}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product?.isNew && (
                      <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                    {product?.discount > 0 && (
                      <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                        {product?.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <Button
                    variant="default"
                    size="icon"
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity shadow-soft"
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {product?.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(product?.rating)}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product?.reviewCount})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {product?.name}
                  </h3>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product?.price)}
                    </span>
                    {product?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product?.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Slide Indicators */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(relatedProducts?.length / itemsPerSlide?.mobile) })?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      {/* View All Button */}
      <div className="text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/customer-product-catalog')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;