import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProductTable from './components/ProductTable';
import ProductFormModal from './components/ProductFormModal';
import BulkActionBar from './components/BulkActionBar';
import CategoryManager from './components/CategoryManager';
import ImportExportTools from './components/ImportExportTools';

const AdminProductManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    priceRange: { min: '', max: '' }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Divine Krishna Bag",
      description: "Beautiful handcrafted bag with Krishna motifs",
      category: "bags",
      price: 299,
      stock: 50,
      status: "active",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"],
      weight: "250g",
      dimensions: "25x20x8 cm",
      material: "Cotton Canvas",
      care_instructions: "Hand wash with mild detergent",
      created_at: "2025-01-10T10:30:00Z",
      updated_at: "2025-01-15T14:20:00Z"
    },
    {
      id: 2,
      name: "Sacred Radha Cloth",
      description: "Premium quality cloth for Krishna deity decoration",
      category: "clothes",
      price: 199,
      stock: 30,
      status: "active",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400"],
      weight: "150g",
      dimensions: "100x80 cm",
      material: "Pure Silk",
      care_instructions: "Dry clean only",
      created_at: "2025-01-08T09:15:00Z",
      updated_at: "2025-01-14T16:45:00Z"
    },
    {
      id: 3,
      name: "Peacock Feather Scrunchie",
      description: "Elegant hair accessory with peacock feather design",
      category: "scrunchies",
      price: 89,
      stock: 0,
      status: "out_of_stock",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"],
      weight: "25g",
      dimensions: "8x8x2 cm",
      material: "Satin with Feathers",
      care_instructions: "Gentle hand wash",
      created_at: "2025-01-12T11:00:00Z",
      updated_at: "2025-01-16T08:30:00Z"
    },
    {
      id: 4,
      name: "Tulsi Mala Necklace",
      description: "Sacred Tulsi beads necklace for devotional practices",
      category: "jewelry",
      price: 149,
      stock: 25,
      status: "active",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"],
      weight: "50g",
      dimensions: "60 cm length",
      material: "Tulsi Wood",
      care_instructions: "Keep dry, avoid water contact",
      created_at: "2025-01-09T13:20:00Z",
      updated_at: "2025-01-13T10:15:00Z"
    },
    {
      id: 5,
      name: "Bhagavad Gita Book",
      description: "Complete Bhagavad Gita with Sanskrit and English translation",
      category: "books",
      price: 399,
      stock: 15,
      status: "inactive",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"],
      weight: "500g",
      dimensions: "22x15x3 cm",
      material: "Premium Paper",
      care_instructions: "Keep in dry place, handle with care",
      created_at: "2025-01-07T15:45:00Z",
      updated_at: "2025-01-11T12:30:00Z"
    },
    {
      id: 6,
      name: "Lotus Design Tote Bag",
      description: "Spacious tote bag with beautiful lotus pattern",
      category: "bags",
      price: 249,
      stock: 40,
      status: "active",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"],
      weight: "300g",
      dimensions: "35x30x10 cm",
      material: "Canvas with Leather Handles",
      care_instructions: "Machine wash cold, air dry",
      created_at: "2025-01-11T14:10:00Z",
      updated_at: "2025-01-15T09:25:00Z"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter products based on current filters
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                         product?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    const matchesCategory = filters?.category === 'all' || product?.category === filters?.category;
    const matchesStatus = filters?.status === 'all' || product?.status === filters?.status;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleProductSelect = (productId, selected) => {
    if (selected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedProducts(filteredProducts?.map(p => p?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev?.filter(p => p?.id !== productId));
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleDuplicateProduct = (product) => {
    const duplicatedProduct = {
      ...product,
      id: Date.now(),
      name: `${product?.name} (Copy)`,
      created_at: new Date()?.toISOString(),
      updated_at: new Date()?.toISOString()
    };
    setProducts(prev => [duplicatedProduct, ...prev]);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev?.map(p => 
        p?.id === editingProduct?.id ? { ...productData, id: editingProduct?.id } : p
      ));
    } else {
      // Add new product
      setProducts(prev => [productData, ...prev]);
    }
  };

  const handleBulkAction = async (action) => {
    const selectedProductObjects = products?.filter(p => selectedProducts?.includes(p?.id));
    
    switch (action) {
      case 'activate':
        setProducts(prev => prev?.map(p => 
          selectedProducts?.includes(p?.id) ? { ...p, status: 'active' } : p
        ));
        break;
      case 'deactivate':
        setProducts(prev => prev?.map(p => 
          selectedProducts?.includes(p?.id) ? { ...p, status: 'inactive' } : p
        ));
        break;
      case 'mark_out_of_stock':
        setProducts(prev => prev?.map(p => 
          selectedProducts?.includes(p?.id) ? { ...p, status: 'out_of_stock', stock: 0 } : p
        ));
        break;
      case 'duplicate':
        const duplicates = selectedProductObjects?.map(product => ({
          ...product,
          id: Date.now() + Math.random(),
          name: `${product?.name} (Copy)`,
          created_at: new Date()?.toISOString(),
          updated_at: new Date()?.toISOString()
        }));
        setProducts(prev => [...duplicates, ...prev]);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedProducts?.length} products?`)) {
          setProducts(prev => prev?.filter(p => !selectedProducts?.includes(p?.id)));
        }
        break;
      case 'export':
        // Handle export logic
        console.log('Exporting selected products:', selectedProductObjects);
        break;
    }
    
    setSelectedProducts([]);
  };

  const handleClearSelection = () => {
    setSelectedProducts([]);
  };

  const handleCategoryToggle = (categoryId, enabled) => {
    console.log(`Category ${categoryId} ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleCategoryUpdate = (categoryId, updates) => {
    console.log(`Updating category ${categoryId}:`, updates);
  };

  const handleImport = (formData) => {
    console.log('Importing products:', formData);
  };

  const handleExport = (format) => {
    console.log(`Exporting products as ${format}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading product management...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Product Management - Krishna Bagha Admin</title>
        <meta name="description" content="Manage your Krishna merchandise inventory with comprehensive CRUD operations and bulk management tools." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <AdminSidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={`transition-layout ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Product Management</h1>
                <p className="text-muted-foreground">
                  Manage your Krishna merchandise inventory with comprehensive tools
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location?.reload()}
                >
                  Refresh
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    <p className="text-2xl font-bold text-foreground">{products?.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Products</p>
                    <p className="text-2xl font-bold text-foreground">
                      {products?.filter(p => p?.status === 'active')?.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Low Stock</p>
                    <p className="text-2xl font-bold text-foreground">
                      {products?.filter(p => p?.stock < 10 && p?.stock > 0)?.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="XCircle" size={20} className="text-error" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Out of Stock</p>
                    <p className="text-2xl font-bold text-foreground">
                      {products?.filter(p => p?.stock === 0)?.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Manager */}
            <CategoryManager
              categories={[]}
              onCategoryUpdate={handleCategoryUpdate}
              onCategoryToggle={handleCategoryToggle}
            />

            {/* Product Table */}
            <ProductTable
              products={filteredProducts}
              selectedProducts={selectedProducts}
              onProductSelect={handleProductSelect}
              onSelectAll={handleSelectAll}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onDuplicateProduct={handleDuplicateProduct}
              onBulkAction={handleBulkAction}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {/* Import/Export Tools */}
            <ImportExportTools
              onImport={handleImport}
              onExport={handleExport}
              totalProducts={products?.length}
            />
          </div>
        </div>

        {/* Product Form Modal */}
        <ProductFormModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          product={editingProduct}
          onSave={handleSaveProduct}
        />

        {/* Bulk Action Bar */}
        <BulkActionBar
          selectedCount={selectedProducts?.length}
          onBulkAction={handleBulkAction}
          onClearSelection={handleClearSelection}
        />
      </div>
    </>
  );
};

export default AdminProductManagement;