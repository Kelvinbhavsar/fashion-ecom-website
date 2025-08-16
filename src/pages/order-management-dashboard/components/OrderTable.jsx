import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import OrderStatusIndicator from '../../../components/ui/OrderStatusIndicator';

const OrderTable = ({ orders, onOrderUpdate, onBulkAction }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(orders?.map(order => order?.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders?.filter(id => id !== orderId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = [...orders]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  const handleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'normal': return 'text-foreground';
      case 'low': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'normal': return 'Circle';
      case 'low': return 'ArrowDown';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      {/* Table Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedOrders?.length === orders?.length && orders?.length > 0}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <h3 className="text-lg font-semibold text-card-foreground">
              Orders ({orders?.length})
            </h3>
            {selectedOrders?.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                {selectedOrders?.length} selected
              </span>
            )}
          </div>
          
          {selectedOrders?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export', selectedOrders)}
              >
                <Icon name="Download" size={16} className="mr-1" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('status', selectedOrders)}
              >
                <Icon name="Edit" size={16} className="mr-1" />
                Update Status
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders?.length === orders?.length && orders?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('orderId')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Order ID</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('customerName')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Customer</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('orderDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('totalAmount')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Amount</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders?.map((order) => (
              <React.Fragment key={order?.id}>
                <tr className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders?.includes(order?.id)}
                      onChange={(e) => handleSelectOrder(order?.id, e?.target?.checked)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </td>
                  <td className="p-3">
                    <div className="font-mono text-sm font-medium text-primary">
                      #{order?.orderId}
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-card-foreground">{order?.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order?.customerPhone}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-card-foreground">
                      {formatDate(order?.orderDate)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-card-foreground font-mono">
                      {formatPrice(order?.totalAmount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order?.items?.length} items
                    </div>
                  </td>
                  <td className="p-3">
                    <OrderStatusIndicator
                      status={order?.status}
                      orderId={order?.id}
                      onStatusChange={onOrderUpdate}
                      isEditable={true}
                      size="compact"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={getPriorityIcon(order?.priority)} 
                        size={14} 
                        className={getPriorityColor(order?.priority)}
                      />
                      <span className={`text-xs font-medium capitalize ${getPriorityColor(order?.priority)}`}>
                        {order?.priority}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleExpandOrder(order?.id)}
                      >
                        <Icon name={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"} size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://wa.me/${order?.customerPhone?.replace(/\D/g, '')}`)}
                      >
                        <Icon name="MessageCircle" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Order Details */}
                {expandedOrder === order?.id && (
                  <tr>
                    <td colSpan="8" className="p-0">
                      <div className="bg-muted/20 p-4 border-t border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Order Items */}
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Order Items</h4>
                            <div className="space-y-2">
                              {order?.items?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-background rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                      <Icon name="Package" size={16} className="text-primary" />
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm">{item?.name}</div>
                                      <div className="text-xs text-muted-foreground">Qty: {item?.quantity}</div>
                                    </div>
                                  </div>
                                  <div className="font-mono text-sm font-medium">
                                    {formatPrice(item?.price * item?.quantity)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Customer Details */}
                          <div>
                            <h4 className="font-semibold text-card-foreground mb-3">Customer Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <Icon name="User" size={16} className="text-muted-foreground" />
                                <span>{order?.customerName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Icon name="Phone" size={16} className="text-muted-foreground" />
                                <span>{order?.customerPhone}</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                                <span>{order?.shippingAddress}</span>
                              </div>
                              {order?.specialInstructions && (
                                <div className="flex items-start space-x-2">
                                  <Icon name="MessageSquare" size={16} className="text-muted-foreground mt-0.5" />
                                  <span className="text-muted-foreground italic">{order?.specialInstructions}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedOrders?.map((order) => (
          <div key={order?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedOrders?.includes(order?.id)}
                  onChange={(e) => handleSelectOrder(order?.id, e?.target?.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <div>
                  <div className="font-mono text-sm font-medium text-primary">#{order?.orderId}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(order?.orderDate)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getPriorityIcon(order?.priority)} 
                  size={14} 
                  className={getPriorityColor(order?.priority)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExpandOrder(order?.id)}
                >
                  <Icon name={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"} size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-card-foreground">{order?.customerName}</div>
                  <div className="text-sm text-muted-foreground">{order?.customerPhone}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-card-foreground font-mono">
                    {formatPrice(order?.totalAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">{order?.items?.length} items</div>
                </div>
              </div>
              
              <OrderStatusIndicator
                status={order?.status}
                orderId={order?.id}
                onStatusChange={onOrderUpdate}
                isEditable={true}
                size="compact"
              />
            </div>
            
            {expandedOrder === order?.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Items</h4>
                  <div className="space-y-1">
                    {order?.items?.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item?.name} × {item?.quantity}</span>
                        <span className="font-mono">{formatPrice(item?.price * item?.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://wa.me/${order?.customerPhone?.replace(/\D/g, '')}`)}
                    className="flex-1"
                  >
                    <Icon name="MessageCircle" size={16} className="mr-1" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOrderUpdate(order?.id, 'processing')}
                    className="flex-1"
                  >
                    <Icon name="Package" size={16} className="mr-1" />
                    Process
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;