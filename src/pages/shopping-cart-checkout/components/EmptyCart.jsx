import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleBrowseProducts = () => {
    navigate('/customer-product-catalog');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
          <Icon name="ShoppingBag" size={48} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Your Cart is Empty</h2>
          <p className="text-muted-foreground">
            Discover our divine collection of Krishna accessories and add some spiritual items to your cart.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="default"
            size="lg"
            onClick={handleBrowseProducts}
            iconName="Search"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Browse Krishna Collection
          </Button>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon name="ShoppingBag" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Divine Bags</h3>
                <p className="text-xs text-muted-foreground">Sacred carry bags</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon name="Shirt" size={24} className="text-secondary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Sacred Clothes</h3>
                <p className="text-xs text-muted-foreground">Traditional wear</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon name="Circle" size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">Accessories</h3>
                <p className="text-xs text-muted-foreground">Hair & jewelry</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Heart" size={16} className="text-accent mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-accent">Why Choose Krishna Bagha?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Authentic spiritual accessories blessed with devotion, crafted for Krishna devotees worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;