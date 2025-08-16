import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CheckoutForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    specialInstructions: ''
  });
  const [errors, setErrors] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i?.test(navigator.userAgent));
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid Indian mobile number';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData?.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/?.test(formData?.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData, isMobile);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="User" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Delivery Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
        </div>

        <Input
          label="Email Address (Optional)"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          description="For order confirmations and updates"
        />

        <Input
          label="Delivery Address"
          type="text"
          placeholder="House/Flat No, Street, Area"
          value={formData?.address}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Enter your city"
            value={formData?.city}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />

          <Input
            label="Pincode"
            type="text"
            placeholder="Enter 6-digit pincode"
            value={formData?.pincode}
            onChange={(e) => handleInputChange('pincode', e?.target?.value)}
            error={errors?.pincode}
            required
          />
        </div>

        <Input
          label="Special Instructions (Optional)"
          type="text"
          placeholder="Any special requests for your Krishna accessories..."
          value={formData?.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
          description="e.g., Specific blessing requirements, delivery preferences"
        />

        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Order Method</span>
          </div>
          
          {isMobile ? (
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">
                WhatsApp order (Recommended for mobile)
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                Email order (Desktop friendly)
              </span>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            Your order details will be sent via {isMobile ? 'WhatsApp' : 'email'} for confirmation and processing.
          </p>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName={isMobile ? "MessageCircle" : "Mail"}
          iconPosition="left"
          className="w-full"
        >
          {isSubmitting 
            ? 'Processing Order...' 
            : `Place Order via ${isMobile ? 'WhatsApp' : 'Email'}`
          }
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By placing this order, you agree to our terms of service and acknowledge that payment will be collected upon delivery or as per our payment instructions.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;