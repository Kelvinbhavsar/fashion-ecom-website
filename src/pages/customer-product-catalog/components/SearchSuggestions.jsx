import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ 
  query, 
  isVisible, 
  onSuggestionClick, 
  onClose,
  products = [] 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('krishna-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!query?.trim()) {
      setSuggestions([]);
      return;
    }

    const searchQuery = query?.toLowerCase();
    const productSuggestions = products?.filter(product => 
        product?.name?.toLowerCase()?.includes(searchQuery) ||
        product?.category?.toLowerCase()?.includes(searchQuery) ||
        product?.description?.toLowerCase()?.includes(searchQuery)
      )?.slice(0, 5)?.map(product => ({
        type: 'product',
        text: product?.name,
        category: product?.category,
        image: product?.image,
        id: product?.id
      }));

    const categorySuggestions = [
      'Divine Bags', 'Sacred Clothes', 'Hair Accessories', 
      'Spiritual Jewelry', 'Holy Books'
    ]?.filter(category => category?.toLowerCase()?.includes(searchQuery))?.slice(0, 3)?.map(category => ({
        type: 'category',
        text: category,
        icon: getCategoryIcon(category)
      }));

    setSuggestions([...productSuggestions, ...categorySuggestions]);
  }, [query, products]);

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Divine Bags': 'ShoppingBag',
      'Sacred Clothes': 'Shirt',
      'Hair Accessories': 'Circle',
      'Spiritual Jewelry': 'Gem',
      'Holy Books': 'Book'
    };
    return iconMap?.[category] || 'Package';
  };

  const handleSuggestionClick = (suggestion) => {
    // Save to recent searches
    const newRecentSearches = [
      suggestion?.text,
      ...recentSearches?.filter(item => item !== suggestion?.text)
    ]?.slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('krishna-recent-searches', JSON.stringify(newRecentSearches));
    
    onSuggestionClick(suggestion?.text);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('krishna-recent-searches');
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal z-1100 max-h-96 overflow-y-auto">
      {/* Search Suggestions */}
      {suggestions?.length > 0 && (
        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
            Suggestions
          </div>
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center space-x-3 px-2 py-2 text-left hover:bg-muted rounded-lg transition-colors"
            >
              {suggestion?.type === 'product' ? (
                <div className="w-8 h-8 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={suggestion?.image} 
                    alt={suggestion?.text}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-muted flex items-center justify-center" style={{ display: 'none' }}>
                    <Icon name="Package" size={16} className="text-muted-foreground" />
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={suggestion?.icon} size={16} className="text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-popover-foreground truncate">
                  {suggestion?.text}
                </div>
                {suggestion?.category && (
                  <div className="text-xs text-muted-foreground">
                    in {suggestion?.category}
                  </div>
                )}
              </div>
              <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
      {/* Recent Searches */}
      {recentSearches?.length > 0 && suggestions?.length === 0 && (
        <div className="p-2">
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              Recent Searches
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearRecentSearches}
              className="text-xs h-auto p-1"
            >
              Clear
            </Button>
          </div>
          {recentSearches?.map((search, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(search)}
              className="w-full flex items-center space-x-3 px-2 py-2 text-left hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-popover-foreground">{search}</span>
            </button>
          ))}
        </div>
      )}
      {/* No Results */}
      {query?.trim() && suggestions?.length === 0 && (
        <div className="p-4 text-center">
          <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No suggestions found for "{query}"
          </p>
        </div>
      )}
      {/* Popular Searches */}
      {!query?.trim() && recentSearches?.length === 0 && (
        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
            Popular Searches
          </div>
          {['Krishna Bags', 'Divine Clothes', 'Spiritual Jewelry', 'Hair Accessories']?.map((search, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(search)}
              className="w-full flex items-center space-x-3 px-2 py-2 text-left hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
              <span className="text-sm text-popover-foreground">{search}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;