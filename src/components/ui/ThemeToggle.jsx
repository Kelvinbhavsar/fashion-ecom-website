import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ThemeToggle = ({ 
  variant = 'icon', 
  size = 'default',
  showLabel = false,
  className = '' 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement?.classList?.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Add transition class to body for smooth theme change
    document.body.style.transition = 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms cubic-bezier(0.4, 0, 0.2, 1)';
    
    document.documentElement?.classList?.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: newTheme ? 'dark' : 'light' } 
    }));
    
    setTimeout(() => {
      setIsTransitioning(false);
      document.body.style.transition = '';
    }, 300);
  };

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-foreground">
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
        )}
        <button
          onClick={toggleTheme}
          disabled={isTransitioning}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isDarkMode ? 'bg-primary' : 'bg-muted'
          } ${isTransitioning ? 'opacity-50' : ''}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          >
            <Icon 
              name={isDarkMode ? "Moon" : "Sun"} 
              size={12} 
              className={`absolute inset-0.5 ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`}
            />
          </span>
        </button>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={toggleTheme}
        disabled={isTransitioning}
        className={`${className} ${isTransitioning ? 'opacity-50' : ''}`}
      >
        <Icon 
          name={isDarkMode ? "Sun" : "Moon"} 
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} 
          className={`${showLabel ? 'mr-2' : ''} transition-transform ${isTransitioning ? 'scale-110' : ''}`}
        />
        {showLabel && (
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        )}
      </Button>
    );
  }

  // Default icon variant
  return (
    <Button
      variant="ghost"
      size={size === 'icon' ? 'icon' : size}
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`${className} ${isTransitioning ? 'opacity-50' : ''} group`}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative">
        <Icon 
          name={isDarkMode ? "Sun" : "Moon"} 
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
          className={`transition-all duration-300 ${
            isTransitioning ? 'scale-110 rotate-180' : 'group-hover:scale-110'
          }`}
        />
        
        {/* Subtle glow effect */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isDarkMode 
            ? 'bg-yellow-400/20 opacity-0 group-hover:opacity-100' :'bg-blue-400/20 opacity-0 group-hover:opacity-100'
        }`} />
      </div>
      
      {showLabel && (
        <span className="ml-2 text-sm">
          {isDarkMode ? 'Light' : 'Dark'}
        </span>
      )}
    </Button>
  );
};

export default ThemeToggle;