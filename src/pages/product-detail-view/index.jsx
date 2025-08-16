import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomerHeader from '../../components/ui/CustomerHeader';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import CustomerReviews from './components/CustomerReviews';
import SocialShare from './components/SocialShare';
import StickyAddToCart from './components/StickyAddToCart';
import RelatedProducts from './components/RelatedProducts';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetailView = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mock product data - in real app, this would come from API
  const mockProduct = {
    id: searchParams?.get('id') || 'divine-bag-001',
    name: "Divine Krishna Bag Collection",
    price: 1299,
    originalPrice: 1899,
    rating: 4.8,
    reviewCount: 156,
    availability: "in_stock",
    description: `Exquisite handcrafted bag designed specifically for Krishna devotees. Made with premium materials and adorned with traditional motifs that reflect the divine essence of Lord Krishna.\n\nPerfect for carrying your spiritual essentials, prayer items, and daily necessities while maintaining a connection to your faith.\n\nEach bag is blessed by temple priests and crafted with love and devotion to serve the spiritual community.`,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&sat=-20",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&brightness=10",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&contrast=15"
    ],
    specifications: [
      { label: "Material", value: "Premium Cotton Canvas with Krishna Motifs" },
      { label: "Dimensions", value: "12\" x 10\" x 4\" (L x H x W)" },
      { label: "Weight", value: "350 grams" },
      { label: "Closure", value: "Zipper with traditional tassels" },
      { label: "Straps", value: "Adjustable shoulder straps (24\"-48\")" },
      { label: "Care Instructions", value: "Hand wash with mild detergent, air dry" },
      { label: "Origin", value: "Handcrafted in Vrindavan, India" },
      { label: "Blessing", value: "Temple blessed by Krishna priests" }
    ],
    variants: [
      {
        type: "color",
        label: "Sacred Color",
        options: [
          { id: "saffron", label: "Saffron Orange", color: "#FF9933", available: true },
          { id: "krishna-blue", label: "Krishna Blue", color: "#1E40AF", available: true },
          { id: "pure-white", label: "Pure White", color: "#FFFFFF", available: true },
          { id: "golden-yellow", label: "Golden Yellow", color: "#F59E0B", available: false }
        ]
      },
      {
        type: "size",
        label: "Size",
        options: [
          { id: "small", label: "Small (10\" x 8\")", available: true },
          { id: "medium", label: "Medium (12\" x 10\")", available: true },
          { id: "large", label: "Large (14\" x 12\")", available: true }
        ]
      }
    ],
    features: [
      "Authentic Krishna motifs hand-embroidered",
      "Durable construction with reinforced stitching",
      "Multiple compartments for organization",
      "Adjustable and comfortable straps",
      "Temple blessed by Krishna priests",
      "Water-resistant coating",
      "Traditional tassels and decorative elements",
      "Perfect for temple visits and daily use"
    ],
    category: "Divine Bags",
    tags: ["Krishna", "Spiritual", "Handcrafted", "Temple", "Devotee"]
  };

  useEffect(() => {
    // Simulate loading product data
    setIsLoading(true);
    setTimeout(() => {
      setProduct(mockProduct);
      setIsLoading(false);
    }, 500);
  }, [searchParams]);

  const handleAddToCart = (cartItem) => {
    setIsLoading(true);
    
    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('krishna-cart') || '[]');
    
    // Check if item already exists
    const existingItemIndex = existingCart?.findIndex(item => 
      item?.id === cartItem?.id && 
      JSON.stringify(item?.variants) === JSON.stringify(cartItem?.variants)
    );
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += cartItem?.quantity;
    } else {
      existingCart?.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('krishna-cart', JSON.stringify(existingCart));
    
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    setTimeout(() => {
      setIsLoading(false);
      setAddToCartSuccess(true);
      setTimeout(() => setAddToCartSuccess(false), 3000);
    }, 800);
  };

  const handleBuyNow = () => {
    navigate('/shopping-cart-checkout');
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering the ${product?.name} (₹${product?.price}). Please provide more details about availability and delivery.`;
    const phoneNumber = "919876543210"; // Mock WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i?.test(navigator.userAgent)) {
      window.open(whatsappUrl, '_blank');
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  if (isLoading && !product) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading divine product details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => navigate('/customer-product-catalog')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Products
              </button>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              <button 
                onClick={() => navigate('/customer-product-catalog?category=bags')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {product?.category || 'Divine Bags'}
              </button>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              <span className="text-foreground font-medium truncate">
                {product?.name || 'Product Details'}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Detail Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <ProductImageGallery 
                images={product?.images || []} 
                productName={product?.name || 'Divine Product'} 
              />
              
              {/* Social Share - Desktop */}
              <div className="hidden lg:block">
                <SocialShare 
                  productName={product?.name || 'Divine Product'}
                  productImage={product?.images?.[0]}
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              <ProductInfo 
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                isLoading={isLoading}
              />

              {/* WhatsApp Order Button */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="MessageCircle" size={20} className="text-green-600" />
                  <div>
                    <h3 className="font-medium text-foreground">Order via WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">
                      Get instant support and personalized service
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleWhatsAppOrder}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="w-full border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30"
                >
                  Order on WhatsApp
                </Button>
              </div>

              {/* Social Share - Mobile */}
              <div className="lg:hidden">
                <SocialShare 
                  productName={product?.name || 'Divine Product'}
                  productImage={product?.images?.[0]}
                />
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mt-16">
            <CustomerReviews productId={product?.id} />
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <RelatedProducts currentProductId={product?.id} />
          </div>
        </div>

        {/* Sticky Add to Cart - Mobile */}
        <StickyAddToCart 
          product={product}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isLoading={isLoading}
        />

        {/* Success Toast */}
        {addToCartSuccess && (
          <div className="fixed top-20 right-4 z-1200 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-modal flex items-center space-x-3 animate-in slide-in-from-right">
            <Icon name="CheckCircle" size={20} />
            <div>
              <p className="font-medium">Added to Cart!</p>
              <p className="text-xs opacity-90">Item successfully added to your cart</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAddToCartSuccess(false)}
              className="text-success-foreground hover:bg-success-foreground/20 w-6 h-6"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Crown" size={20} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Krishna Bagha</h3>
                <p className="text-xs text-muted-foreground -mt-1">Divine Collection</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Serving the Krishna devotee community with authentic, blessed merchandise 
              crafted with love and devotion.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <span>© {new Date()?.getFullYear()} Krishna Bagha Store</span>
              <span>•</span>
              <span>Made with 🙏 for devotees</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailView;