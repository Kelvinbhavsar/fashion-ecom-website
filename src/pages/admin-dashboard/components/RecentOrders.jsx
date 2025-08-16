import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import OrderStatusIndicator from '../../../components/ui/OrderStatusIndicator';

const RecentOrders = () => {
  const navigate = useNavigate();
  const [orders] = useState([
    {
      id: 'KRB-2025-001',
      customer: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      items: 3,
      total: 2499,
      status: 'pending',
      date: new Date('2025-01-16T10:30:00'),
      products: ['Divine Bag - Blue', 'Krishna Scrunchie', 'Sacred Cloth']
    },
    {
      id: 'KRB-2025-002',
      customer: 'Rajesh Kumar',
      email: 'rajesh.k@email.com',
      phone: '+91 87654 32109',
      items: 2,
      total: 1899,
      status: 'confirmed',
      date: new Date('2025-01-16T09:15:00'),
      products: ['Spiritual Jewelry Set', 'Krishna Bag - Golden']
    },
    {
      id: 'KRB-2025-003',
      customer: 'Anita Devi',
      email: 'anita.devi@email.com',
      phone: '+91 76543 21098',
      items: 1,
      total: 899,
      status: 'processing',
      date: new Date('2025-01-16T08:45:00'),
      products: ['Sacred White Cloth']
    },
    {
      id: 'KRB-2025-004',
      customer: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 65432 10987',
      items: 4,
      total: 3299,
      status: 'shipped',
      date: new Date('2025-01-15T16:20:00'),
      products: ['Complete Krishna Set', 'Divine Accessories', 'Holy Books', 'Jewelry']
    },
    {
      id: 'KRB-2025-005',
      customer: 'Meera Patel',
      email: 'meera.patel@email.com',
      phone: '+91 54321 09876',
      items: 2,
      total: 1599,
      status: 'delivered',
      date: new Date('2025-01-15T14:10:00'),
      products: ['Krishna Scrunchie Set', 'Divine Bag - Red']
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order-management-dashboard?order=${orderId}`);
  };

  const handleViewAllOrders = () => {
    navigate('/order-management-dashboard');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">Latest customer orders and status</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleViewAllOrders}>
          <Icon name="ExternalLink" size={14} className="mr-2" />
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-smooth">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="ShoppingCart" size={20} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-semibold text-card-foreground truncate">
                    {order?.customer}
                  </h4>
                  <span className="text-xs text-muted-foreground font-mono">
                    #{order?.id}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{order?.items} items</span>
                  <span>•</span>
                  <span className="font-mono font-medium text-primary">
                    {formatCurrency(order?.total)}
                  </span>
                  <span>•</span>
                  <span>{formatDate(order?.date)}</span>
                </div>
                
                <div className="mt-1 text-xs text-muted-foreground truncate">
                  {order?.products?.join(', ')}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <OrderStatusIndicator 
                status={order?.status} 
                size="compact"
                orderId={order?.id}
                onStatusChange={() => {}}
              />
              
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewOrder(order?.id)}
                  className="h-8 px-2"
                >
                  <Icon name="Eye" size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://wa.me/${order?.phone?.replace(/\s+/g, '')?.replace('+', '')}`)}
                  className="h-8 px-2"
                >
                  <Icon name="MessageCircle" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Showing {orders?.length} recent orders
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              Total: {formatCurrency(orders?.reduce((sum, order) => sum + order?.total, 0))}
            </span>
            <Button variant="outline" size="sm" onClick={handleViewAllOrders}>
              Manage Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;