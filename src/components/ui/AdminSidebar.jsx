import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement?.classList?.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement?.classList?.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  const navigationItems = [
    {
      path: '/admin-dashboard',
      label: 'Dashboard Overview',
      icon: 'LayoutDashboard',
      description: 'Business metrics and insights'
    },
    {
      path: '/admin-product-management',
      label: 'Manage Products',
      icon: 'Package',
      description: 'Inventory and catalog management'
    },
    {
      path: '/order-management-dashboard',
      label: 'Process Orders',
      icon: 'ShoppingCart',
      description: 'Customer order fulfillment'
    }
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className={`flex items-center space-x-3 ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Crown" size={20} color="white" />
          </div>
          {(!isCollapsed || isMobile) && (
            <div>
              <h1 className="text-lg font-semibold text-foreground">Krishna Admin</h1>
              <p className="text-xs text-muted-foreground -mt-1">Management Portal</p>
            </div>
          )}
        </div>
        
        {!isMobile && onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="flex-shrink-0"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={18} />
          </Button>
        )}
        
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
          >
            <Icon name="X" size={18} />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems?.map((item) => (
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth group ${
              isActive(item?.path)
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-foreground hover:bg-muted hover:text-foreground'
            } ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
            title={isCollapsed && !isMobile ? item?.label : ''}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              className={`flex-shrink-0 ${
                isActive(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
              }`}
            />
            {(!isCollapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item?.label}</div>
                <div className={`text-xs truncate ${
                  isActive(item?.path) ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {item?.description}
                </div>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-smooth ${
            isCollapsed && !isMobile ? 'justify-center' : ''
          }`}
          title={isCollapsed && !isMobile ? (isDarkMode ? 'Light Mode' : 'Dark Mode') : ''}
        >
          <Icon name={isDarkMode ? "Sun" : "Moon"} size={18} className="flex-shrink-0" />
          {(!isCollapsed || isMobile) && (
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          )}
        </button>

        {/* Admin Info */}
        {(!isCollapsed || isMobile) && (
          <div className="px-3 py-2 bg-muted rounded-lg">
            <div className="text-xs font-medium text-foreground">Admin User</div>
            <div className="text-xs text-muted-foreground">Store Manager</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-900 lg:flex-col bg-background border-r border-border transition-layout ${
        isCollapsed ? 'lg:w-20' : 'lg:w-64'
      }`}>
        <SidebarContent />
      </aside>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-1100 bg-background border border-border shadow-soft"
      >
        <Icon name="Menu" size={18} />
      </Button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-1100 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-glass"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="relative flex flex-col w-64 bg-background border-r border-border shadow-modal">
            <SidebarContent isMobile />
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;