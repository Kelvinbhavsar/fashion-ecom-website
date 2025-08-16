import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const CustomerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement?.classList?.toggle('dark', shouldUseDark);
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('krishna-cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      setCartCount(cart?.reduce((total, item) => total + item?.quantity, 0));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement?.classList?.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/customer-product-catalog?search=${encodeURIComponent(searchQuery?.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-glass border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer transition-smooth hover:opacity-80"
          onClick={() => handleNavigation('/')}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Icon name="Crown" size={20} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-blue-700 bg-clip-text text-transparent">Krishna Bagha</h1>
            <p className="text-xs text-muted-foreground -mt-1">Divine Collection</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => handleNavigation('/')}
            className={`text-sm font-medium transition-smooth hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation('/customer-product-catalog')}
            className={`text-sm font-medium transition-smooth hover:text-primary ${
              isActive('/customer-product-catalog') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Browse Products
          </button>
          <button
            onClick={() => handleNavigation('/customer-product-catalog?category=bags')}
            className={`text-sm font-medium transition-smooth hover:text-orange-600 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent font-semibold ${
              location?.search?.includes('category=bags') ? 'opacity-100' : 'opacity-80 hover:opacity-100'
            }`}
          >
            Divine Bags
          </button>
          <button
            onClick={() => handleNavigation('/shopping-cart-checkout')}
            className={`text-sm font-medium transition-smooth hover:text-primary ${
              isActive('/shopping-cart-checkout') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Cart
          </button>
        </nav>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
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
              className="w-full pl-10 pr-4 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:flex"
          >
            <Icon name={isDarkMode ? "Sun" : "Moon"} size={18} />
          </Button>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/shopping-cart-checkout')}
            className="relative"
          >
            <Icon name="ShoppingBag" size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={18} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border shadow-soft">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="md:hidden">
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
                  className="w-full pl-10 pr-4 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => handleNavigation('/')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActive('/') 
                    ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('/customer-product-catalog')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActive('/customer-product-catalog') 
                    ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                }`}
              >
                Browse Products
              </button>
              <button
                onClick={() => handleNavigation('/customer-product-catalog?category=bags')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  location?.search?.includes('category=bags')
                    ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600' :'text-foreground hover:bg-muted'
                }`}
              >
                🛍️ Divine Bags (Featured)
              </button>
              <button
                onClick={() => handleNavigation('/shopping-cart-checkout')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActive('/shopping-cart-checkout') 
                    ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                }`}
              >
                View Cart
              </button>
            </nav>

            {/* Mobile Theme Toggle */}
            <div className="sm:hidden pt-2 border-t border-border">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name={isDarkMode ? "Sun" : "Moon"} size={18} />
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomerHeader;