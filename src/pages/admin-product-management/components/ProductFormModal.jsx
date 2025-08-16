import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const ProductFormModal = ({ 
  isOpen, 
  onClose, 
  product = null, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    status: 'active',
    images: [],
    tags: [],
    weight: '',
    dimensions: '',
    material: '',
    care_instructions: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const categoryOptions = [
    { value: 'bags', label: 'Divine Bags' },
    { value: 'clothes', label: 'Sacred Clothes' },
    { value: 'scrunchies', label: 'Hair Accessories' },
    { value: 'jewelry', label: 'Spiritual Jewelry' },
    { value: 'books', label: 'Holy Books' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name || '',
        description: product?.description || '',
        category: product?.category || '',
        price: product?.price?.toString() || '',
        stock: product?.stock?.toString() || '',
        status: product?.status || 'active',
        images: product?.images || [product?.image] || [],
        tags: product?.tags || [],
        weight: product?.weight || '',
        dimensions: product?.dimensions || '',
        material: product?.material || '',
        care_instructions: product?.care_instructions || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        status: 'active',
        images: [],
        tags: [],
        weight: '',
        dimensions: '',
        material: '',
        care_instructions: ''
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files)?.map(file => {
      return URL.createObjectURL(file);
    });
    
    setFormData(prev => ({
      ...prev,
      images: [...prev?.images, ...newImages]?.slice(0, 5) // Max 5 images
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleImageUpload(e?.dataTransfer?.files);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Product name is required';
    if (!formData?.category) newErrors.category = 'Category is required';
    if (!formData?.price || parseFloat(formData?.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData?.stock || parseInt(formData?.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
    if (formData?.images?.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData?.price),
        stock: parseInt(formData?.stock),
        id: product?.id || Date.now(),
        image: formData?.images?.[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        created_at: product?.created_at || new Date()?.toISOString(),
        updated_at: new Date()?.toISOString()
      };

      await onSave(productData);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1100 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-glass"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-popover border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-popover-foreground">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {product ? 'Update product information' : 'Create a new product for your inventory'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Product Name"
                  type="text"
                  placeholder="Enter product name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                />

                <Select
                  label="Category"
                  placeholder="Select category"
                  options={categoryOptions}
                  value={formData?.category}
                  onChange={(value) => handleInputChange('category', value)}
                  error={errors?.category}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Price (₹)"
                    type="number"
                    placeholder="0"
                    value={formData?.price}
                    onChange={(e) => handleInputChange('price', e?.target?.value)}
                    error={errors?.price}
                    required
                  />

                  <Input
                    label="Stock Quantity"
                    type="number"
                    placeholder="0"
                    value={formData?.stock}
                    onChange={(e) => handleInputChange('stock', e?.target?.value)}
                    error={errors?.stock}
                    required
                  />
                </div>

                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Product Images
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive 
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop images here, or click to select
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e?.target?.files)}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Select Images
                    </Button>
                  </div>
                  {errors?.images && (
                    <p className="text-sm text-error mt-1">{errors?.images}</p>
                  )}
                </div>

                {/* Image Preview */}
                {formData?.images?.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {formData?.images?.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter product description..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth resize-none"
              />
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Weight"
                type="text"
                placeholder="e.g., 250g"
                value={formData?.weight}
                onChange={(e) => handleInputChange('weight', e?.target?.value)}
              />

              <Input
                label="Dimensions"
                type="text"
                placeholder="e.g., 20x15x5 cm"
                value={formData?.dimensions}
                onChange={(e) => handleInputChange('dimensions', e?.target?.value)}
              />

              <Input
                label="Material"
                type="text"
                placeholder="e.g., Cotton, Silk"
                value={formData?.material}
                onChange={(e) => handleInputChange('material', e?.target?.value)}
              />
            </div>

            {/* Care Instructions */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Care Instructions
              </label>
              <textarea
                placeholder="Enter care instructions..."
                value={formData?.care_instructions}
                onChange={(e) => handleInputChange('care_instructions', e?.target?.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;