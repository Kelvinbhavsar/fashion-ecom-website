import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/ui/CustomerHeader';
import CategoryFilter from '../../components/ui/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import SearchSuggestions from './components/SearchSuggestions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    priceRange: [],
    availability: [],
    inStock: false,
    onSale: false
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Divine Krishna Jhola Bag",
      category: "bags",
      price: 899,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      description: "Handcrafted jhola bag with Krishna motifs, perfect for daily use and spiritual gatherings.",
      inStock: true,
      stockCount: 15,
      rating: 4.8,
      isNew: true,
      createdAt: "2025-01-10T00:00:00Z",
      variants: [
        { id: 'v1', size: 'Medium', color: 'Blue', price: 899 },
        { id: 'v2', size: 'Large', color: 'Blue', price: 999 },
        { id: 'v3', size: 'Medium', color: 'Orange', price: 899 }
      ]
    },
    {
      id: 2,
      name: "Sacred Radha Krishna Kurta",
      category: "clothes",
      price: 1599,
      originalPrice: 2199,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      description: "Traditional kurta with beautiful Radha Krishna embroidery, made from pure cotton.",
      inStock: true,
      stockCount: 8,
      rating: 4.9,
      isNew: false,
      createdAt: "2025-01-08T00:00:00Z",
      variants: [
        { id: 'v4', size: 'S', color: 'White', price: 1599 },
        { id: 'v5', size: 'M', color: 'White', price: 1599 },
        { id: 'v6', size: 'L', color: 'Cream', price: 1699 }
      ]
    },
    {
      id: 3,
      name: "Peacock Feather Hair Scrunchie",
      category: "scrunchies",
      price: 299,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      description: "Elegant hair scrunchie adorned with peacock feathers, inspired by Krishna's crown.",
      inStock: true,
      stockCount: 25,
      rating: 4.6,
      isNew: true,
      createdAt: "2025-01-12T00:00:00Z"
    },
    {
      id: 4,
      name: "Gopi Skirt with Mirror Work",
      category: "clothes",
      price: 2299,
      originalPrice: 2899,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
      description: "Traditional Gopi skirt with intricate mirror work and vibrant colors.",
      inStock: false,
      stockCount: 0,
      rating: 4.7,
      isNew: false,
      createdAt: "2025-01-05T00:00:00Z"
    },
    {
      id: 5,
      name: "Krishna Flute Pendant Necklace",
      category: "jewelry",
      price: 1899,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      description: "Sterling silver necklace with Krishna's flute pendant, perfect for devotees.",
      inStock: true,
      stockCount: 12,
      rating: 4.8,
      isNew: false,
      createdAt: "2025-01-07T00:00:00Z"
    },
    {
      id: 6,
      name: "Bhagavad Gita - Deluxe Edition",
      category: "books",
      price: 799,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      description: "Beautifully illustrated Bhagavad Gita with Sanskrit verses and English translation.",
      inStock: true,
      stockCount: 30,
      rating: 4.9,
      isNew: false,
      createdAt: "2025-01-03T00:00:00Z"
    },
    {
      id: 7,
      name: "Lotus Embroidered Tote Bag",
      category: "bags",
      price: 1299,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      description: "Spacious tote bag with lotus embroidery, ideal for temple visits and shopping.",
      inStock: true,
      stockCount: 18,
      rating: 4.5,
      isNew: true,
      createdAt: "2025-01-11T00:00:00Z"
    },
    {
      id: 8,
      name: "Silk Hair Scrunchie Set",
      category: "scrunchies",
      price: 599,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      description: "Set of 3 silk scrunchies in divine colors - saffron, white, and green.",
      inStock: true,
      stockCount: 22,
      rating: 4.4,
      isNew: false,
      createdAt: "2025-01-09T00:00:00Z"
    }
  ];

  // Initialize products and handle URL search params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams?.get('search');
    const categoryParam = urlParams?.get('category');
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    // Simulate API call
    const loadProducts = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(mockProducts);
      setLoading(false);
      setHasMore(false); // No pagination for mock data
    };

    loadProducts();
  }, [location?.search]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate loading more products
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPage(prev => prev + 1);
    setLoading(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setShowSearchSuggestions(false);
    
    // Update URL without page reload
    const newUrl = query 
      ? `/customer-product-catalog?search=${encodeURIComponent(query)}`
      : '/customer-product-catalog';
    navigate(newUrl, { replace: true });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when changing category
    navigate('/customer-product-catalog', { replace: true });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      sortBy: 'newest',
      priceRange: [],
      availability: [],
      inStock: false,
      onSale: false
    });
  };

  const getFilteredProductCount = () => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(product => 
        product?.category?.toLowerCase() === selectedCategory?.toLowerCase()
      );
    }
    
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(query) ||
        product?.description?.toLowerCase()?.includes(query) ||
        product?.category?.toLowerCase()?.includes(query)
      );
    }
    
    return filtered?.length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <CustomerHeader />
      
      {/* Category Filter */}
      <CategoryFilter
        onCategoryChange={handleCategoryChange}
        activeCategory={selectedCategory}
      />
      
      {/* Main Content */}
      <main className="pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-md relative">
              {/* Mobile Search */}
              <div className="md:hidden">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    placeholder="Search divine products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    onFocus={() => setShowSearchSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                    onKeyPress={(e) => {
                      if (e?.key === 'Enter') {
                        handleSearchChange(searchQuery);
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                  />
                  
                  {/* Search Suggestions */}
                  <SearchSuggestions
                    query={searchQuery}
                    isVisible={showSearchSuggestions}
                    products={products}
                    onSuggestionClick={handleSearchChange}
                    onClose={() => setShowSearchSuggestions(false)}
                  />
                </div>
              </div>
            </div>

            {/* Results Count and Filter Button */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {getFilteredProductCount()} products found
              </span>
              
              <Button
                variant="outline"
                onClick={() => setShowFilterPanel(true)}
                className="flex items-center space-x-2"
              >
                <Icon name="Filter" size={16} />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>

          {/* Active Search/Category Indicator */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="mb-6 flex items-center space-x-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Showing results for:</span>
              {searchQuery && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  "{searchQuery}"
                  <button
                    onClick={() => handleSearchChange('')}
                    className="ml-2 hover:text-primary/80"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                  {selectedCategory}
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className="ml-2 hover:text-secondary/80"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            sortBy={filters?.sortBy}
          />
        </div>
      </main>
      
      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />
      
      {/* Floating Action Button for Mobile Filter */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          variant="default"
          size="icon"
          onClick={() => setShowFilterPanel(true)}
          className="w-14 h-14 rounded-full shadow-modal"
        >
          <Icon name="Filter" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default CustomerProductCatalog;