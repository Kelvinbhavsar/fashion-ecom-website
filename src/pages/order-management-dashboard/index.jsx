import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrderFilters from './components/OrderFilters';
import OrderTable from './components/OrderTable';
import OrderAnalytics from './components/OrderAnalytics';
import QuickActions from './components/QuickActions';

const OrderManagementDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('orders');
  const [filters, setFilters] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock orders data
  const mockOrders = [
    {
      id: 'ord_001',
      orderId: 'KR2025001',
      customerName: 'Priya Sharma',
      customerPhone: '+91 98765 43210',
      customerEmail: 'priya.sharma@email.com',
      orderDate: new Date('2025-01-16T10:30:00'),
      totalAmount: 2850,
      status: 'pending',
      priority: 'high',
      shippingAddress: `123 Temple Street, Vrindavan Colony\nMathura, Uttar Pradesh - 281001`,
      specialInstructions: 'Please deliver before Janmashtami festival. Handle with care.',
      items: [
        { name: 'Divine Krishna Bag - Blue Silk', quantity: 1, price: 1299 },
        { name: 'Sacred Peacock Feather Scrunchie', quantity: 2, price: 299 },
        { name: 'Radha Krishna Devotional Book', quantity: 1, price: 499 },
        { name: 'Spiritual Tulsi Mala', quantity: 1, price: 750 }
      ],
      communicationHistory: [
        { type: 'whatsapp', message: 'Order placed via WhatsApp', timestamp: new Date('2025-01-16T10:30:00') },
        { type: 'system', message: 'Order confirmation sent', timestamp: new Date('2025-01-16T10:35:00') }
      ]
    },
    {
      id: 'ord_002',
      orderId: 'KR2025000',
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 87654 32109',
      customerEmail: 'rajesh.kumar@email.com',
      orderDate: new Date('2025-01-16T09:15:00'),
      totalAmount: 1899,
      status: 'processing',
      priority: 'normal',
      shippingAddress: `456 Bhakti Marg, Krishna Nagar\nDelhi - 110051`,
      specialInstructions: '',
      items: [
        { name: 'Handwoven Krishna Kurta - White', quantity: 1, price: 1299 },
        { name: 'Divine Lotus Hair Band', quantity: 1, price: 399 },
        { name: 'Gita Saar Pocket Edition', quantity: 1, price: 199 }
      ],
      communicationHistory: [
        { type: 'email', message: 'Order placed via email', timestamp: new Date('2025-01-16T09:15:00') },
        { type: 'whatsapp', message: 'Processing update sent', timestamp: new Date('2025-01-16T11:20:00') }
      ]
    },
    {
      id: 'ord_003',
      orderId: 'KR2024999',
      customerName: 'Meera Devi',
      customerPhone: '+91 76543 21098',
      customerEmail: 'meera.devi@email.com',
      orderDate: new Date('2025-01-15T16:45:00'),
      totalAmount: 3250,
      status: 'shipped',
      priority: 'normal',
      shippingAddress: `789 Govind Vihar, Radha Kunj\nVrindavan, Uttar Pradesh - 281121`,
      specialInstructions: 'Gift wrapping required for temple donation.',
      items: [
        { name: 'Premium Krishna Idol Bag - Golden', quantity: 1, price: 1999 },
        { name: 'Sacred Conch Shell Pendant', quantity: 1, price: 899 },
        { name: 'Bhagavad Gita - Deluxe Edition', quantity: 1, price: 349 }
      ],
      communicationHistory: [
        { type: 'whatsapp', message: 'Order placed via WhatsApp', timestamp: new Date('2025-01-15T16:45:00') },
        { type: 'system', message: 'Shipped via courier', timestamp: new Date('2025-01-16T08:30:00') }
      ]
    },
    {
      id: 'ord_004',
      orderId: 'KR2024998',
      customerName: 'Arjun Patel',
      customerPhone: '+91 65432 10987',
      customerEmail: 'arjun.patel@email.com',
      orderDate: new Date('2025-01-15T14:20:00'),
      totalAmount: 1599,
      status: 'delivered',
      priority: 'low',
      shippingAddress: `321 Dharma Path, Gokul Society\nAhmedabad, Gujarat - 380015`,
      specialInstructions: '',
      items: [
        { name: 'Krishna Flute Design Scrunchie Set', quantity: 3, price: 399 },
        { name: 'Devotional Song Collection CD', quantity: 1, price: 299 },
        { name: 'Miniature Krishna Statue', quantity: 1, price: 899 }
      ],
      communicationHistory: [
        { type: 'email', message: 'Order placed via email', timestamp: new Date('2025-01-15T14:20:00') },
        { type: 'system', message: 'Delivered successfully', timestamp: new Date('2025-01-16T10:00:00') }
      ]
    },
    {
      id: 'ord_005',
      orderId: 'KR2024997',
      customerName: 'Lakshmi Iyer',
      customerPhone: '+91 54321 09876',
      customerEmail: 'lakshmi.iyer@email.com',
      orderDate: new Date('2025-01-15T11:30:00'),
      totalAmount: 2199,
      status: 'confirmed',
      priority: 'high',
      shippingAddress: `567 Bhajan Gali, Krishna Temple Road\nChennai, Tamil Nadu - 600004`,
      specialInstructions: 'Please call before delivery. Preferred time: 6-8 PM.',
      items: [
        { name: 'Silk Krishna Lehenga - Pink', quantity: 1, price: 1799 },
        { name: 'Traditional Anklet with Bells', quantity: 1, price: 399 }
      ],
      communicationHistory: [
        { type: 'whatsapp', message: 'Order placed via WhatsApp', timestamp: new Date('2025-01-15T11:30:00') },
        { type: 'system', message: 'Order confirmed', timestamp: new Date('2025-01-15T12:00:00') }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In real app, this would trigger API call with filters
  };

  const handleOrderUpdate = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders?.map(order =>
        order?.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    // Show success notification
    console.log(`Order ${orderId} updated to ${newStatus}`);
  };

  const handleBulkAction = (action, orderIds) => {
    console.log(`Bulk action: ${action} for orders:`, orderIds);
    // Handle bulk operations
  };

  const handleQuickAction = (action, data) => {
    switch (action) {
      case 'filter':
        setFilters(data);
        setActiveView('orders');
        break;
      case 'export':
        console.log('Exporting orders...');
        break;
      case 'send-notification':
        console.log('Sending notification:', data);
        break;
      case 'sync-inventory': console.log('Syncing inventory...');
        break;
      case 'generate-reports': console.log('Generating reports...');
        break;
      case 'communications': console.log('Opening communications panel...');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const getOrderStats = () => {
    return {
      pending: orders?.filter(o => o?.status === 'pending')?.length,
      processing: orders?.filter(o => o?.status === 'processing')?.length,
      urgent: orders?.filter(o => o?.priority === 'high')?.length,
      inquiries: 15 // Mock data
    };
  };

  const filteredOrders = orders?.filter(order => {
    if (filters?.status && filters?.status !== 'all' && order?.status !== filters?.status) return false;
    if (filters?.priority && filters?.priority !== 'all' && order?.priority !== filters?.priority) return false;
    if (filters?.search && !order?.customerName?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !order?.customerPhone?.includes(filters?.search) && !order?.orderId?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    if (filters?.minAmount && order?.totalAmount < parseFloat(filters?.minAmount)) return false;
    if (filters?.maxAmount && order?.totalAmount > parseFloat(filters?.maxAmount)) return false;
    if (filters?.location && !order?.shippingAddress?.toLowerCase()?.includes(filters?.location?.toLowerCase())) return false;
    return true;
  });

  const viewTabs = [
    { id: 'orders', label: 'Order Management', icon: 'ShoppingCart' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading order management dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={`transition-layout ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border shadow-soft">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
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
                  <h1 className="text-2xl font-bold text-card-foreground">Order Management</h1>
                  <p className="text-sm text-muted-foreground">
                    Manage customer orders and fulfillment process
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin-product-management')}
                >
                  <Icon name="Package" size={16} className="mr-2" />
                  <span className="hidden sm:inline">Manage Products</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/admin-dashboard')}
                >
                  <Icon name="LayoutDashboard" size={16} className="mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* View Tabs */}
        <div className="bg-card border-b border-border">
          <div className="px-4 lg:px-6">
            <div className="flex space-x-1">
              {viewTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveView(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth ${
                    activeView === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/20'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {activeView === 'orders' && (
            <>
              <OrderFilters 
                onFilterChange={handleFilterChange}
                activeFilters={filters}
              />
              <OrderTable
                orders={filteredOrders}
                onOrderUpdate={handleOrderUpdate}
                onBulkAction={handleBulkAction}
              />
            </>
          )}

          {activeView === 'analytics' && (
            <OrderAnalytics orders={orders} />
          )}

          {activeView === 'actions' && (
            <QuickActions
              onAction={handleQuickAction}
              orderStats={getOrderStats()}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default OrderManagementDashboard;