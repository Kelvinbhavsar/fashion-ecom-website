import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import SegmentControl from './components/SegmentControl';
import RecentOrders from './components/RecentOrders';
import SalesChart from './components/SalesChart';
import QuickActions from './components/QuickActions';
import InventoryAlerts from './components/InventoryAlerts';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Mock notifications
    setNotifications([
      { id: 1, type: 'order', message: 'New order received from Priya Sharma', time: new Date() },
      { id: 2, type: 'inventory', message: 'Krishna Divine Bag - Blue is low in stock', time: new Date(Date.now() - 300000) },
      { id: 3, type: 'system', message: 'Daily backup completed successfully', time: new Date(Date.now() - 600000) }
    ]);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  const metricsData = [
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'ShoppingCart',
      color: 'primary'
    },
    {
      title: 'Revenue (INR)',
      value: '₹3,45,678',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'IndianRupee',
      color: 'success'
    },
    {
      title: 'Active Products',
      value: '156',
      change: '+5 new',
      changeType: 'positive',
      icon: 'Package',
      color: 'secondary'
    },
    {
      title: 'Low Stock Items',
      value: '12',
      change: '+3 alerts',
      changeType: 'negative',
      icon: 'AlertTriangle',
      color: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-layout ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="bg-background/95 backdrop-blur-glass border-b border-border sticky top-0 z-50">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center space-x-4">
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <Icon name="Menu" size={20} />
                </Button>
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {formatTime(currentTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <Icon name="Bell" size={20} />
                  {notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications?.length}
                    </span>
                  )}
                </Button>
              </div>

              {/* Quick Customer View */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/customer-product-catalog')}
                className="hidden sm:flex"
              >
                <Icon name="Eye" size={16} className="mr-2" />
                Customer View
              </Button>

              {/* Admin Profile */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">Admin</p>
                  <p className="text-xs text-muted-foreground">Store Manager</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome back, Admin! 🙏
                </h2>
                <p className="text-muted-foreground">
                  Manage your Krishna Bagha Store with divine efficiency. Here's your business overview.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={32} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="xl:col-span-2 space-y-6">
              {/* Segment Control */}
              <SegmentControl />
              
              {/* Sales Chart */}
              <SalesChart />
              
              {/* Recent Orders */}
              <RecentOrders />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions />
              
              {/* Inventory Alerts */}
              <InventoryAlerts />
              
              {/* System Status */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-card-foreground">System Status</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm text-success font-medium">All Systems Operational</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Server Status</span>
                    <span className="text-success font-medium">Online</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Database</span>
                    <span className="text-success font-medium">Connected</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Backup</span>
                    <span className="text-muted-foreground font-mono">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">WhatsApp Integration</span>
                    <span className="text-success font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Krishna Bagha Store. Serving devotees with divine merchandise.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;