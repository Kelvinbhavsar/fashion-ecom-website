import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/ui/CustomerHeader';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import CheckoutForm from './components/CheckoutForm';
import EmptyCart from './components/EmptyCart';
import OrderConfirmation from './components/OrderConfirmation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ShoppingCartCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Divine Krishna Jhola Bag",
      category: "Sacred Bags",
      price: 599,
      quantity: 2,
      size: "Medium",
      sku: "KR001",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      isBlessed: true
    },
    {
      id: 2,
      name: "Radha Krishna Silk Cloth",
      category: "Sacred Clothes",
      price: 899,
      quantity: 1,
      size: "Large",
      sku: "KR002",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop",
      isBlessed: true
    },
    {
      id: 3,
      name: "Peacock Feather Hair Scrunchie",
      category: "Hair Accessories",
      price: 299,
      quantity: 3,
      size: "Standard",
      sku: "KR003",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
      isBlessed: false
    }
  ];

  useEffect(() => {
    const loadCartData = () => {
      setIsLoading(true);
      try {
        const savedCart = localStorage.getItem('krishna-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } else {
          // Use mock data if no saved cart
          setCartItems(mockCartItems);
          localStorage.setItem('krishna-cart', JSON.stringify(mockCartItems));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems(mockCartItems);
      } finally {
        setIsLoading(false);
      }
    };

    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i?.test(navigator.userAgent));
    };

    loadCartData();
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const updateCartInStorage = (updatedCart) => {
    localStorage.setItem('krishna-cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const updatedCart = cartItems?.map(item =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    updateCartInStorage(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems?.filter(item => item?.id !== itemId);
    setCartItems(updatedCart);
    updateCartInStorage(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('krishna-cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const generateOrderMessage = (customerInfo, items, total) => {
    const itemsList = items?.map(item => 
      `• ${item?.name} (${item?.category})\n  Qty: ${item?.quantity} × ₹${item?.price} = ₹${item?.price * item?.quantity}\n  SKU: ${item?.sku || `KR${item?.id}`}`
    )?.join('\n\n');

    const orderNumber = `KR${Date.now()?.toString()?.slice(-6)}${Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0')}`;
    
    return `🙏 *Krishna Bagha Store - New Order* 🙏

*Order #:* ${orderNumber}
*Date:* ${new Date()?.toLocaleDateString('en-IN')}

*Customer Details:*
Name: ${customerInfo?.name}
Phone: ${customerInfo?.phone}
${customerInfo?.email ? `Email: ${customerInfo?.email}` : ''}

*Delivery Address:*
${customerInfo?.address}
${customerInfo?.city} - ${customerInfo?.pincode}

*Order Items:*
${itemsList}

*Order Total: ₹${total}*

${customerInfo?.specialInstructions ? `*Special Instructions:*\n${customerInfo?.specialInstructions}` : ''}

*Payment:* To be collected as per store policy
*Delivery:* 3-5 business days for blessed items

Thank you for choosing Krishna Bagha! 🕉️`;
  };

  const handleOrderSubmit = async (customerInfo, isMobileDevice) => {
    setIsSubmitting(true);
    
    try {
      const total = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
      const orderMessage = generateOrderMessage(customerInfo, cartItems, total);
      
      if (isMobileDevice) {
        // WhatsApp integration for mobile
        const whatsappNumber = "919876543210"; // Store WhatsApp number
        const encodedMessage = encodeURIComponent(orderMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
      } else {
        // Email integration for desktop
        const subject = encodeURIComponent("Krishna Bagha Store - New Order");
        const body = encodeURIComponent(orderMessage);
        const emailUrl = `mailto:orders@krishnabagha.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = emailUrl;
      }

      // Prepare order data for confirmation
      const orderConfirmationData = {
        customerInfo,
        items: cartItems,
        total,
        orderMethod: isMobileDevice ? 'whatsapp' : 'email'
      };

      setOrderData(orderConfirmationData);
      setShowConfirmation(true);
      
      // Clear cart after successful order
      handleClearCart();
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueShopping = () => {
    setShowConfirmation(false);
    navigate('/customer-product-catalog');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <div className="pt-16">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Icon name="ShoppingCart" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Shopping Cart</h1>
                <p className="text-sm text-muted-foreground">
                  {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
            
            {cartItems?.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCart}
                iconName="Trash2"
                iconPosition="left"
                className="text-error hover:text-error hover:bg-error/10"
              >
                Clear Cart
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">Your Items</h2>
                <div className="space-y-4">
                  {cartItems?.map((item) => (
                    <CartItem
                      key={item?.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </div>

              {/* Checkout Form */}
              <CheckoutForm
                onSubmit={handleOrderSubmit}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Order Summary - Sticky on desktop */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary
                  cartItems={cartItems}
                  deliveryCharge={0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order Confirmation Modal */}
      {showConfirmation && orderData && (
        <OrderConfirmation
          orderData={orderData}
          onClose={handleContinueShopping}
        />
      )}
    </div>
  );
};

export default ShoppingCartCheckout;