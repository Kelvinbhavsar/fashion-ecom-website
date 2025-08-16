import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import QuickAddModal from './QuickAddModal';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ 
  products = [], 
  loading = false, 
  hasMore = false, 
  onLoadMore,
  searchQuery = '',
  selectedCategory = 'all',
  sortBy = 'newest'
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const observerRef = useRef();
  const loadingRef = useRef();

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(product => 
        product?.category?.toLowerCase() === selectedCategory?.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(query) ||
        product?.description?.toLowerCase()?.includes(query) ||
        product?.category?.toLowerCase()?.includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'name':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'rating':
        filtered?.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
        break;
      case 'newest':
      default:
        filtered?.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }

    setDisplayedProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Infinite scroll observer
  const lastProductRef = useCallback(node => {
    if (loading) return;
    if (observerRef?.current) observerRef?.current?.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && onLoadMore) {
        onLoadMore();
      }
    });
    
    if (node) observerRef?.current?.observe(node);
  }, [loading, hasMore, onLoadMore]);

  const handleQuickAdd = async (product) => {
    setSelectedProduct(product);
    
    // If product has variants, show modal
    if (product?.variants && product?.variants?.length > 0) {
      setShowQuickAddModal(true);
    } else {
      // Add directly to cart
      await addToCart(product);
    }
  };

  const addToCart = async (product, selectedVariant = null) => {
    try {
      const cartItem = {
        id: product?.id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
        category: product?.category,
        variant: selectedVariant,
        quantity: 1,
        addedAt: new Date()?.toISOString()
      };

      const existingCart = JSON.parse(localStorage.getItem('krishna-cart') || '[]');
      const existingItemIndex = existingCart?.findIndex(item => 
        item?.id === product?.id && 
        JSON.stringify(item?.variant) === JSON.stringify(selectedVariant)
      );

      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart?.push(cartItem);
      }

      localStorage.setItem('krishna-cart', JSON.stringify(existingCart));
      
      // Dispatch custom event for cart updates
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
      setShowQuickAddModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleQuickAddConfirm = (variant) => {
    if (selectedProduct) {
      addToCart(selectedProduct, variant);
    }
  };

  if (loading && displayedProducts?.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 })?.map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (displayedProducts?.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          {searchQuery 
            ? `No products match "${searchQuery}". Try adjusting your search terms.`
            : selectedCategory !== 'all'
            ? `No products available in the ${selectedCategory} category.`
            : 'No products are currently available.'
          }
        </p>
        {(searchQuery || selectedCategory !== 'all') && (
          <Button
            variant="outline"
            onClick={() => {
              // Reset filters - this would be handled by parent component
              window.location?.reload();
            }}
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts?.map((product, index) => (
          <div
            key={`${product?.id}-${index}`}
            ref={index === displayedProducts?.length - 1 ? lastProductRef : null}
          >
            <ProductCard
              product={product}
              onQuickAdd={handleQuickAdd}
            />
          </div>
        ))}
        
        {/* Loading more products */}
        {loading && displayedProducts?.length > 0 && (
          <>
            {Array.from({ length: 4 })?.map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>
      {/* Load More Button (fallback for infinite scroll) */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            className="px-8"
          >
            <Icon name="ChevronDown" size={16} className="mr-2" />
            Load More Products
          </Button>
        </div>
      )}
      {/* Quick Add Modal */}
      {showQuickAddModal && selectedProduct && (
        <QuickAddModal
          product={selectedProduct}
          isOpen={showQuickAddModal}
          onClose={() => {
            setShowQuickAddModal(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleQuickAddConfirm}
        />
      )}
      {/* Loading indicator for infinite scroll */}
      <div ref={loadingRef} className="h-4" />
    </>
  );
};

export default ProductGrid;