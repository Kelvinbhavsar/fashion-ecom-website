import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import OrderStatusIndicator from '../../../components/ui/OrderStatusIndicator';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onProductSelect, 
  onSelectAll, 
  onEditProduct, 
  onDeleteProduct, 
  onDuplicateProduct,
  onBulkAction,
  filters,
  onFilterChange 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [viewMode, setViewMode] = useState('table'); // table or cards

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'bags', label: 'Divine Bags' },
    { value: 'clothes', label: 'Sacred Clothes' },
    { value: 'scrunchies', label: 'Hair Accessories' },
    { value: 'jewelry', label: 'Spiritual Jewelry' },
    { value: 'books', label: 'Holy Books' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ];

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig?.key) {
      sortableProducts?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-warning';
      case 'out_of_stock': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'text-error' };
    if (stock < 10) return { label: 'Low Stock', color: 'text-warning' };
    return { label: 'In Stock', color: 'text-success' };
  };

  const allSelected = selectedProducts?.length === products?.length && products?.length > 0;
  const someSelected = selectedProducts?.length > 0 && selectedProducts?.length < products?.length;

  if (viewMode === 'cards') {
    return (
      <div className="space-y-4">
        {/* Mobile View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <Icon name="Table" size={16} className="mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Cards
            </Button>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts?.map((product) => {
            const stockStatus = getStockStatus(product?.stock);
            const isSelected = selectedProducts?.includes(product?.id);

            return (
              <div key={product?.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <Checkbox
                    checked={isSelected}
                    onChange={(e) => onProductSelect(product?.id, e?.target?.checked)}
                  />
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditProduct(product)}
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicateProduct(product)}
                    >
                      <Icon name="Copy" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteProduct(product?.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{product?.name}</h3>
                    <p className="text-sm text-muted-foreground">{product?.category}</p>
                    <p className="text-lg font-bold text-primary">{formatPrice(product?.price)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-medium ${stockStatus?.color}`}>
                    {stockStatus?.label} ({product?.stock})
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product?.status)}`}>
                    {product?.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
        <Input
          type="search"
          placeholder="Search products..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />
        <Select
          placeholder="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />
        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <Icon name="Table" size={16} />
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="w-12 p-4">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={(e) => onSelectAll(e?.target?.checked)}
                  />
                </th>
                <th className="text-left p-4 font-semibold text-foreground">Image</th>
                <th 
                  className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Product Name</span>
                    <Icon 
                      name={sortConfig?.key === 'name' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Category</span>
                    <Icon 
                      name={sortConfig?.key === 'category' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Price</span>
                    <Icon 
                      name={sortConfig?.key === 'price' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort('stock')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Stock</span>
                    <Icon 
                      name={sortConfig?.key === 'stock' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-center p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts?.map((product, index) => {
                const isSelected = selectedProducts?.includes(product?.id);
                const stockStatus = getStockStatus(product?.stock);

                return (
                  <tr 
                    key={product?.id} 
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${
                      isSelected ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => onProductSelect(product?.id, e?.target?.checked)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={product?.image}
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">{product?.name}</p>
                        <p className="text-sm text-muted-foreground">{product?.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                        {product?.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-primary font-mono">
                        {formatPrice(product?.price)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${stockStatus?.color}`}>
                          {product?.stock}
                        </span>
                        <span className={`text-xs ${stockStatus?.color}`}>
                          {stockStatus?.label}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <OrderStatusIndicator 
                        orderId={product?.id}
                        status={product?.status === 'active' ? 'confirmed' : product?.status === 'inactive' ? 'pending' : 'cancelled'}
                        size="compact"
                        onStatusChange={() => {}}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEditProduct(product)}
                          title="Edit Product"
                        >
                          <Icon name="Edit2" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDuplicateProduct(product)}
                          title="Duplicate Product"
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteProduct(product?.id)}
                          title="Delete Product"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {products?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
            <p className="text-muted-foreground">Start by adding your first product to the inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;