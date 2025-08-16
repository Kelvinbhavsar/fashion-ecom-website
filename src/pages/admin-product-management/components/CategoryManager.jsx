import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CategoryManager = ({ 
  categories, 
  onCategoryUpdate, 
  onCategoryToggle 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const defaultCategories = [
    {
      id: 'bags',
      name: 'Divine Bags',
      icon: 'ShoppingBag',
      enabled: true,
      productCount: 45,
      description: 'Sacred bags for Krishna devotees'
    },
    {
      id: 'clothes',
      name: 'Sacred Clothes',
      icon: 'Shirt',
      enabled: true,
      productCount: 78,
      description: 'Traditional Krishna attire and accessories'
    },
    {
      id: 'scrunchies',
      name: 'Hair Accessories',
      icon: 'Circle',
      enabled: true,
      productCount: 33,
      description: 'Beautiful hair accessories for devotees'
    },
    {
      id: 'jewelry',
      name: 'Spiritual Jewelry',
      icon: 'Gem',
      enabled: true,
      productCount: 24,
      description: 'Sacred jewelry and ornaments'
    },
    {
      id: 'books',
      name: 'Holy Books',
      icon: 'Book',
      enabled: false,
      productCount: 18,
      description: 'Religious texts and scriptures'
    }
  ];

  const handleCategoryToggle = (categoryId, enabled) => {
    if (onCategoryToggle) {
      onCategoryToggle(categoryId, enabled);
    }
  };

  const handleCategoryEdit = (category) => {
    setEditingCategory(category?.id);
    setNewCategoryName(category?.name);
  };

  const handleCategorySave = (categoryId) => {
    if (onCategoryUpdate) {
      onCategoryUpdate(categoryId, { name: newCategoryName });
    }
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const handleCategoryCancel = () => {
    setEditingCategory(null);
    setNewCategoryName('');
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-muted-foreground" />
          <div>
            <h3 className="font-semibold text-foreground">Category Management</h3>
            <p className="text-sm text-muted-foreground">
              Control which product categories are visible to customers
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {/* Content */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4 space-y-4">
            {/* Categories List */}
            <div className="space-y-3">
              {defaultCategories?.map((category) => (
                <div 
                  key={category?.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      category?.enabled ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={category?.icon} 
                        size={20} 
                        className={category?.enabled ? 'text-primary' : 'text-muted-foreground'} 
                      />
                    </div>
                    
                    <div className="flex-1">
                      {editingCategory === category?.id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e?.target?.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCategorySave(category?.id)}
                          >
                            <Icon name="Check" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCategoryCancel}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-medium ${
                              category?.enabled ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {category?.name}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-mono ${
                              category?.enabled 
                                ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                            }`}>
                              {category?.productCount}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {category?.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {editingCategory !== category?.id && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCategoryEdit(category)}
                        >
                          <Icon name="Edit2" size={16} />
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-medium ${
                            category?.enabled ? 'text-success' : 'text-muted-foreground'
                          }`}>
                            {category?.enabled ? 'Visible' : 'Hidden'}
                          </span>
                          <Checkbox
                            checked={category?.enabled}
                            onChange={(e) => handleCategoryToggle(category?.id, e?.target?.checked)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Category Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {defaultCategories?.filter(c => c?.enabled)?.length}
                </div>
                <div className="text-sm text-muted-foreground">Active Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {defaultCategories?.reduce((sum, c) => sum + c?.productCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {defaultCategories?.filter(c => !c?.enabled)?.length}
                </div>
                <div className="text-sm text-muted-foreground">Hidden Categories</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    defaultCategories?.forEach(cat => handleCategoryToggle(cat?.id, true));
                  }}
                >
                  <Icon name="Eye" size={14} className="mr-2" />
                  Show All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    defaultCategories?.forEach(cat => handleCategoryToggle(cat?.id, false));
                  }}
                >
                  <Icon name="EyeOff" size={14} className="mr-2" />
                  Hide All
                </Button>
              </div>

              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
              >
                Add Category
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;