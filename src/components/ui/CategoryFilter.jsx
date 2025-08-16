import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CategoryFilter = ({ onCategoryChange, activeCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [isVisible, setIsVisible] = useState(true);

  const categories = [
    {
      id: 'all',
      label: 'All Products',
      icon: 'Grid3X3',
      count: 156
    },
    {
      id: 'bags',
      label: 'Divine Bags',
      icon: 'ShoppingBag',
      count: 45,
      featured: true
    },
    {
      id: 'clothes',
      label: 'Sacred Clothes',
      icon: 'Shirt',
      count: 78
    },
    {
      id: 'scrunchies',
      label: 'Hair Accessories',
      icon: 'Circle',
      count: 33
    },
    {
      id: 'jewelry',
      label: 'Spiritual Jewelry',
      icon: 'Gem',
      count: 24
    },
    {
      id: 'books',
      label: 'Holy Books',
      icon: 'Book',
      count: 18
    }
  ];

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  const scrollLeft = () => {
    const container = document.getElementById('category-scroll');
    if (container) {
      container?.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('category-scroll');
    if (container) {
      container?.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-glass border-b border-border shadow-soft">
      <div className="relative px-4 py-3">
        {/* Scroll Left Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-glass shadow-soft hidden sm:flex"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>

        {/* Categories Container */}
        <div 
          id="category-scroll"
          className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth px-8 sm:px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => handleCategorySelect(category?.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-smooth border ${
                selectedCategory === category?.id
                  ? `${category?.featured ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-lg' : 'bg-primary text-primary-foreground border-primary shadow-soft'}`
                  : 'bg-surface text-foreground border-border hover:bg-muted hover:border-muted-foreground/20'
              }`}
            >
              <Icon 
                name={category?.icon} 
                size={16} 
                className={selectedCategory === category?.id ? 'text-white' : 'text-muted-foreground'}
              />
              <span className="whitespace-nowrap">{category?.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                selectedCategory === category?.id
                  ? 'bg-white/20 text-white' :'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>

        {/* Scroll Right Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-glass shadow-soft hidden sm:flex"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>

        {/* Mobile Gradient Indicators */}
        <div className="sm:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
      {/* Filter Actions */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {selectedCategory === 'all' ? 'All Categories' : categories?.find(c => c?.id === selectedCategory)?.label}
          </span>
          {selectedCategory !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCategorySelect('all')}
              className="text-xs"
            >
              <Icon name="X" size={14} className="mr-1" />
              Clear Filter
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-xs"
          >
            <Icon name="EyeOff" size={14} className="mr-1" />
            Hide Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;